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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
