import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ':id',
    loadComponent: () => import('./fornecedor-page').then(m => m.FornecedorPageComponent)
  }
];

// Prerender desabilitado para fornecedores dinâmicos (dados vindos da API)
export function getPrerenderParams(): Promise<Record<string, string>[]> {
  return Promise.resolve([]);
}

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FornecedoresRoutingModule { }
