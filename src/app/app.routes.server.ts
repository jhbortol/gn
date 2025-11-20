import { RenderMode, ServerRoute } from '@angular/ssr';
import { getPrerenderParams as getCategoriasPrerenderParams } from './features/categorias/categorias-routing-module';
import { getPrerenderParams as getFornecedoresPrerenderParams } from './features/fornecedores/fornecedores-routing-module';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'categorias/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getCategoriasPrerenderParams
  },
  {
    path: 'fornecedores/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: getFornecedoresPrerenderParams
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
