import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompetitorAd } from '../../core/models/tier-system.model';

@Component({
  selector: 'app-competitor-ads',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section *ngIf="ads.length" class="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 mt-8">
      <div class="text-center mb-8">
        <div class="inline-block">
          <span class="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-md uppercase tracking-wide">
            ⭐ Publicidade
          </span>
        </div>
        <h3 class="text-2xl font-serif font-bold text-gray-900 mt-4 mb-2">
          Outras Opções Recomendadas
        </h3>
        <p class="text-sm text-gray-700">
          Confira esses fornecedores que podem também atender suas necessidades
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          *ngFor="let ad of ads.slice(0, 3)"
          class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100 hover:border-amber-300"
        >
          <!-- Imagem -->
          <div class="relative h-40 bg-gray-200 overflow-hidden">
            <img
              [src]="ad.fotoUrl"
              [alt]="ad.nomeFantasia"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <!-- Conteúdo -->
          <div class="p-5">
            <h4 class="font-serif font-bold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
              {{ ad.nomeFantasia }}
            </h4>

            <!-- WhatsApp Button -->
            <a
              [href]="ad.whatsAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md mb-3"
              [attr.aria-label]="'Contatar ' + ad.nomeFantasia + ' via WhatsApp'"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 13.925c.16.331.883 1.728 2.139 3.393.779 1.058 1.007 1.306 1.185 1.612.178.306.15.719-.013 1.379-.723 2.236-1.358 2.1-.921 3.85.219 1.045 1.041 1.942 2.139 2.332.505.167 1.087.21 1.63.125 1.595-.237 2.872-1.162 3.822-2.623 1.624-2.324 2.835-5.646 2.835-9.172 0-5.419-4.409-9.825-9.85-9.825z"/>
              </svg>
              Contatar no WhatsApp
            </a>

            <!-- Link para detalhes -->
            <a
              [routerLink]="['/fornecedores', ad.fornecedorId]"
              class="flex items-center justify-center text-rose-600 hover:text-rose-700 font-semibold text-sm transition-colors"
            >
              Ver Perfil Completo →
            </a>
          </div>
        </div>
      </div>

      <!-- Upgrade CTA -->
      <div class="text-center mt-8 pt-6 border-t border-amber-200">
        <p class="text-sm text-gray-700 mb-3">
          É fornecedor de casamentos? Apareça aqui e receba mais clientes!
        </p>
        <a routerLink="/anuncie" 
           class="inline-flex items-center gap-2 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z"/>
          </svg>
          Anuncie no Guia Noivas
        </a>
      </div>
    </section>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompetitorAdsComponent {
  @Input() ads: CompetitorAd[] = [];
}

