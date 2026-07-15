import { Component, Input, OnInit, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FornecedoresData, FornecedorListDto } from './services/fornecedores-data';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-cross-selling',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section *ngIf="recommendedVendors().length > 0" class="mt-10 mb-6">
      <div class="mb-6">
        <h3 class="text-2xl font-serif font-bold text-gray-900">
          Complete seu Casamento
        </h3>
        <p class="text-sm text-gray-600 mt-1">
          Conheça também estes profissionais recomendados para o seu grande dia.
        </p>
      </div>

      <!-- Grid: Horizontal scroll no mobile, 2 colunas no desktop -->
      <div class="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 hide-scrollbar">

        <div *ngFor="let vendor of recommendedVendors()"
             class="snap-start shrink-0 w-[85%] md:w-auto bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">

          <!-- Imagem de Capa -->
          <div class="relative aspect-video bg-gray-100 overflow-hidden">
            <img *ngIf="vendor.primaryImage?.url || vendor.imagens?.[0]?.url"
                 [src]="vendor.primaryImage?.url || vendor.imagens?.[0]?.url"
                 [alt]="vendor.nome"
                 loading="lazy"
                 class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
            <div *ngIf="!vendor.primaryImage?.url && !vendor.imagens?.[0]?.url"
                 class="w-full h-full flex items-center justify-center text-gray-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <!-- Conteúdo -->
          <div class="p-5 flex flex-col flex-grow">
            <div class="mb-2">
              <span class="inline-block text-xs bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md font-semibold">
                {{ vendor.categoria?.nome || vendor.categoria }}
              </span>
            </div>

            <h4 class="font-serif font-bold text-lg text-gray-900 mb-4 line-clamp-2" [title]="vendor.nome">
              {{ vendor.nome }}
            </h4>

            <div class="mt-auto">
              <a [routerLink]="['/fornecedores', vendor.slug || vendor.id]"
                 class="inline-flex items-center justify-center w-full gap-2 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-600 border border-gray-200 hover:border-rose-200 rounded-lg py-2 px-4 font-semibold text-sm transition-all duration-200">
                Ver Perfil
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrossSellingComponent implements OnInit {
  @Input() currentCategoryId?: string;
  @Input() currentCategoryName?: string;
  @Input() currentVendorId?: string;

  recommendedVendors = signal<FornecedorListDto[]>([]);
  private fornecedoresData = inject(FornecedoresData);

  async ngOnInit() {
    try {
      // Buscar até 48 fornecedores destaque (Vitrine) para ter opções
      const allDestaques = await firstValueFrom(this.fornecedoresData.getDestaques(1, 48));

      if (!allDestaques || allDestaques.length === 0) return;

      // Pegar categorias a excluir
      const excludeCatId = this.currentCategoryId?.toLowerCase();
      const excludeCatName = this.currentCategoryName?.toLowerCase();

      // Filtrar validos: não pode ser da mesma categoria, nem ser o próprio fornecedor
      const validVendors = allDestaques.filter(v => {
        if (this.currentVendorId && v.id === this.currentVendorId) return false;

        const vCatId = typeof v.categoria === 'object' ? v.categoria?.id?.toLowerCase() : undefined;
        const vCatName = typeof v.categoria === 'object' ? v.categoria?.nome?.toLowerCase() : (typeof v.categoria === 'string' ? (v.categoria as string).toLowerCase() : undefined);

        if (excludeCatId && vCatId === excludeCatId) return false;
        if (excludeCatName && vCatName === excludeCatName) return false;

        return true;
      });

      // Se não sobrou nada, sai
      if (validVendors.length < 1) return;

      // Embaralhar para randomização
      const shuffled = [...validVendors].sort(() => 0.5 - Math.random());

      const selected: FornecedorListDto[] = [];
      const selectedCategories = new Set<string>();

      // Selecionar exatamente 2 com categorias diferentes
      for (const vendor of shuffled) {
        const vCatName = typeof vendor.categoria === 'object' ? vendor.categoria?.nome?.toLowerCase() : (typeof vendor.categoria === 'string' ? (vendor.categoria as string).toLowerCase() : 'unknown');

        if (!selectedCategories.has(vCatName)) {
          selected.push(vendor);
          selectedCategories.add(vCatName);
        }

        if (selected.length === 2) break;
      }

      // Fallback: Se não conseguiu 2 de categorias diferentes, tentar pegar o que der
      // (ex: só tem fornecedores da categoria X além da atual, então pega 2 da categoria X)
      if (selected.length < 2) {
         for (const vendor of shuffled) {
           if (!selected.find(s => s.id === vendor.id)) {
             selected.push(vendor);
           }
           if (selected.length === 2) break;
         }
      }

      this.recommendedVendors.set(selected);

    } catch (error) {
      console.error('Error fetching cross-selling vendors:', error);
    }
  }
}
