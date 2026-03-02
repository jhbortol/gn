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
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      const isLastAttempt = attempt === maxRetries;
      console.warn(`[Attempt ${attempt}/${maxRetries}] Failed to fetch ${url}:`, error.message);
      
      if (isLastAttempt) {
        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delayMs = Math.pow(2, attempt - 1) * 1000;
      console.log(`Retrying in ${delayMs}ms...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
}

async function getBlogPosts() {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
    const response = await fetchWithRetry(`${apiUrl}/blog?page=1&pageSize=100`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('❌ CRITICAL: Failed to fetch blog posts for prerendering:', error.message);
    throw error; // Fail build if blog posts cannot be fetched
  }
}

async function getBlogPrerenderParams() {
  const posts = await getBlogPosts();
  return posts
    .map((post) => ({
      slug: post.slug || post.Slug
    }))
    .filter((p) => typeof p.slug === 'string' && p.slug.length > 0)
    .map(p => p.slug);
}
//melhorar isso aqui para mais de 100 por pagina
async function getFornecedoresData() {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
    const pageSize = 100;
    let page = 1;
    let allFornecedores = [];
    let hasMorePages = true;

    console.log('📦 Fetching fornecedores from API...');

    while (hasMorePages) {
      const url = `${apiUrl}/fornecedores/ativos?page=${page}&pageSize=${pageSize}&publicado=true`;
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
    console.error('❌ CRITICAL: Failed to fetch suppliers for prerendering:', error.message);
    throw error; // Fail build if suppliers cannot be fetched
  }
}

// NEW: Fetch detailed data for each fornecedor for richer metadata
async function getFornecedorDetails(identifier) {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
    const isGuid = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(identifier);
    const endpoint = isGuid 
      ? `/public/fornecedores/${identifier}` 
      : `/public/fornecedores/slug/${identifier.toLowerCase()}`;
    
    const response = await fetchWithRetry(`${apiUrl}${endpoint}`);
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
      id: fornecedor.slug || fornecedor.Slug || fornecedor.id || fornecedor.Id
    }))
    .filter((p) => typeof p.id === 'string' && p.id.length > 0)
    .map(p => p.id);
}

async function getCategoriasData() {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
    const response = await fetchWithRetry(`${apiUrl}/public/categorias`);
    const data = await response.json();
    const categorias = Array.isArray(data) ? data : (data?.data || []);
    
    console.log(`✅ Fetched ${categorias.length} categorias`);
    return categorias;
  } catch (error) {
    console.error('❌ CRITICAL: Failed to fetch categories for prerendering:', error.message);
    throw error; // Fail build if categories cannot be fetched
  }
}

async function generateRoutes() {
  const staticRoutes = [
    "/piracicaba",
    "/piracicaba/categorias",
    "/piracicaba/anuncie",
    "/piracicaba/contato",
    "/piracicaba/blog",
    "/piracicaba/guia-precos",
    "/piracicaba/institucional/termos",
    "/piracicaba/institucional/privacidade",
    "/piracicaba/institucional/sobre"
  ];

  console.log('🚀 Starting route generation with enriched metadata...\n');
  
  try {
    // Fetch all data
    console.log('📡 Fetching data from API...');
    const blogPosts = await getBlogPosts();
    const fornecedores = await getFornecedoresData();
    const categorias = await getCategoriasData();
    
    console.log('\n📊 Data Summary:');
    console.log(`  - Blog posts: ${blogPosts.length}`);
    console.log(`  - Fornecedores: ${fornecedores.length}`);
    console.log(`  - Categorias: ${categorias.length}\n`);

    // Generate blog routes with metadata
    console.log('📝 Generating blog routes...');
    const blogRoutes = blogPosts
      .map(post => ({
        route: `/piracicaba/blog/${post.slug || post.Slug}`,
        title: `${post.titulo || post.Titulo || post.title || 'Blog Post'} - Guia Noivas Piracicaba`,
        description: (post.descricao || post.Descricao || post.description || post.titulo || '').substring(0, 155),
        image: post.imagemDestaque?.url || post.ImgDestaque?.Url || post.imagemUrl || null
      }))
      .filter(b => b.route && b.route.length > 0);

    // Generate fornecedor routes with ENRICHED metadata
    console.log('🏢 Generating fornecedor routes with enriched metadata...');
    const fornecedorRoutes = fornecedores
      .map(f => {
        const nome = f.nome || f.Nome || 'Fornecedor';
        const categoria = f.categoria?.nome || f.Categoria?.Nome || 'Fornecedor';
        const cidade = f.cidade || f.Cidade || 'Piracicaba';
        const descricao = f.descricao || f.Descricao || f.nome || f.Nome || '';
        
        // Extract best description (prioritize actual description over name)
        let metaDescription = descricao.substring(0, 155);
        if (metaDescription.length < 50) {
          metaDescription = `Conheça ${nome}, especialista em ${categoria} em ${cidade}. Entre em contato e solicite um orçamento.`;
        }
        
        // Get best image
        const coverImage = f.coverPictureUrl || f.CoverPictureUrl;
        const primaryImage = f.primaryImage?.url || f.PrimaryImage?.Url;
        const firstImage = f.imagens?.[0]?.url || f.Imagens?.[0]?.Url;
        const image = coverImage || primaryImage || firstImage || null;
        
        return {
          route: `/piracicaba/fornecedores/${f.slug || f.Slug || f.id || f.Id}`,
          title: `${nome} - ${categoria} em ${cidade} | Guia Noivas`,
          description: metaDescription,
          image: image,
          // Additional metadata for future use
          category: categoria,
          city: cidade,
          keywords: `${nome}, ${categoria}, ${cidade}, casamento, fornecedor`
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

    console.log('📂 Generating categoria routes...');
    const categoriaRoutes = categorias
      .map(c => {
        const nome = c.nome || c.Nome || 'Categoria';
        const descricao = c.descricao || c.Descricao || c.nome || c.Nome || '';
        
        let metaDescription = descricao.substring(0, 155);
        if (metaDescription.length < 50) {
          metaDescription = `Encontre os melhores fornecedores de ${nome} em Piracicaba. Compare preços e serviços para seu casamento.`;
        }
        
        return {
          route: `/piracicaba/categorias/${normalizarSlug(c.slug || c.Slug || c.id || c.Id)}`,
          title: `${nome} - Fornecedores em Piracicaba | Guia Noivas`,
          description: metaDescription,
          image: c.imageUrl || c.ImageUrl || c.thumbnailUrl || c.ThumbnailUrl || null
        };
      })
      .filter(c => c.route && c.route.length > 0);

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
    metadata['/piracicaba'] = {
      title: 'Guia Noivas Piracicaba - Fornecedores para Casamentos',
      description: 'Encontre os melhores fornecedores para seu casamento em Piracicaba. Fotógrafos, buffets, vestidos e muito mais.',
      image: null
    };
    
    metadata['/piracicaba/categorias'] = {
      title: 'Categorias de Fornecedores - Guia Noivas Piracicaba',
      description: 'Navegue por todas as categorias de fornecedores para casamento em Piracicaba.',
      image: null
    };
    
    metadata['/piracicaba/blog'] = {
      title: 'Blog - Dicas para seu Casamento | Guia Noivas Piracicaba',
      description: 'Artigos, dicas e inspirações para planejar o casamento dos seus sonhos em Piracicaba.',
      image: null
    };
    
    // Add dynamic routes metadata
    [...blogRoutes, ...fornecedorRoutes, ...categoriaRoutes].forEach(item => {
      metadata[item.route] = {
        title: item.title,
        description: item.description,
        image: item.image,
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
    console.log(`   - Static: ${staticRoutes.length}`);
    console.log(`   - Blog: ${blogRoutes.length}`);
    console.log(`   - Fornecedores: ${fornecedorRoutes.length}`);
    console.log(`   - Categorias: ${categoriaRoutes.length}`);
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