# 🎯 Plano de Implementação Frontend - Sistema de Tier

**Data**: 18 de janeiro de 2026  
**Versão**: 1.0  
**Prioridade**: CRÍTICA  
**Timeline**: 4-5 horas  
**Status**: Backend 100% pronto, iniciando frontend

---

## 📋 Visão Geral

Implementar integração do sistema de tier (Free vs Vitrine) no frontend Angular 17 com:
1. ✅ Tipos TypeScript atualizados
2. ✅ Componentes novos (Lead Form, Competitor Ads, Dashboard)
3. ✅ Lógica condicional de renderização
4. ✅ Integração Stripe Checkout

---

## 🔴 FASE 1 - CRÍTICO (30-45 min)

### F1-1: Criar Types e Interfaces Tier

**Arquivo**: `src/app/core/models/tier-system.model.ts` (NOVO)

```typescript
/**
 * Níveis de plano disponíveis
 */
export enum PlanLevel {
  Free = 0,
  Vitrine = 1
}

/**
 * Anúncio de concorrente (injetado em free tier com zumbi state)
 */
export interface CompetitorAd {
  fornecedorId: number;
  nomeFantasia: string;
  fotoUrl: string;
  whatsAppUrl: string;
  detailUrl: string;
}

/**
 * DTO público do fornecedor (retornado pela API com tier logic)
 */
export interface VendorPublicDto {
  id: number;
  nomeFantasia: string;
  descricao?: string;
  fotoUrl: string;
  planLevel: PlanLevel;
  
  // Campos com lógica tier
  phoneDisplay: string;
  whatsAppUrl?: string; // null para Free
  showContactForm: boolean; // true para Free < 3 leads
  adInjection: CompetitorAd[]; // populado apenas em zumbi state
  
  socialMedia?: Record<string, string>;
  position: number;
  updatedAt: string;
}

/**
 * Modelo interno de lead
 */
export interface LeadData {
  clienteName: string;
  clienteEmail: string;
  clientePhone: string;
  message: string;
  lgpdConsent: boolean;
}

/**
 * Resposta após submissão de lead
 */
export interface LeadSubmitResponse {
  success: boolean;
  message: string;
  leadId: number;
}

/**
 * Lead recebido pelo fornecedor (dashboard)
 */
export interface LeadDto {
  id: number;
  clienteName: string;
  clienteEmail: string;
  clientePhone: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

/**
 * Resposta da listagem de leads do painel
 */
export interface FornecedorLeadsResponse {
  totalLeads: number;
  unreadLeads: number;
  leadCountThisMonth: number;
  leadLimit: number; // 3 para Free, 999999 para Vitrine
  leads: LeadDto[];
}
```

**Checklist**:
- [ ] Arquivo criado com todas as interfaces
- [ ] Enum `PlanLevel` exportado
- [ ] Tipos alinhados com backend VendorPublicDto

---

### F1-2: Atualizar Interface `Fornecedor` (Service)

**Arquivo**: `src/app/features/fornecedores/services/fornecedores-data.ts`

Atualizar a interface `Fornecedor` para incluir campos tier:

```typescript
export interface Fornecedor {
  id: string;
  nome: string;
  slug: string;
  descricao?: string;
  cidade?: string;
  endereco?: string;
  horarioFuncionamento?: string;
  telefone?: string;
  email?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  destaque?: boolean;
  seloFornecedor?: boolean;
  ativo?: boolean;
  publicado?: boolean;
  rating?: number | null;
  visitas?: number;
  categoria?: string;
  imagens: Array<{ url: string; orderIndex: number }>;
  depoimentos?: Array<{ texto: string; casal: string }>;
  
  // Novos campos tier (OPCIONAIS para backward compat)
  planLevel?: number;
  whatsAppUrl?: string;
  showContactForm?: boolean;
  adInjection?: CompetitorAd[];
}

// Adicionar import no topo
import { CompetitorAd, PlanLevel } from '../../../core/models/tier-system.model';
```

**Checklist**:
- [ ] Interface `Fornecedor` atualizada
- [ ] Campos novos marcados como opcionais (`?`)
- [ ] Import adicionado

---

### F1-3: Criar Serviço de Lead

**Arquivo**: `src/app/core/services/lead.service.ts` (NOVO)

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LeadData, LeadSubmitResponse, FornecedorLeadsResponse } from '../models/tier-system.model';

@Injectable({ providedIn: 'root' })
export class LeadService {
  constructor(private api: ApiService) {}

  /**
   * Submete um lead para um fornecedor
   * POST /fornecedores/{fornecedorId}/contact
   */
  submitLead(fornecedorId: number, lead: LeadData): Observable<LeadSubmitResponse> {
    return this.api.post(`/fornecedores/${fornecedorId}/contact`, lead);
  }

  /**
   * Obtém leads recebidos pelo fornecedor autenticado
   * GET /fornecedores/me/leads
   * Requer autenticação
   */
  getMyLeads(skip: number = 0, take: number = 50): Observable<FornecedorLeadsResponse> {
    return this.api.get('/fornecedores/me/leads', { skip, take });
  }
}
```

**Checklist**:
- [ ] Serviço criado
- [ ] Métodos `submitLead()` e `getMyLeads()` implementados
- [ ] Registrado no DI (providedIn: 'root')

---

## 🟡 FASE 2 - IMPORTANTE (2-3 horas)

### F2-1: Criar LeadFormComponent

**Arquivo**: `src/app/features/fornecedores/lead-form.component.ts` (NOVO)

```typescript
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { LeadService } from '../../core/services/lead.service';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-6">
      <h3 class="font-serif font-bold text-2xl text-gray-900 mb-2">Enviar Mensagem Direta</h3>
      <p class="text-sm text-gray-600 mb-6">
        Preencha o formulário abaixo e o fornecedor entrará em contato em breve.
      </p>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
        <!-- Nome -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Seu Nome *</label>
          <input
            type="text"
            formControlName="clienteName"
            placeholder="Digite seu nome completo"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            [class.border-red-500]="isFieldInvalid('clienteName')"
          />
          <p *ngIf="isFieldInvalid('clienteName')" class="text-red-500 text-xs mt-1">
            Nome é obrigatório
          </p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
          <input
            type="email"
            formControlName="clienteEmail"
            placeholder="seu@email.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            [class.border-red-500]="isFieldInvalid('clienteEmail')"
          />
          <p *ngIf="isFieldInvalid('clienteEmail')" class="text-red-500 text-xs mt-1">
            Email válido é obrigatório
          </p>
        </div>

        <!-- Telefone -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Telefone *</label>
          <input
            type="tel"
            formControlName="clientePhone"
            placeholder="(11) 98765-4321"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            [class.border-red-500]="isFieldInvalid('clientePhone')"
          />
          <p *ngIf="isFieldInvalid('clientePhone')" class="text-red-500 text-xs mt-1">
            Telefone é obrigatório
          </p>
        </div>

        <!-- Mensagem -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Sua Mensagem *</label>
          <textarea
            formControlName="message"
            placeholder="Conte um pouco sobre suas necessidades..."
            rows="4"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
            [class.border-red-500]="isFieldInvalid('message')"
          ></textarea>
          <p *ngIf="isFieldInvalid('message')" class="text-red-500 text-xs mt-1">
            Mensagem é obrigatória
          </p>
        </div>

        <!-- LGPD Consent -->
        <div class="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <input
            type="checkbox"
            formControlName="lgpdConsent"
            id="lgpdConsent"
            class="mt-1 h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded cursor-pointer"
            [class.border-red-500]="isFieldInvalid('lgpdConsent')"
          />
          <div class="flex-1">
            <label for="lgpdConsent" class="text-sm text-gray-700 cursor-pointer">
              Autorizo o compartilhamento de meus dados de contato com este fornecedor para que possa responder minha solicitação.
              <span class="text-red-600">*</span>
            </label>
            <p class="text-xs text-gray-600 mt-1">
              Seus dados serão usados apenas para responder sua mensagem e não serão compartilhados com terceiros.
            </p>
          </div>
        </div>
        <p *ngIf="isFieldInvalid('lgpdConsent')" class="text-red-500 text-xs">
          Você deve consentir para enviar a mensagem
        </p>

        <!-- Botão -->
        <button
          type="submit"
          [disabled]="!form.valid || isSubmitting"
          class="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
        >
          {{ isSubmitting ? 'Enviando...' : 'Enviar Mensagem' }}
        </button>

        <!-- Mensagens de Status -->
        <div *ngIf="successMessage" class="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          {{ successMessage }}
        </div>

        <div *ngIf="errorMessage" class="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadFormComponent {
  @Input() fornecedorId!: number;
  @Output() submitSuccess = new EventEmitter<number>();

  form = new FormGroup({
    clienteName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    clienteEmail: new FormControl('', [Validators.required, Validators.email]),
    clientePhone: new FormControl('', [Validators.required, Validators.minLength(10)]),
    message: new FormControl('', [Validators.required, Validators.minLength(10)]),
    lgpdConsent: new FormControl(false, [Validators.requiredTrue])
  });

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private leadService: LeadService) {}

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (!this.form.valid || !this.fornecedorId) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.leadService.submitLead(this.fornecedorId, this.form.value as any).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response.message;
        this.form.reset();
        this.submitSuccess.emit(response.leadId);
        // Auto-clear message após 5 segundos
        setTimeout(() => { this.successMessage = ''; }, 5000);
      },
      error: (err) => {
        this.isSubmitting = false;
        const errorMsg = err?.error?.message || 'Erro ao enviar mensagem. Tente novamente.';
        this.errorMessage = errorMsg;
      }
    });
  }
}
```

**Checklist**:
- [ ] Componente criado como standalone
- [ ] Formulário com validações
- [ ] LGPD checkbox obrigatório
- [ ] Integração com `LeadService`
- [ ] Estados de loading/sucesso/erro
- [ ] Styling com Tailwind

---

### F2-2: Criar CompetitorAdsComponent

**Arquivo**: `src/app/features/fornecedores/competitor-ads.component.ts` (NOVO)

```typescript
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CompetitorAd } from '../../core/models/tier-system.model';

