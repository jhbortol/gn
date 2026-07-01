const fs = require('fs');
const path = require('path');

// Utility: Retry fetch with exponential backoff
async function fetchWithRetry(url, options = {}, maxRetries = 3, timeoutMs = 30000) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const httpError = new Error(`HTTP ${response.status}: ${response.statusText}`);
        httpError.status = response.status;
        throw httpError;
      }
      
      return response;
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;
      console.warn(`[Attempt ${attempt}/${maxRetries}] Failed to fetch ${url}:`, error.message);
      
      if (isLastAttempt) {
        const finalError = new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
        if (Number.isFinite(error?.status)) {
          finalError.status = error.status;
        }
        throw finalError;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delayMs = Math.pow(2, attempt - 1) * 1000;
      console.log(`Retrying in ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

const API_BASE_URL = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';

function getEntityIdentifier(entity) {
  return String(entity?.slug || entity?.Slug || entity?.id || entity?.Id || '').trim();
}

function getBlogSlug(entity) {
  return String(entity?.slug || entity?.Slug || '').trim();
}

function getNumericEnv(name, fallback) {
  const value = process.env[name];
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getRequiredMinimums() {
  return {
    blogPosts: getNumericEnv('MIN_BLOG_POSTS', 5),
    fornecedores: getNumericEnv('MIN_FORNECEDORES', 20),
    categorias: getNumericEnv('MIN_CATEGORIAS', 10)
  };
}

function extractHttpStatusCode(error) {
  if (Number.isFinite(error?.status)) {
    return Number(error.status);
  }

  const match = /HTTP\s(\d{3})/.exec(String(error?.message || ''));
  return match ? Number(match[1]) : null;
}

async function validateApiHealth() {
  if (process.env.ENFORCE_API_HEALTH === 'false') {
    console.log('ℹ️  API health precheck skipped (ENFORCE_API_HEALTH=false)');
    return;
  }

  const healthCandidates = [
    `${API_BASE_URL}/health`,
    `${API_BASE_URL}/health/ready`,
    `${API_BASE_URL}/health/live`
  ];

  for (const healthUrl of healthCandidates) {
    try {
      const response = await fetchWithRetry(healthUrl, {}, 2, 10000);
      const contentType = response.headers.get('content-type') || '';

      if (contentType.includes('application/json')) {
        const payload = await response.json();
        const normalizedStatus = String(payload?.status || payload?.Status || '').toLowerCase();
        if (normalizedStatus && normalizedStatus !== 'ok' && normalizedStatus !== 'healthy') {
          throw new Error(`Unexpected health status: ${normalizedStatus}`);
        }
      }

      console.log(`✅ API health check passed (${healthUrl})`);
      return;
    } catch (error) {
      const statusCode = extractHttpStatusCode(error);
      if (statusCode === 404) {
        console.warn(`⚠️  API health endpoint not found (${healthUrl}). Trying next health endpoint...`);
        continue;
      }

      const contextHint = statusCode
        ? `status ${statusCode}`
        : 'network/timeout/unexpected response';
      console.error(`❌ CRITICAL: API health check failed at ${healthUrl} (${contextHint}):`, error.message);
      throw error;
    }
  }

  console.warn('⚠️  All API health endpoints returned 404 (not found). Continuing with data fetch validation checks.');
}

function ensureUniqueRouteEntries(routes, sourceName) {
  const seen = new Set();
  const duplicates = [];

  routes.forEach((route) => {
    if (seen.has(route)) {
      duplicates.push(route);
      return;
    }
    seen.add(route);
  });

  if (duplicates.length > 0) {
    throw new Error(
      `${sourceName} contains duplicated routes/slugs (${duplicates.length}). Example: ${duplicates[0]}`
    );
  }
}

function validateApiDataCompleteness({ blogPosts, fornecedores, categorias }) {
  if (process.env.ENFORCE_API_COMPLETENESS === 'false') {
    console.log('ℹ️  API data completeness checks skipped (ENFORCE_API_COMPLETENESS=false)');
    return;
  }

  const minimums = getRequiredMinimums();
  const violations = [];

  const checkMinimum = (name, count, minValue) => {
    if (count < minValue) {
      violations.push(`${name}: ${count} (minimum required: ${minValue})`);
    }
  };

  checkMinimum('blogPosts', blogPosts.length, minimums.blogPosts);
  checkMinimum('fornecedores', fornecedores.length, minimums.fornecedores);
  checkMinimum('categorias', categorias.length, minimums.categorias);

  ensureUniqueRouteEntries(
    blogPosts.map((post) => getBlogSlug(post)).filter(Boolean),
    'Blog posts'
  );

  ensureUniqueRouteEntries(
    fornecedores.map((fornecedor) => getEntityIdentifier(fornecedor)).filter(Boolean),
    'Fornecedores'
  );

  ensureUniqueRouteEntries(
    categorias.map((categoria) => getEntityIdentifier(categoria).toLowerCase()).filter(Boolean),
    'Categorias'
  );

  if (violations.length > 0) {
    console.error('\n❌ CRITICAL: API returned incomplete data for prerendering');
    violations.forEach((line) => console.error(`   - ${line}`));
    console.error('   Deploy blocked to avoid publishing incomplete SEO/prerender content.\n');
    throw new Error(`API data completeness validation failed: ${violations.join(' | ')}`);
  }
}

async function getBlogPosts() {
  const strict = process.env.ENFORCE_API_COMPLETENESS === 'true';
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/blog?page=1&pageSize=100`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    if (strict) {
      console.error('❌ CRITICAL: Failed to fetch blog posts for prerendering:', error.message);
      throw error; // Fail build in strict mode only
    }
    console.warn('⚠️  Failed to fetch blog posts (non-fatal in dev mode):', error.message);
    return [];
  }
}

