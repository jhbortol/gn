import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnuncieRoutingModule } from './anuncie-routing-module';
import { AnunciePageComponent } from './anuncie-page';

@NgModule({
  imports: [CommonModule, AnuncieRoutingModule, AnunciePageComponent]
})
export class AnuncieModule {}
