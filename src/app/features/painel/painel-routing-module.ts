import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierGuard } from './guards/supplier.guard';

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login-page').then(m => m.LoginPageComponent)
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./forgot-password/forgot-password-page').then(m => m.ForgotPasswordPage)
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./reset-password/reset-password-page').then(m => m.ResetPasswordPage)
  },
  {
    path: 'redefinir-senha',
    loadComponent: () => import('./reset-password/reset-password-page').then(m => m.ResetPasswordPage)
  },
  {
    path: '',
    canActivate: [SupplierGuard],
    loadComponent: () => import('./layout/painel-layout').then(m => m.PainelLayoutComponent),
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
        loadComponent: () => import('./imagens/imagens-page').then(m => m.ImagensPage)
      },
      {
        path: 'testemunhos',
        loadComponent: () => import('./testemunhos/testemunhos-page').then(m => m.TestemunhosPage)
      },
      {
        path: 'alterar-senha',
        loadComponent: () => import('./alterar-senha/alterar-senha-page').then(m => m.AlterarSenhaPage)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelRoutingModule { }
