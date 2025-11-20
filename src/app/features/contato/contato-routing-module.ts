import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoPageComponent } from './contato-page';

const routes: Routes = [
  { path: '', component: ContatoPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContatoRoutingModule {}