@Component({
  selector: 'app-competitor-ads',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  template: `
    <section *ngIf="ads.length" class="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-2xl p-8 mt-8">
      <div class="text-center mb-8">
        <div class="inline-block">
          <span class="text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-md">
            ⭐ PUBLICIDADE
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
          *ngFor="let ad of ads"
          class="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-100 hover:border-amber-300"
        >
          <!-- Imagem -->
          <div class="relative h-40 bg-gray-200 overflow-hidden">
            <img
              [src]="ad.fotoUrl"
              [alt]="ad.nomeFantasia"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>

          <!-- Conteúdo -->
          <div class="p-5">
            <h4 class="font-serif font-bold text-lg text-gray-900 mb-3 line-clamp-2">
              {{ ad.nomeFantasia }}
            </h4>

            <!-- WhatsApp Button -->
            <a
              [href]="ad.whatsAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md mb-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 13.925c.16.331.883 1.728 2.139 3.393.779 1.058 1.007 1.306 1.185 1.612.178.306.15.719-.013 1.379-.723 2.236-1.358 2.1-.921 3.85.219 1.045 1.041 1.942 2.139 2.332.505.167 1.087.21 1.63.125 1.595-.237 2.872-1.162 3.822-2.623 1.624-2.324 2.835-5.646 2.835-9.172 0-5.419-4.409-9.825-9.85-9.825z"/>
              </svg>
              Chamar no WhatsApp
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
```

**Checklist**:
- [ ] Componente criado como standalone
- [ ] Exibe cards com foto, nome e botão WhatsApp
- [ ] Link para perfil completo
- [ ] Styling com Tailwind + gradientes
- [ ] Loading lazy para imagens
- [ ] Responsive (1 coluna mobile, 3 colunas desktop)

---

### F2-3: Atualizar FornecedorPage para usar Tier Logic

**Arquivo**: `src/app/features/fornecedores/fornecedor-page.ts`

Atualizações principais:

```typescript
import { CompetitorAdsComponent } from './competitor-ads.component';
import { LeadFormComponent } from './lead-form.component';

@Component({
  selector: 'app-fornecedor-page',
  standalone: true,
  templateUrl: './fornecedor-page.html',
  styleUrls: ['./fornecedor-page.css'],
  imports: [
    CommonModule,
    RouterModule,
    ClickwrapAgreementComponent,
    CompetitorAdsComponent,  // ← NOVO
    LeadFormComponent         // ← NOVO
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FornecedorPageComponent implements OnInit {
  fornecedor?: Fornecedor;
  selectedImage?: string;
  isPreviewMode = false;
  notFound = false;

  // Novos signals para tier logic
  showLeadForm = signal(false);
  hasCompetitorAds = signal(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fornecedores: FornecedoresData,
    private cdr: ChangeDetectorRef,
    private tracking: TrackingService
  ) {}

  ngOnInit(): void {
    const identifier = this.route.snapshot.params['id'];
    this.isPreviewMode = this.route.snapshot.queryParams['preview'] === 'true';

    if (identifier) {
      this.fornecedores.getById(identifier, this.isPreviewMode).subscribe({
        next: (f) => {
          if (environment.FORNECEDOR_PUBLICADO === true && !this.isPreviewMode && !f.publicado) {
            console.warn('Fornecedor não publicado acessado diretamente:', f.id);
            this.notFound = true;
            this.cdr.markForCheck();
            return;
          }

          this.fornecedor = f;

          // 🔴 NOVO: Aplicar lógica tier
          this.applyTierLogic(f);

          this.tracking.trackVendorView({
            vendorId: f.id,
            vendorName: f.nome,
            vendorCategory: f.categoria
          });
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Error loading fornecedor:', err);
          this.notFound = true;
          this.cdr.markForCheck();
        }
      });
    }
  }

  /**
   * Aplica lógica de tier ao fornecedor
   */
  private applyTierLogic(fornecedor: Fornecedor): void {
    // Se o backend enviou showContactForm, usar esse valor
    // Caso contrário, manter comportamento antigo (always show)
    if (fornecedor.showContactForm !== undefined) {
      this.showLeadForm.set(fornecedor.showContactForm);
    } else {
      this.showLeadForm.set(true); // backward compat
    }

    // Se tem anúncios, mostrar
    if (fornecedor.adInjection && fornecedor.adInjection.length > 0) {
      this.hasCompetitorAds.set(true);
    }
  }

  /**
   * Determinar se deve mostrar botão WhatsApp
   * Se backend enviou whatsAppUrl e é Vitrine, usar esse
   * Caso contrário, gerar localmente (backward compat)
   */
  getWhatsAppLink(): string {
    // Priorizar URL do backend (Vitrine)
    if (this.fornecedor?.whatsAppUrl) {
      return this.fornecedor.whatsAppUrl;
    }

    // Fallback: gerar localmente (Free tier ou dados antigos)
    const w = this.fornecedor?.telefone || '';
    const digits = w.replace(/\D/g, '');
    const message = encodeURIComponent('Olá, Te encontrei no Guia Noivas Piracicaba, preciso de mais informações.');
    return digits ? `https://wa.me/${digits}?text=${message}` : '#';
  }

  /**
   * Callback quando lead é submetido com sucesso
   */
  onLeadSubmitSuccess(leadId: number): void {
    // Exemplo: mostrar toast ou redirecionar
    console.log('Lead enviado com sucesso:', leadId);
    // Opcionalmente: scrollar para seção de depoimentos
  }

  // ... resto dos métodos existentes (openImage, closeImage, etc)
}
```

**Atualizar template** `fornecedor-page.html`:

```html
<!-- No final da seção lg:col-span-2, após depoimentos, adicionar: -->