async function getBlogPrerenderParams() {
  const posts = await getBlogPosts();
  return posts
    .map((post) => ({
      slug: getBlogSlug(post)
    }))
    .filter((p) => typeof p.slug === 'string' && p.slug.length > 0)
    .map(p => p.slug);
}
//melhorar isso aqui para mais de 100 por pagina
async function getFornecedoresData() {
  try {
    const pageSize = 100;
    let page = 1;
    let allFornecedores = [];
    let hasMorePages = true;

    console.log('📦 Fetching fornecedores from API...');

    while (hasMorePages) {
      const url = `${API_BASE_URL}/fornecedores/ativos?page=${page}&pageSize=${pageSize}&publicado=true`;
      const response = await fetchWithRetry(url);
      const result = await response.json();
      const fornecedores = result.data || [];

      if (fornecedores.length === 0) {
        hasMorePages = false;
      } else {
        allFornecedores = allFornecedores.concat(fornecedores);
        console.log(`  ✓ Page ${page}: ${fornecedores.length} fornecedores`);
        page++;

        // Safety check to prevent infinite loops
        if (page > 50) {
          console.warn('⚠️  Reached maximum page limit (50), stopping pagination');
          hasMorePages = false;
        }
      }
    }

    const totalFornecedores = allFornecedores.length;
    console.log(`✅ Total fornecedores fetched: ${totalFornecedores} across ${page - 1} pages`);
    
    // Validation: Warn if suspiciously low count
    if (totalFornecedores < 10) {
      console.warn(`⚠️  WARNING: Only ${totalFornecedores} fornecedores found. Expected at least 10. API might be returning incomplete data.`);
    }
    
    return allFornecedores;
  } catch (error) {
    if (process.env.ENFORCE_API_COMPLETENESS === 'true') {
      console.error('❌ CRITICAL: Failed to fetch suppliers for prerendering:', error.message);
      throw error; // Fail build in strict mode only
    }
    console.warn('⚠️  Failed to fetch fornecedores (non-fatal in dev mode):', error.message);
    return [];
  }
}

// NEW: Fetch detailed data for each fornecedor for richer metadata
async function getFornecedorDetails(identifier) {
  try {
    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);
    const endpoint = isGuid 
      ? `/public/fornecedores/${identifier}` 
      : `/public/fornecedores/slug/${identifier.toLowerCase()}`;
    
    const response = await fetchWithRetry(`${API_BASE_URL}${endpoint}`);
    return await response.json();
  } catch (error) {
    console.warn(`⚠️  Failed to fetch details for fornecedor ${identifier}:`, error.message);
    return null; // Return null for this fornecedor but continue with others
  }
}

async function getFornecedoresPrerenderParams() {
  const fornecedores = await getFornecedoresData();
  return fornecedores
    .map((fornecedor) => ({
      id: getEntityIdentifier(fornecedor)
    }))
    .filter((p) => typeof p.id === 'string' && p.id.length > 0)
    .map(p => p.id);
}

async function getCategoriasData() {
  const strict = process.env.ENFORCE_API_COMPLETENESS === 'true';
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/public/categorias`);
    const data = await response.json();
    const categorias = Array.isArray(data) ? data : (data?.data || []);
    
    console.log(`✅ Fetched ${categorias.length} categorias`);
    return categorias;
  } catch (error) {
    if (strict) {
      console.error('❌ CRITICAL: Failed to fetch categories for prerendering:', error.message);
      throw error; // Fail build in strict mode only
    }
    console.warn('⚠️  Failed to fetch categories (non-fatal in dev mode):', error.message);
    return [];
  }
}

async function getCidadesData() {
  try {
    const response = await fetchWithRetry(`${API_BASE_URL}/public/cidades`);
    const data = await response.json();
    const cidades = Array.isArray(data) ? data : (data?.data || []);
    const slugs = cidades
      .map(c => (c.slug || c.Slug || '').toLowerCase())
      .filter(Boolean);
    console.log(`✅ Fetched ${slugs.length} cidades:`, slugs.join(', '));
    return slugs.length > 0 ? slugs : ['piracicaba'];
  } catch (error) {
    console.warn('⚠️  Failed to fetch cidades, using fallback [piracicaba]:', error.message);
    return ['piracicaba'];
  }
}

async function generateRoutes() {
  // Static pages per city (generated dynamically based on available cities)
  const staticPagePaths = [
    '',
    '/categorias',
    '/fornecedores',
    '/blog',
    '/anuncie',
    '/contato',
    '/institucional',
    '/institucional/sobre',
    '/institucional/termos',
    '/guia-precos',
    '/guia-custos',
    '/indicado',
    '/midia-kit',
  ];

  function buildStaticRouteMetadata(cidadeSlug, cidadeNome) {
    const base = `https://guianoivas.com/${cidadeSlug}`;
    const n = cidadeNome;
    return {
      [`/${cidadeSlug}`]: {
        title: `Guia Noivas ${n} - Fornecedores para Casamentos`,
        description: `Encontre os melhores fornecedores para seu casamento em ${n}. Fotógrafos, buffets, vestidos e muito mais.`,
        image: null,
        canonical: `${base}`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/categorias`]: {
        title: `Categorias de Fornecedores - Guia Noivas ${n}`,
        description: `Navegue por todas as categorias de fornecedores para casamento em ${n}.`,
        image: null,
        canonical: `${base}/categorias`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/blog`]: {
        title: `Blog - Dicas para seu Casamento | Guia Noivas ${n}`,
        description: `Artigos, dicas e inspirações para planejar o casamento dos seus sonhos em ${n}.`,
        image: null,
        canonical: `${base}/blog`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/fornecedores`]: {
        title: `Fornecedores de Casamento em ${n} | Guia Noivas`,
        description: `Explore fornecedores de casamento em ${n} e encontre opções por categoria para cada etapa do seu evento.`,
        image: null,
        canonical: `${base}/fornecedores`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/anuncie`]: {
        title: `Anuncie - Guia Noivas ${n}`,
        description: `Seja um fornecedor parceiro do Guia Noivas ${n}. Saiba como anunciar seus serviços.`,
        image: null,
        canonical: `${base}/anuncie`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/contato`]: {
        title: `Contato - Guia Noivas ${n}`,
        description: `Fale com o Guia Noivas ${n}. Tire dúvidas, envie sugestões ou solicite informações sobre fornecedores.`,
        image: null,
        canonical: `${base}/contato`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/institucional`]: {
        title: `Institucional - Guia Noivas ${n}`,
        description: `Conheça a história, missão e valores do Guia Noivas ${n}.`,
        image: null,
        canonical: `${base}/institucional/sobre`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/institucional/sobre`]: {
        title: `Sobre - Guia Noivas ${n}`,
        description: `Conheça a história, missão e valores do Guia Noivas ${n}.`,
        image: null,
        canonical: `${base}/institucional/sobre`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/institucional/termos`]: {
        title: `Termos de Uso - Guia Noivas ${n}`,
        description: `Leia os termos de uso e políticas do Guia Noivas ${n}.`,
        image: null,
        canonical: `${base}/institucional/termos`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/guia-precos`]: {
        title: `Guia de Preços ${n} - Quanto custa casar? | Guia Noivas ${n}`,
        description: `Descubra os preços dos principais serviços de casamento em ${n}. Planeje seu orçamento com o Guia Noivas.`,
        image: null,
        canonical: `${base}/guia-precos`,
        robots: 'index, follow'
      },
      [`/${cidadeSlug}/guia-custos`]: {
        title: `Guia de Custos do Casamento em ${n} | Guia Noivas`,
        description: `Entenda os custos médios de casamento em ${n} e organize seu orçamento com mais clareza.`,
        image: null,
        canonical: `${base}/guia-precos`,
        robots: 'noindex, follow'
      },
      [`/${cidadeSlug}/indicado`]: {
        title: `Começar a Planejar Casamento em ${n} | Guia Noivas`,
        description: `Comece a organizar seu casamento em ${n} com orientações práticas e fornecedores verificados.`,
        image: null,
        canonical: `${base}/guia-precos`,
        robots: 'noindex, follow'
      },
      [`/${cidadeSlug}/midia-kit`]: {
        title: `Mídia Kit - Guia Noivas ${n}`,
        description: `Acesse o mídia kit oficial do Guia Noivas ${n}.`,
        image: null,
        canonical: `${base}/midia-kit`,
        robots: 'noindex, follow'
      }
    };
  }

  console.log('🚀 Starting route generation with enriched metadata (multi-cidades)...\n');
  
  try {
    await validateApiHealth();

    // Fetch all data
    console.log('📡 Fetching data from API...');
    const [blogPosts, fornecedores, categorias, cidades] = await Promise.all([
      getBlogPosts(),
      getFornecedoresData(),
      getCategoriasData(),
      getCidadesData()
    ]);
    validateApiDataCompleteness({ blogPosts, fornecedores, categorias });
    
    console.log('\n📊 Data Summary:');
    console.log(`  - Blog posts: ${blogPosts.length}`);
    console.log(`  - Fornecedores: ${fornecedores.length}`);
    console.log(`  - Categorias: ${categorias.length}`);
    console.log(`  - Cidades: ${cidades.join(', ')}\n`);

    // Build cidade nome map (capitalize first letter of each word)
    const cidadeNomeMap = {};
    cidades.forEach(slug => {
      cidadeNomeMap[slug] = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    });

    // Generate static routes metadata for ALL cities
    let staticRouteMetadata = {};
    cidades.forEach(slug => {
      Object.assign(staticRouteMetadata, buildStaticRouteMetadata(slug, cidadeNomeMap[slug]));
    });

    const staticRoutes = Object.keys(staticRouteMetadata);

    // Generate blog routes with metadata — one entry per city
    console.log('📝 Generating blog routes (all cities)...');
    const blogRoutes = cidades.flatMap(cidadeSlug =>
      blogPosts
        .map(post => ({
          route: `/${cidadeSlug}/blog/${getBlogSlug(post)}`,
          title: `${post.titulo || post.Titulo || post.title || 'Blog Post'} - Guia Noivas ${cidadeNomeMap[cidadeSlug]}`,
          description: (post.descricao || post.Descricao || post.description || post.titulo || '').substring(0, 155),
          image: post.imagemDestaque?.url || post.ImgDestaque?.Url || post.imagemUrl || null
        }))
        .filter(b => b.route && b.route.length > 0)
    );

    // Generate fornecedor routes — use cidadePrincipal.slug when available, else first city
    console.log('🏢 Generating fornecedor routes with enriched metadata (multi-cidades)...');
    const fornecedorRoutes = fornecedores
      .map(f => {
        const nome = f.nome || f.Nome || f.nomeFantasia || f.NomeFantasia || 'Fornecedor';
        const categoria = f.categoria?.nome || f.Categoria?.Nome || 'Fornecedor';
        const cidadePrincipalSlug = (f.cidadePrincipal?.slug || f.CidadePrincipal?.Slug || '').toLowerCase();
        const cidadeSlug = cidadePrincipalSlug && cidades.includes(cidadePrincipalSlug)
          ? cidadePrincipalSlug
          : (cidades[0] ?? 'piracicaba');
        const cidadeNome = cidadeNomeMap[cidadeSlug] || cidadeSlug;
        const descricao = f.descricao || f.Descricao || nome;
        
        let metaDescription = descricao.substring(0, 155);
        if (metaDescription.length < 50) {
          metaDescription = `Conheça ${nome}, especialista em ${categoria} em ${cidadeNome}. Entre em contato e solicite um orçamento.`;
        }
        
        const coverImage = f.coverPictureUrl || f.CoverPictureUrl;
        const primaryImage = f.primaryImage?.url || f.PrimaryImage?.Url;
        const firstImage = f.imagens?.[0]?.url || f.Imagens?.[0]?.Url;
        const image = coverImage || primaryImage || firstImage || null;
        
        return {
          route: `/${cidadeSlug}/fornecedores/${getEntityIdentifier(f)}`,
          title: `${nome} - ${categoria} em ${cidadeNome} | Guia Noivas`,
          description: metaDescription,
          image,
          category: categoria,
          city: cidadeNome,
          keywords: `${nome}, ${categoria}, ${cidadeNome}, casamento, fornecedor`
        };
      })
      .filter(f => f.route && f.route.length > 0);

    // Normalize category slugs (same logic as categorias-data.ts)
    const normalizarSlug = (slug) => {
      return String(slug)
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .replace(/[^\w\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .toLowerCase();
    };

    console.log('📂 Generating categoria routes (all cities)...');
    const categoriaRoutes = cidades.flatMap(cidadeSlug =>
      categorias
        .map(c => {
          const nome = c.nome || c.Nome || 'Categoria';
          const cidadeNome = cidadeNomeMap[cidadeSlug] || cidadeSlug;
          const descricao = c.descricao || c.Descricao || nome;
          
          let metaDescription = descricao.substring(0, 155);
          if (metaDescription.length < 50) {
            metaDescription = `Encontre os melhores fornecedores de ${nome} em ${cidadeNome}. Compare preços e serviços para seu casamento.`;
          }
          
          return {
            route: `/${cidadeSlug}/categorias/${normalizarSlug(getEntityIdentifier(c))}`,
            title: `${nome} - Fornecedores em ${cidadeNome} | Guia Noivas`,
            description: metaDescription,
            image: c.imageUrl || c.ImageUrl || c.thumbnailUrl || c.ThumbnailUrl || null
          };
        })
        .filter(c => c.route && c.route.length > 0)
    );

    // Build routes array (just paths for angular)
    const dynamicRoutes = [
      ...blogRoutes.map(b => b.route),
      ...fornecedorRoutes.map(f => f.route),
      ...categoriaRoutes.map(c => c.route)
    ];

    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    // Write routes file
    const routesPath = path.join(__dirname, 'src', 'prerender-routes.json');
    fs.writeFileSync(routesPath, JSON.stringify(allRoutes, null, 2));
    
    // Write ENRICHED metadata file
    const metadata = {};
    
    // Add static routes metadata
    Object.entries(staticRouteMetadata).forEach(([route, data]) => {
      metadata[route] = data;
    });
    
    // Add dynamic routes metadata
    [...blogRoutes, ...fornecedorRoutes, ...categoriaRoutes].forEach(item => {
      metadata[item.route] = {
        title: item.title,
        description: item.description,
        image: item.image,
        canonical: `https://guianoivas.com${item.route}`,
        robots: 'index, follow',
        ...(item.category && { category: item.category }),
        ...(item.city && { city: item.city }),
        ...(item.keywords && { keywords: item.keywords })
      };
    });
    
    const metadataPath = path.join(__dirname, 'src', 'prerender-metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
    
    console.log('\n✅ GENERATION COMPLETE!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log(`📄 Routes generated: ${allRoutes.length}`);
    console.log(`   - Static: ${staticRoutes.length} (${cidades.length} cities × ${staticPagePaths.length} pages)`);
    console.log(`   - Blog: ${blogRoutes.length} (${blogPosts.length} posts × ${cidades.length} cities)`);
    console.log(`   - Fornecedores: ${fornecedorRoutes.length}`);
    console.log(`   - Categorias: ${categoriaRoutes.length} (${categorias.length} cats × ${cidades.length} cities)`);
    console.log(`📋 Metadata entries: ${Object.keys(metadata).length}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    // Validation
    const imagesWithoutUrl = fornecedorRoutes.filter(f => !f.image).length;
    if (imagesWithoutUrl > 0) {
      console.warn(`⚠️  ${imagesWithoutUrl} fornecedores without cover image (will use default OG image)`);
    }
    
    console.log('✅ Files written:');
    console.log(`   - ${routesPath}`);
    console.log(`   - ${metadataPath}\n`);
    
  } catch (error) {
    console.error('\n❌ FATAL ERROR during route generation:', error.message);
    console.error('Stack:', error.stack);
    console.error('\n🚨 Build must FAIL to prevent incomplete prerendering!\n');
    process.exit(1); // Exit with error code to fail the build
  }
}

generateRoutes().catch(error => {
  console.error('❌ Unhandled error in generateRoutes:', error);
  process.exit(1);
});
