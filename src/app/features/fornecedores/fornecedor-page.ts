import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClickwrapAgreementComponent } from '../../shared/clickwrap-agreement/clickwrap-agreement';
import { FornecedoresData, Fornecedor } from './services/fornecedores-data';
import { TrackingService } from '../../core/tracking.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LeadFormComponent } from './lead-form.component';
import { CompetitorAdsComponent } from './competitor-ads.component';
import { PlanLevel } from '../../core/models/tier-system.model';

@Component({
  selector: 'app-fornecedor-page',
  standalone: true,
  templateUrl: './fornecedor-page.html',
  styleUrls: ['./fornecedor-page.css'],
  imports: [
    CommonModule,
    RouterModule,
    ClickwrapAgreementComponent,
    LeadFormComponent,
    CompetitorAdsComponent
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
  showClaimBar = signal(false);

  // Expor enum para o template
  PlanLevel = PlanLevel;

  // Getter para fornecedorId
  get fornecedorId(): string {
    return this.fornecedor?.id || '';
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fornecedores: FornecedoresData,
    private cdr: ChangeDetectorRef,
    private tracking: TrackingService
  ) { }

  ngOnInit(): void {
    const identifier = this.route.snapshot.params['id']; // pode ser GUID ou slug
    this.isPreviewMode = this.route.snapshot.queryParams['preview'] === 'true';

    if (identifier) {
      this.fornecedores.getById(identifier, this.isPreviewMode).subscribe({
        next: (f) => {
          // Validate publicado field if environment requires it
          // Only enforce if FORNECEDOR_PUBLICADO is true (production) and not in preview mode
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

  private trackPageView(): void {
    if (typeof window !== 'undefined' && (window as any).dataLayer && this.fornecedor) {
      (window as any).dataLayer.push({
        event: 'view_vendor',
        vendor_id: this.fornecedor.id,
        vendor_name: this.fornecedor.nome,
        vendor_category: this.fornecedor.categoria
      });
    }
  }

  openImage(img: string) {
    this.selectedImage = img;
  }

  closeImage() {
    this.selectedImage = undefined;
  }

  onWhatsAppClick() {
    this.tracking.trackContactClick('whatsapp', {
      vendorId: this.fornecedor?.id || '',
      vendorName: this.fornecedor?.nome || '',
      vendorCategory: this.fornecedor?.categoria
    });
  }

  getSiteLink(): string {
    return this.fornecedor?.website || '#';
  }

  onSiteClick() {
    this.tracking.trackContactClick('website', {
      vendorId: this.fornecedor?.id || '',
      vendorName: this.fornecedor?.nome || '',
      vendorCategory: this.fornecedor?.categoria
    });
  }

  getInstagramLink(): string {
    const instagram = this.fornecedor?.instagram || '';
    const username = instagram.replace('@', '').trim();
    return username ? `https://instagram.com/${username}` : '#';
  }

  onInstagramClick() {
    this.tracking.trackContactClick('instagram', {
      vendorId: this.fornecedor?.id || '',
      vendorName: this.fornecedor?.nome || '',
      vendorCategory: this.fornecedor?.categoria
    });
  }

  getFacebookLink(): string {
    const facebook = this.fornecedor?.facebook || '';
    if (!facebook.trim()) return '#';

    // Se já for uma URL completa, retorna direto
    if (facebook.startsWith('http://') || facebook.startsWith('https://')) {
      return facebook;
    }

    // Caso contrário, adiciona o prefixo
    const cleaned = facebook.replace('@', '').trim();
    return `https://facebook.com/${cleaned}`;
  }

  onFacebookClick() {
    this.tracking.trackContactClick('facebook', {
      vendorId: this.fornecedor?.id || '',
      vendorName: this.fornecedor?.nome || '',
      vendorCategory: this.fornecedor?.categoria
    });
  }

  onPhoneClick() {
    this.tracking.trackContactClick('phone', {
      vendorId: this.fornecedor?.id || '',
      vendorName: this.fornecedor?.nome || '',
      vendorCategory: this.fornecedor?.categoria
    });
  }

  getMapsLink(): string {
    const endereco = this.fornecedor?.endereco || '';
    if (!endereco) return '#';
    const encoded = encodeURIComponent(endereco);
    return `https://www.google.com/maps/search/${encoded}`;
  }

  onMapsClick() {
    this.tracking.trackContactClick('maps', {
      vendorId: this.fornecedor?.id || '',
      vendorName: this.fornecedor?.nome || '',
      vendorCategory: this.fornecedor?.categoria
    });
  }

  /**
   * Aplica lógica de tier ao fornecedor
   * Determina se deve mostrar formulário de lead, anúncios de concorrentes e barra de claim
   */
  private applyTierLogic(fornecedor: Fornecedor): void {
    const planLevel = fornecedor.planLevel;

    // Lead Form Logic
    if (planLevel === PlanLevel.Zombie) {
      // Zombie: Sempre mostrar form (leads vão para admin)
      this.showLeadForm.set(true);
    } else if (planLevel === PlanLevel.Free) {
      // Free: Sempre mostrar form (backend controla bloqueio)
      this.showLeadForm.set(true);
    } else if (planLevel === PlanLevel.Vitrine) {
      // Vitrine: Formulário opcional (tem WhatsApp direto)
      this.showLeadForm.set(!!fornecedor.showContactForm);
    } else {
      // Fallback para backward compatibility
      this.showLeadForm.set(!!fornecedor.showContactForm);
    }

    // Competitor Ads: Apenas para Free tier
    if (planLevel === PlanLevel.Free && fornecedor.adInjection && fornecedor.adInjection.length > 0) {
      this.hasCompetitorAds.set(true);
    }

    // Claim Bar: Apenas para Zombie (não reivindicado)
    if (planLevel === PlanLevel.Zombie && !fornecedor.isClaimed) {
      this.showClaimBar.set(true);
    }
  }

  /**
   * Determinar se deve mostrar botão WhatsApp
   * Se backend enviou whatsAppUrl e é Vitrine, usar esse
   * Caso contrário, gerar localmente (backward compat)
   */
  getWhatsAppLink(): string {
    // Apenas Vitrine tem WhatsApp direto
    if (this.fornecedor?.planLevel !== PlanLevel.Vitrine) {
      return '#';
    }

    // Priorizar URL do backend
    if (this.fornecedor?.whatsAppUrl) {
      return this.fornecedor.whatsAppUrl;
    }

    // Gerar localmente a partir do telefone
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

  /**
   * Abre modal para reivindicar perfil (Zombie tier)
   */
  openClaimModal(): void {
    // TODO: Redirecionar para painel externo quando implementado
    // Por enquanto, apenas log
    console.log('Claim functionality will redirect to external painel:', {
      claimId: this.fornecedor?.id,
      claimSlug: this.fornecedor?.slug
    });
  }

  /**
   * Solicita remoção do perfil (LGPD)
   */
  requestRemoval(): void {
    if (!this.fornecedor) return;

    const confirmed = confirm(
      'Tem certeza que deseja solicitar a remoção deste perfil? ' +
      'Esta ação é irreversível e será processada de acordo com a LGPD.'
    );

    if (confirmed) {
      // TODO: Implementar chamada ao backend para LGPD removal
      console.log('LGPD removal requested for:', this.fornecedor.id);
      alert('Solicitação de remoção enviada. Você receberá um email de confirmação.');
    }
  }

}
