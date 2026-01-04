import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuiaPrecosPage } from './guia-precos-page';

const routes: Routes = [
  {
    path: '',
    component: GuiaPrecosPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    GuiaPrecosPage
  ]
})
export class GuiaPrecosModule { }
