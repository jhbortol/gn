const fs = require('fs');
const path = require('path');

async function getBlogPrerenderParams() {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
    const response = await fetch(`${apiUrl}/blog?page=1&pageSize=100`);
    
    if (!response.ok) {
      console.warn('Failed to fetch blog posts for prerendering');
      return [];
    }

    const data = await response.json();
    const posts = data.data || [];
    
    return posts
      .map((post) => ({
        slug: post.slug || post.Slug
      }))
      .filter((p) => typeof p.slug === 'string' && p.slug.length > 0)
      .map(p => p.slug);
  } catch (error) {
    console.warn('Error fetching blog posts for prerendering:', error);
    return [];
  }
}

async function getFornecedoresPrerenderParams() {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
    const response = await fetch(`${apiUrl}/fornecedores/ativos?page=1&pageSize=200&publicado=true`);
    
    if (!response.ok) {
      console.warn('Failed to fetch suppliers for prerendering');
      return [];
    }

    const result = await response.json();
    const fornecedores = result.data || [];
    
    return fornecedores
      .map((fornecedor) => ({
        id: fornecedor.slug || fornecedor.Slug || fornecedor.id || fornecedor.Id
      }))
      .filter((p) => typeof p.id === 'string' && p.id.length > 0)
      .map(p => p.id);
  } catch (error) {
    console.warn('Error fetching suppliers for prerendering:', error);
    return [];
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

  console.log('Fetching dynamic routes...');
  const blogSlugs = await getBlogPrerenderParams();
  const fornecedorIds = await getFornecedoresPrerenderParams();

  const dynamicRoutes = [
    ...blogSlugs.map(slug => `/piracicaba/blog/${slug}`),
    ...fornecedorIds.map(id => `/piracicaba/fornecedores/${id}`)
  ];

  const allRoutes = [...staticRoutes, ...dynamicRoutes];

  // Write to src/prerender-routes.js
  const content = `module.exports = ${JSON.stringify(allRoutes, null, 2)};`;

  fs.writeFileSync(path.join(__dirname, 'src', 'prerender-routes.js'), content);
  console.log('Generated prerender-routes.js with', allRoutes.length, 'routes');
  console.log('Static:', staticRoutes.length, 'Dynamic:', dynamicRoutes.length);
}

generateRoutes().catch(console.error);