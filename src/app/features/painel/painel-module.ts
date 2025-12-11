import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PainelRoutingModule } from './painel-routing-module';
import { supplierAuthInterceptor } from './interceptors/supplier-auth.interceptor';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PainelRoutingModule
  ],
  providers: [
    provideHttpClient(withInterceptors([supplierAuthInterceptor]))
  ]
})
export class PainelModule { }
