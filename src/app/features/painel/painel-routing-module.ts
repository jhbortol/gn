import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierGuard } from './guards/supplier.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login-page').then(m => m.LoginPageComponent)
  },
  {
    path: '',
    canActivate: [SupplierGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./dashboard/dashboard-page').then(m => m.DashboardPageComponent)
      },
      {
        path: 'perfil',
        loadComponent: () => import('./perfil/perfil-page').then(m => m.PerfilPageComponent)
      },
      {
        path: 'imagens',
        loadComponent: () => import('./imagens/imagens-page').then(m => m.ImagensPageComponent)
      },
      {
        path: 'testemunhos',
        loadComponent: () => import('./testemunhos/testemunhos-page').then(m => m.TestemunhosPageComponent)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule { }
