import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedoresData } from './services/fornecedores-data';

const routes: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./fornecedor-page').then(m => m.FornecedorPageComponent)
  }
];

// For prerendering dynamic fornecedor IDs
export function getPrerenderParams(): Promise<Record<string, string>[]> {
  // You may want to inject FornecedoresData if using DI, but for static build, instantiate directly
  const fornecedoresData = new FornecedoresData();
  return Promise.resolve(fornecedoresData.getAll().map(fornecedor => ({ id: fornecedor.id })));
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
