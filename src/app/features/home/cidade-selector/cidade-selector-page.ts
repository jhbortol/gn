import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CidadeService } from '../../../core/cidade.service';
import { CidadeDto } from '../../../core/models/cidade.model';
import { MetaTagService } from '../../../core/meta-tag.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cidade-selector-page',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-gradient-to-br from-rose-50 to-white flex flex-col items-center justify-center px-4 py-16">
      <div class="text-center mb-10">
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-rose-800 mb-3">Guia Noivas</h1>
        <p class="text-lg text-gray-600">Selecione sua cidade para começar</p>
      </div>

      <div *ngIf="cidades$ | async as cidades; else loading"
           class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
        <button
          *ngFor="let cidade of cidades"
          (click)="selecionarCidade(cidade)"
          class="bg-white border border-rose-200 rounded-2xl p-6 text-left shadow-sm hover:shadow-md hover:border-rose-400 transition-all focus:outline-none focus:ring-2 focus:ring-rose-400">
          <div class="text-xl font-semibold text-gray-800">{{ cidade.nome }}</div>
          <div *ngIf="cidade.estado" class="text-sm text-gray-500 mt-1">{{ cidade.estado }}</div>
        </button>
      </div>

      <ng-template #loading>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
          <div *ngFor="let i of [1,2,3]" class="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm animate-pulse">
            <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
      </ng-template>
    </div>
  `
})
export class CidadeSelectorPage implements OnInit {
  cidades$!: Observable<CidadeDto[]>;

  private cidadeService = inject(CidadeService);
  private router = inject(Router);
  private metaTagService = inject(MetaTagService);

  ngOnInit(): void {
    this.cidades$ = this.cidadeService.getCidades();
    this.metaTagService.applyMetadata('/');
  }

  selecionarCidade(cidade: CidadeDto): void {
    this.cidadeService.setPreferredCidade(cidade.slug);
    this.router.navigate(['/', cidade.slug]);
  }
}
