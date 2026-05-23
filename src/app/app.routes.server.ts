import { RenderMode, ServerRoute } from '@angular/ssr';
import { getPrerenderParams as getCategoriasPrerenderParams } from './features/categorias/categorias-routing-module';
import { getPrerenderParams as getFornecedoresPrerenderParams } from './features/fornecedores/fornecedores-routing-module';
import { getPrerenderParams as getBlogPrerenderParams } from './features/blog/blog-routing-module';

const API_BASE_URL = process.env['API_BASE_URL'] || 'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';

async function getCidadesSlugs(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/cidades`);
    if (!res.ok) return ['piracicaba'];
    const data = await res.json();
    const list: any[] = Array.isArray(data) ? data : (data?.data ?? []);
    const slugs = list
      .map((c: any) => ((c.slug || c.Slug || '') as string).toLowerCase())
      .filter(Boolean);
    return slugs.length > 0 ? slugs : ['piracicaba'];
  } catch {
    return ['piracicaba'];
  }
}

export const serverRoutes: ServerRoute[] = [
  {
    path: ':cidade/categorias/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCategoriasPrerenderParams
  },
  {
    path: ':cidade/fornecedores/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const fornecedoresParams = await getFornecedoresPrerenderParams();
      // Each vendor carries its own cidadeSlug; fall back to the first available city
      const defaultCidades = await getCidadesSlugs();
      const defaultCidade = defaultCidades[0] ?? 'piracicaba';
      return fornecedoresParams.map(param => ({
        cidade: param.cidadeSlug ?? defaultCidade,
        id: param.id
      }));
    }
  },
  {
    path: ':cidade/blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const [cidades, blogParams] = await Promise.all([getCidadesSlugs(), getBlogPrerenderParams()]);
      // Blog posts are not city-specific; prerender for every available city
      return cidades.flatMap(cidade => blogParams.map(param => ({ cidade, slug: param.slug })));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
