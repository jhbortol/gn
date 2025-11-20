import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnunciePageComponent } from './anuncie-page';

const routes: Routes = [
  { path: '', component: AnunciePageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnuncieRoutingModule {}
