const fs = require('fs');
const path = require('path');

async function getBlogPosts() {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
    const response = await fetch(`${apiUrl}/blog?page=1&pageSize=100`);
    
    if (!response.ok) {
      console.warn('Failed to fetch blog posts for prerendering');
      return [];
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.warn('Error fetching blog posts for prerendering:', error);
    return [];
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

    while (hasMorePages) {
      const response = await fetch(`${apiUrl}/fornecedores/ativos?page=${page}&pageSize=${pageSize}&publicado=true`);

      if (!response.ok) {
        console.warn(`Failed to fetch suppliers for prerendering on page ${page}`);
        break;
      }

      const result = await response.json();
      const fornecedores = result.data || [];

      if (fornecedores.length === 0) {
        hasMorePages = false;
      } else {
        allFornecedores = allFornecedores.concat(fornecedores);
        page++;

        // Safety check to prevent infinite loops
        if (page > 50) {
          console.warn('Reached maximum page limit (50), stopping pagination');
          hasMorePages = false;
        }
      }
    }

    console.log(`Fetched ${allFornecedores.length} suppliers across ${page - 1} pages`);
    return allFornecedores;
  } catch (error) {
    console.warn('Error fetching suppliers for prerendering:', error);
    return [];
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

  console.log('Fetching dynamic routes and metadata...');
  const blogPosts = await getBlogPosts();
  const fornecedores = await getFornecedoresData();

  const blogRoutes = blogPosts
    .map(post => ({
      route: `/piracicaba/blog/${post.slug || post.Slug}`,
      title: post.titulo || post.Titulo || post.title || 'Blog Post',
      description: (post.descricao || post.Descricao || post.description || '').substring(0, 160),
      image: post.imagemDestaque?.url || post.ImgDestaque?.Url || post.imagemUrl || null
    }))
    .filter(b => b.route && b.route.length > 0);

  const fornecedorRoutes = fornecedores
    .map(f => ({
      route: `/piracicaba/fornecedores/${f.slug || f.Slug || f.id || f.Id}`,
      title: `${f.nome || f.Nome} - ${f.categoria?.nome || f.Categoria?.Nome || 'Fornecedor'}`,
      description: (f.descricao || f.Descricao || f.nome || f.Nome || '').substring(0, 160),
      image: f.coverPictureUrl || f.CoverPictureUrl || f.primaryImage?.url || f.PrimaryImage?.Url || null
    }))
    .filter(f => f.route && f.route.length > 0);

  // Build routes array (just paths for angular)
  const dynamicRoutes = [
    ...blogRoutes.map(b => b.route),
    ...fornecedorRoutes.map(f => f.route)
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Write routes file
  fs.writeFileSync(path.join(__dirname, 'src', 'prerender-routes.json'), JSON.stringify(allRoutes, null, 2));
  
  // Write metadata file
  const metadata = {};
  [...blogRoutes, ...fornecedorRoutes].forEach(item => {
    metadata[item.route] = {
      title: item.title,
      description: item.description,
      image: item.image
    };
  });
  
  fs.writeFileSync(path.join(__dirname, 'src', 'prerender-metadata.json'), JSON.stringify(metadata, null, 2));
  
  console.log('Generated prerender-routes.json with', allRoutes.length, 'routes');
  console.log('Generated prerender-metadata.json with', Object.keys(metadata).length, 'metadata entries');
  console.log('Static:', staticRoutes.length, 'Dynamic:', dynamicRoutes.length);
}

generateRoutes().catch(console.error);