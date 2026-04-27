import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DestaqueSemanaService } from '../../../core/services/destaque-semana.service';
import { FornecedoresData, FornecedorListDto } from '../../../features/fornecedores/services/fornecedores-data';
import { TrackingService } from '../../../core/tracking.service';
import { LeadFormComponent } from '../../../features/fornecedores/lead-form.component';
import { CidadeService } from '../../../core/cidade.service';
import { DestaqueSemana } from '../../../core/models/destaque-semana.model';

const SESSION_KEY = 'destaque_popup_shown';
const POPUP_DELAY_MS = 2000;
const WHATSAPP_MESSAGE = 'Te achei no Guia Noivas Piracicaba, e quero mais informações';

@Component({
  selector: 'app-destaque-popup',
  standalone: true,
  imports: [CommonModule, RouterModule, LeadFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    .dp-close-btn:hover { background: rgba(255,255,255,0.16) !important; color: #fff !important; }
    .dp-wa-btn:hover { filter: brightness(1.1); }
    .dp-profile-link:hover { background: rgba(212,160,23,0.08) !important; }
  `],
  template: `
    <ng-container *ngIf="visible()">
      <!-- Backdrop -->
      <div
        class="fixed inset-0 z-[400] bg-black/70 backdrop-blur-sm"
        role="presentation"
        aria-hidden="true"
        (click)="close()">
      </div>

      <!-- Panel -->
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="destaque-popup-title"
        class="fixed inset-0 z-[401] flex items-center justify-center p-4 pointer-events-none">

        <div class="relative w-full max-w-sm rounded-2xl overflow-hidden pointer-events-auto shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
             style="background:#0f0f14;"
             (click)="$event.stopPropagation()">

          <!-- Gold top accent line -->
          <div class="h-[3px] w-full" style="background: linear-gradient(90deg, #b8860b 0%, #f5d06a 40%, #d4a017 70%, #b8860b 100%);"></div>

          <!-- Close button -->
          <button
            (click)="close()"
            aria-label="Fechar"
            class="dp-close-btn absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style="background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.6);">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Centered badge row -->
          <div class="flex justify-center pt-5 pb-3 px-4">
            <span class="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"
                  style="color:#d4a017; letter-spacing:0.18em;">
              <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Destaque da Semana
              <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </span>
          </div>

          <!-- Image -->
          <div class="relative mx-4 rounded-xl overflow-hidden" style="height:200px;" *ngIf="destaque()">
            <img
              [src]="destaque()!.imageUrl || 'assets/fornecedores/placeholder.jpg'"
              [alt]="fornecedor()?.nome || 'Destaque da Semana'"
              class="w-full h-full object-cover"
              style="filter:brightness(0.75);"
              (error)="onImgError($event)" />
            <!-- Bottom gradient overlay -->
            <div class="absolute inset-0" style="background:linear-gradient(to top, rgba(15,15,20,0.85) 0%, transparent 55%);"></div>
            <!-- Gold corner ornaments -->
            <div class="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 rounded-tl" style="border-color:#d4a017;"></div>
            <div class="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 rounded-tr" style="border-color:#d4a017;"></div>
            <div class="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 rounded-bl" style="border-color:#d4a017;"></div>
            <div class="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 rounded-br" style="border-color:#d4a017;"></div>
          </div>

          <!-- Content -->
          <div class="px-5 pt-4 pb-5" *ngIf="fornecedor() as f">
            <p class="text-[10px] font-bold uppercase tracking-widest mb-1" style="color:#d4a017;">
              {{ f.categoria?.nome || 'Fornecedor' }}
            </p>
            <h2 id="destaque-popup-title" class="font-serif font-bold text-xl leading-snug mb-1" style="color:#f0e6c8;">
              {{ f.nome }}
            </h2>
            <p class="text-xs mb-3 flex items-center gap-1.5" style="color:rgba(255,255,255,0.45);" *ngIf="f.cidade">
              <svg class="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24" style="color:#d4a017;">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {{ f.cidade }}
            </p>

            <!-- Gold divider -->
            <div class="mb-4 h-px w-10" style="background:linear-gradient(90deg,#d4a017,transparent);"></div>

            <p class="text-sm mb-4 line-clamp-2" style="color:rgba(255,255,255,0.55);" *ngIf="f.descricao">
              {{ f.descricao }}
            </p>

            <div class="flex flex-col gap-2.5">
              <!-- WhatsApp CTA -->
              <button
                *ngIf="hasWhatsApp(f)"
                type="button"
                (click)="onWhatsAppClick(f)"
                class="dp-wa-btn w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold tracking-wide transition-all"
                style="background:linear-gradient(135deg,#1a7a2e 0%,#25a03c 100%); color:#fff; box-shadow:0 4px 18px rgba(30,160,60,0.35);">                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Falar no WhatsApp
              </button>

              <!-- View profile link -->
              <a
                [routerLink]="buildUrl(['fornecedores', f.slug])"
                (click)="close()"
                class="dp-profile-link w-full block text-center py-3 rounded-xl text-sm font-bold tracking-wide transition-colors"
                style="border:1px solid rgba(212,160,23,0.55); color:#d4a017;">
                Ver Perfil Completo
              </a>
            </div>
          </div>

          <!-- Skeleton while loading -->
          <div class="px-5 pt-4 pb-5 animate-pulse" *ngIf="!fornecedor() && !loadError()">
            <div class="h-4 rounded w-1/3 mb-2" style="background:rgba(255,255,255,0.1);"></div>
            <div class="h-6 rounded w-2/3 mb-3" style="background:rgba(255,255,255,0.1);"></div>
            <div class="h-3 rounded w-1/2 mb-5" style="background:rgba(255,255,255,0.07);"></div>
            <div class="h-11 rounded-xl mb-2.5" style="background:rgba(255,255,255,0.1);"></div>
            <div class="h-11 rounded-xl" style="background:rgba(255,255,255,0.07);"></div>
          </div>

          <!-- Gold bottom accent line -->
          <div class="h-[2px] w-full" style="background: linear-gradient(90deg, transparent 0%, #d4a017 30%, #f5d06a 50%, #d4a017 70%, transparent 100%);"></div>
        </div>
      </div>

      <!-- Lead capture modal (WhatsApp gate) -->
      <div
        *ngIf="showLeadModal()"
        class="fixed inset-0 z-[500] flex items-end sm:items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="destaque-lead-modal-title">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60" (click)="closeLeadModal()"></div>

        <div role="document" class="relative w-full sm:max-w-md max-h-[92vh] overflow-y-auto shadow-2xl rounded-2xl">
          <!-- Header -->
          <div class="sticky top-0 bg-white px-6 py-4 border-b border-gray-100 rounded-t-2xl flex items-start justify-between gap-3 z-10">
            <div>
              <h3 id="destaque-lead-modal-title" class="font-bold text-lg text-gray-900 leading-snug">
                Um passo antes de ir ao WhatsApp
              </h3>
              <p class="text-sm text-gray-500 mt-0.5">Deixe seus dados para que o fornecedor já saiba sobre seu evento</p>
            </div>
            <button (click)="closeLeadModal()" aria-label="Fechar" class="shrink-0 text-gray-400 hover:text-gray-600 p-1 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <!-- Lead form -->
          <div class="bg-white rounded-b-2xl">
            <app-lead-form
              *ngIf="fornecedor() as f"
              [fornecedorId]="f.id"
              [compact]="true"
              [compactActionLabel]="'Continuar para WhatsApp'"
              (submitSuccess)="onLeadSuccess()">
            </app-lead-form>
          </div>
        </div>
      </div>
    </ng-container>
  `,
})
export class DestaquePopupComponent implements OnInit, OnDestroy {
  visible = signal(false);
  destaque = signal<DestaqueSemana | null>(null);
  fornecedor = signal<FornecedorListDto | null>(null);
  loadError = signal(false);
  showLeadModal = signal(false);

  private pendingWhatsAppUrl = '';
  private timer?: ReturnType<typeof setTimeout>;
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private destaqueService = inject(DestaqueSemanaService);
  private fornecedoresData = inject(FornecedoresData);
  private tracking = inject(TrackingService);
  private cidadeService = inject(CidadeService);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    this.destaqueService.getActive().subscribe(d => {
      if (!d) return;
      this.destaque.set(d);

      // Load supplier details to get WhatsApp URL, name, etc.
      this.fornecedoresData.getById(d.fornecedorSlug).subscribe({
        next: f => {
          // Map Fornecedor → FornecedorListDto-compatible shape
          const listDto: FornecedorListDto = {
            id: f.id,
            nome: f.nome,
            slug: f.slug,
            descricao: f.descricao,
            cidade: f.cidade,
            rating: f.rating,
            telefone: f.telefone,
            whatsAppUrl: f.whatsAppUrl,
            planLevel: f.planLevel,
            categoria: f.categoria ? { id: '', nome: f.categoria, slug: '' } : undefined,
            primaryImage: f.primaryImage,
            imagens: f.imagens?.map(i => ({
              id: (i as { id?: string }).id ?? '',
              url: i.url,
              isPrimary: (i as { isPrimary?: boolean }).isPrimary ?? false,
              orderIndex: (i as { orderIndex?: number }).orderIndex ?? 0,
            })),
          };
          this.fornecedor.set(listDto);
          this.cdr.markForCheck();
          this.schedulePopup();
        },
        error: () => {
          this.loadError.set(true);
          this.cdr.markForCheck();
        }
      });
    });
  }

  ngOnDestroy(): void {
    if (this.timer) clearTimeout(this.timer);
  }

  private schedulePopup(): void {
    this.timer = setTimeout(() => {
      this.visible.set(true);
      this.cdr.markForCheck();
    }, POPUP_DELAY_MS);
  }

  close(): void {
    this.visible.set(false);
    this.showLeadModal.set(false);
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.setItem(SESSION_KEY, '1');
    }
    this.cdr.markForCheck();
  }

  hasWhatsApp(f: FornecedorListDto): boolean {
    if (!f) return false;
    if (f.whatsAppUrl) return true;
    const digits = (f.telefone || '').replace(/\D/g, '');
    return digits.length >= 10;
  }

  private buildWhatsAppUrl(f: FornecedorListDto): string {
    const encodedMessage = encodeURIComponent(WHATSAPP_MESSAGE);
    if (f.whatsAppUrl) {
      const url = f.whatsAppUrl;
      if ((url.includes('wa.me') || url.includes('whatsapp.com/send')) && !url.includes('text=')) {
        return `${url}${url.includes('?') ? '&' : '?'}text=${encodedMessage}`;
      }
      return url;
    }
    const digits = (f.telefone || '').replace(/\D/g, '');
    return digits ? `https://wa.me/${digits}?text=${encodedMessage}` : '#';
  }

  onWhatsAppClick(f: FornecedorListDto): void {
    // Track the click in Google Analytics via GTM dataLayer
    this.tracking.trackContactClick('whatsapp', {
      vendorId: f.id,
      vendorName: f.nome,
      vendorCategory: f.categoria?.nome,
    });

    const url = this.buildWhatsAppUrl(f);
    if (!url || url === '#') return;

    this.pendingWhatsAppUrl = url;
    this.showLeadModal.set(true);
    this.cdr.markForCheck();
  }

  closeLeadModal(): void {
    this.showLeadModal.set(false);
    this.pendingWhatsAppUrl = '';
    this.cdr.markForCheck();
  }

  onLeadSuccess(): void {
    this.showLeadModal.set(false);
    if (this.pendingWhatsAppUrl && typeof window !== 'undefined') {
      window.open(this.pendingWhatsAppUrl, '_blank', 'noopener,noreferrer');
    }
    this.pendingWhatsAppUrl = '';
    this.close();
    this.cdr.markForCheck();
  }

  buildUrl(path: string[]): string {
    const [base, ...rest] = path;
    const fullPath = rest.length ? `${base}/${rest.join('/')}` : base;
    return this.cidadeService.buildUrl(fullPath);
  }

  onImgError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) img.src = 'assets/fornecedores/placeholder.jpg';
  }
}
