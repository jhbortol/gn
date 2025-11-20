import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContatoRoutingModule } from './contato-routing-module';
import { ContatoPageComponent } from './contato-page';

@NgModule({
  imports: [CommonModule, ContatoRoutingModule, ContatoPageComponent]
})
export class ContatoModule {}