<!-- NOVO: Lead Form (se Free tier com < 3 leads) -->
<app-lead-form
  *ngIf="showLeadForm()"
  [fornecedorId]="fornecedor.id | slice:0"
  (submitSuccess)="onLeadSubmitSuccess($event)"
></app-lead-form>

<!-- NOVO: Competitor Ads (se Free em zumbi state) -->
<app-competitor-ads
  *ngIf="hasCompetitorAds()"
  [ads]="fornecedor.adInjection!"
></app-competitor-ads>
```

**Checklist**:
- [ ] Imports adicionados (LeadFormComponent, CompetitorAdsComponent)
- [ ] Signals criados para `showLeadForm` e `hasCompetitorAds`
- [ ] Método `applyTierLogic()` implementado
- [ ] Método `getWhatsAppLink()` atualizado para preferir URL do backend
- [ ] Template atualizado com componentes novos
- [ ] Conversão de ID string → number se necessário (slice:0)

---

## 🟢 FASE 3 - OPCIONAL (2-3 horas)

### F3-1: Criar LeadsDashboardComponent

**Arquivo**: `src/app/features/painel/leads-dashboard.component.ts` (NOVO)

```typescript
import { Component, OnInit, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeadService } from '../../core/services/lead.service';
import { FornecedorLeadsResponse } from '../../core/models/tier-system.model';

