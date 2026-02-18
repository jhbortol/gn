import { RenderMode, ServerRoute } from '@angular/ssr';
import { getPrerenderParams as getCategoriasPrerenderParams } from './features/categorias/categorias-routing-module';
import { getPrerenderParams as getFornecedoresPrerenderParams } from './features/fornecedores/fornecedores-routing-module';
import { getPrerenderParams as getBlogPrerenderParams } from './features/blog/blog-routing-module';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':cidade/categorias/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCategoriasPrerenderParams
  },
  {
    path: ':cidade/fornecedores/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getFornecedoresPrerenderParams
  },
  {
    path: ':cidade/blog/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const blogParams = await getBlogPrerenderParams();
      // Map to include cidade parameter (piracicaba)
      return blogParams.map(param => ({
        cidade: 'piracicaba',
        slug: param.slug
      }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
