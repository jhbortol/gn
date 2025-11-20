import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasData } from './services/categorias-data';

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
  // You may want to inject CategoriasData if using DI, but for static build, instantiate directly
  const categoriasData = new CategoriasData();
  return Promise.resolve(categoriasData.getAll().map(categoria => ({ id: categoria.id })));
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