@Component({
  selector: 'app-leads-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mx-auto px-4 py-10">
      <h1 class="text-4xl font-serif font-bold text-gray-900 mb-10">Meus Leads</h1>

      <!-- Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <!-- Total Leads -->
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
          <div class="text-3xl font-bold text-blue-600">
            {{ leadsData()?.totalLeads ?? 0 }}
          </div>
          <div class="text-sm text-gray-600 mt-2">Total de Leads</div>
        </div>

        <!-- Unread -->
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
          <div class="text-3xl font-bold text-red-600">
            {{ leadsData()?.unreadLeads ?? 0 }}
          </div>
          <div class="text-sm text-gray-600 mt-2">Não Lidos</div>
        </div>

        <!-- This Month -->
        <div class="bg-white rounded-xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">
          <div class="text-3xl font-bold text-amber-600">
            {{ leadsData()?.leadCountThisMonth ?? 0 }}/{{ leadsData()?.leadLimit ?? 0 }}
          </div>
          <div class="text-sm text-gray-600 mt-2">Este Mês</div>
        </div>

        <!-- Upgrade Indicator -->
        <div
          class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md border border-purple-200 p-6 hover:shadow-lg transition"
          [class.opacity-50]="(leadsData()?.leadLimit ?? 0) > 100"
        >
          <div class="text-sm text-purple-700 font-semibold">
            {{ (leadsData()?.leadLimit ?? 0) > 100 ? '✓ Vitrine Ativo' : '⚠️ Limite Free' }}
          </div>
          <a
            *ngIf="(leadsData()?.leadLimit ?? 0) <= 100"
            href="/upgrade"
            class="text-xs text-purple-600 hover:text-purple-700 font-semibold mt-2 block"
          >
            Fazer Upgrade →
          </a>
        </div>
      </div>

      <!-- Leads Table -->
      <div class="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
        <table class="w-full">
          <thead class="bg-gray-50 border-b border-gray-200">
            <tr>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Nome</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Telefone</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Data</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th class="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr
              *ngFor="let lead of leadsData()?.leads ?? []"
              class="border-b border-gray-200 hover:bg-gray-50 transition"
              [class.bg-blue-50]="!lead.isRead"
            >
              <td class="px-6 py-4 text-sm font-medium text-gray-900">
                {{ lead.clienteName }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ lead.clienteEmail }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">
                {{ lead.clientePhone }}
              </td>
              <td class="px-6 py-4 text-sm text-gray-500">
                {{ lead.createdAt | date: 'dd/MM/yyyy HH:mm' }}
              </td>
              <td class="px-6 py-4 text-sm">
                <span
                  *ngIf="!lead.isRead"
                  class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
                >
                  ● Não Lido
                </span>
                <span *ngIf="lead.isRead" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  ✓ Lido
                </span>
              </td>
              <td class="px-6 py-4 text-sm">
                <button
                  (click)="viewLeadDetails(lead)"
                  class="text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Ver
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Empty State -->
        <div *ngIf="!(leadsData()?.leads?.length)" class="text-center py-12">
          <div class="text-gray-400 text-6xl mb-4">📭</div>
          <p class="text-gray-600 font-medium">Nenhum lead recebido ainda</p>
          <p class="text-sm text-gray-500 mt-1">Seus leads aparecerão aqui quando os clientes enviarem mensagens</p>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeadsDashboardComponent implements OnInit {
  leadsData = signal<FornecedorLeadsResponse | null>(null);
  isLoading = signal(false);

  constructor(private leadService: LeadService) {}

  ngOnInit(): void {
    this.loadLeads();
  }

  private loadLeads(): void {
    this.isLoading.set(true);
    this.leadService.getMyLeads(0, 50).subscribe({
      next: (response) => {
        this.leadsData.set(response);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar leads:', err);
        this.isLoading.set(false);
      }
    });
  }

  viewLeadDetails(lead: any): void {
    // TODO: Implementar modal ou página de detalhes
    console.log('Lead details:', lead);
  }
}
```

**Checklist**:
- [ ] Componente criado como standalone
- [ ] Cards de status (total, unread, this month, tier)
- [ ] Tabela de leads com sorting
- [ ] Indicador de tier (Free vs Vitrine)
- [ ] Link para upgrade se Free
- [ ] Empty state
- [ ] Integração com `LeadService`

---

### F3-2: Adicionar Rota do Painel

**Arquivo**: `src/app/app.routes.ts`

```typescript
// Adicionar import
import { LeadsDashboardComponent } from './features/painel/leads-dashboard.component';

// Adicionar rota
export const routes: Routes = [
  // ... rotas existentes
  {
    path: 'painel',
    children: [
      {
        path: 'leads',
        component: LeadsDashboardComponent,
        data: { title: 'Meus Leads' }
      }
    ]
  }
];
```

**Checklist**:
- [ ] Rota `/painel/leads` criada
- [ ] Componente registrado
- [ ] Requer autenticação (adicionar guard se necessário)

---

## 📋 Checklist de Implementação

### Fase 1 (30-45 min)
- [ ] `tier-system.model.ts` criado com tipos e interfaces
- [ ] Interface `Fornecedor` atualizada
- [ ] `LeadService` criado

### Fase 2 (2-3 horas)
- [ ] `LeadFormComponent` criado
- [ ] `CompetitorAdsComponent` criado
- [ ] `FornecedorPage` atualizado com tier logic
- [ ] Template atualizado
- [ ] Testado com Free < 3 leads
- [ ] Testado com Free >= 3 leads (zumbi state)
- [ ] Testado com Vitrine

### Fase 3 (2-3 horas - Opcional)
- [ ] `LeadsDashboardComponent` criado
- [ ] Rota `/painel/leads` adicionada
- [ ] Autenticação configurada

---

## 🧪 Testes Recomendados

### Teste 1: Free Tier Com < 3 Leads
```
1. Carregar fornecedor Free (planLevel = 0, leadCount = 0)
2. Verificar:
   ✓ WhatsApp link NÃO apareça (ou apareça cinzento)
   ✓ LeadForm apareça
   ✓ AdInjection vazio (não renderiza)
```

### Teste 2: Free Tier Com = 3 Leads (Zumbi State)
```
1. Carregar fornecedor Free (planLevel = 0, leadCount = 3)
2. Verificar:
   ✓ WhatsApp link NÃO apareça
   ✓ LeadForm desapareça
   ✓ 3 anúncios de concorrentes Vitrine apareçam
```

### Teste 3: Vitrine Tier
```
1. Carregar fornecedor Vitrine (planLevel = 1)
2. Verificar:
   ✓ WhatsApp link apareça e funcione (com URL do backend)
   ✓ LeadForm desapareça
   ✓ AdInjection vazio (não renderiza)
```

### Teste 4: Submissão de Lead
```
1. Preencher LeadForm com dados válidos
2. Clicar "Enviar Mensagem"
3. Verificar:
   ✓ POST /fornecedores/{id}/contact chamado
   ✓ Mensagem de sucesso apareça
   ✓ Formulário limpe
```

### Teste 5: Dashboard de Leads
```
1. Autenticar como fornecedor
2. Acessar /painel/leads
3. Verificar:
   ✓ GET /fornecedores/me/leads chamado
   ✓ Cards de status exibem corretamente
   ✓ Tabela mostra leads com formato correto
   ✓ Limite exibido (3 ou ilimitado)
```

---

## 🎯 Próximos Passos

1. ✅ Implementar Fase 1 (types + service)
2. ✅ Implementar Fase 2 (componentes + page update)
3. ✅ Testar integração com backend
4. ⭕ Implementar Fase 3 (painel + dashboard)
5. ⭕ Stripe Checkout (upgrade flow)
6. ⭕ Deploy e validação em produção

---

## 📞 Suporte & Dúvidas

Se encontrar problemas:
1. Verificar console do navegador (errors/warnings)
2. Verificar Network tab (chamadas API)
3. Verificar que backend retorna `VendorPublicDto` com campos novos
4. Validar tokens JWT para endpoints autenticados

