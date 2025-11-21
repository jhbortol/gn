import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sobre',
    loadComponent: () => import('./sobre-nos').then(m => m.SobreNosPageComponent)
  },
  {
    path: 'termos',
    loadComponent: () => import('./termos').then(m => m.TermosPageComponent)
  },
  {
    path: '',
    redirectTo: 'sobre',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitucionalRoutingModule { }
