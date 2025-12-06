import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PainelRoutingModule } from './painel-routing-module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PainelRoutingModule
  ]
})
export class PainelModule { }
