import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoriasPageComponent } from './categorias-page';
import { CategoriaDetalhePageComponent } from './categoria-detalhe-page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPageComponent
  },
  {
    path: ':id',
    component: CategoriaDetalhePageComponent
  }
];

// For prerendering dynamic categoria IDs
export function getPrerenderParams(): Promise<Record<string, string>[]> {
  // Sem acesso DI/HttpClient aqui; retornamos array vazio (rotas dinâmicas serão resolvidas em runtime)
  return Promise.resolve([]);
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
