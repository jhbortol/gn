import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Meta, Title } from '@angular/platform-browser';
import { ClickwrapAgreementComponent } from '../../shared/clickwrap-agreement/clickwrap-agreement';
import { FornecedoresData, Fornecedor } from './services/fornecedores-data';
import { TrackingService } from '../../core/tracking.service';
import { MetaTagService } from '../../core/meta-tag.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LeadFormComponent } from './lead-form.component';
import { CompetitorAdsComponent } from './competitor-ads.component';
import { PlanLevel } from '../../core/models/tier-system.model';
import { ClaimModalComponent } from './claim-modal/claim-modal.component';

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
    CompetitorAdsComponent,
    ClaimModalComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FornecedorPageComponent implements OnInit {
  fornecedor?: Fornecedor;
  selectedImage?: string;
  selectedImageIndex = 0;
  isPreviewMode = false;
  notFound = false;

  // Novos signals para tier logic
  showLeadForm = signal(false);
  hasCompetitorAds = signal(false);
  showClaimBar = signal(false);
  isClaimModalOpen = signal(false);

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
    private tracking: TrackingService,
    private title: Title,
    private meta: Meta,
    private metaTagService: MetaTagService
  ) { }

  ngOnInit(): void {
    const identifier = this.route.snapshot.params['id']; // pode ser GUID ou slug
    this.isPreviewMode = this.route.snapshot.queryParams['preview'] === 'true';

    // Try to apply prerendered metadata first
    const currentRoute = this.router.routerState.root.firstChild?.component ? 
      `${this.router.url.split('?')[0]}` : null;
    if (currentRoute) {
      this.metaTagService.applyMetadata(currentRoute);
    }

    if (identifier) {
      this.fornecedores.getById(identifier, this.isPreviewMode).subscribe({
        next: (f) => {
          // Validate publicado field if environment requires it
          // Only enforce if FORNECEDOR_PUBLICADO is true (production) and not in preview mode
          if (environment.FORNECEDOR_PUBLICADO === true && !this.isPreviewMode && !f.publicado) {
            console.warn('Fornecedor não publicado acessado diretamente:', f.id);
            this.notFound = true;
            this.updateNotFoundMetaTags();
            this.cdr.markForCheck();
            return;
          }

          this.fornecedor = f;

          // 🔴 NOVO: Aplicar lógica tier
          this.applyTierLogic(f);

          // 🔴 NOVO: Atualizar meta tags SEO
          this.updateSeoMetaTags(f);

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
          this.updateNotFoundMetaTags();
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

  /**
   * Retorna imagens da galeria limitadas por tier
   * Free: 2 imagens, Vitrine: 20 imagens
   */
  getGalleryImages() {
    if (!this.fornecedor?.imagens) return [];

    const limit = this.fornecedor.planLevel === PlanLevel.Free ? 2 : 20;
    return this.fornecedor.imagens.slice(0, limit);
  }

  openImage(img: string) {
    this.selectedImage = img;
    // Find index of the image in the gallery
    const images = this.getGalleryImages();
    this.selectedImageIndex = images.findIndex(i => i.url === img);
    if (this.selectedImageIndex < 0) this.selectedImageIndex = 0;
  }

  closeImage() {
    this.selectedImage = undefined;
    this.selectedImageIndex = 0;
  }

  prevImage() {
    const images = this.getGalleryImages();
    if (images.length <= 1) return;
    this.selectedImageIndex = (this.selectedImageIndex - 1 + images.length) % images.length;
    this.selectedImage = images[this.selectedImageIndex].url;
  }

  nextImage() {
    const images = this.getGalleryImages();
    if (images.length <= 1) return;
    this.selectedImageIndex = (this.selectedImageIndex + 1) % images.length;
    this.selectedImage = images[this.selectedImageIndex].url;
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

    // Claim Bar: Mostrar se o perifl ainda NÃO foi reivindicado, independente do tier atual
    // (Ex: Perfil criado pelo admin como Free/Low mas ainda sem dono)
    if (!fornecedor.isClaimed) {
      this.showClaimBar.set(true);
    }
  }

  /**
   * Atualiza meta tags dinâmicas para SEO
   */
  private updateSeoMetaTags(fornecedor: Fornecedor): void {
    // Título da página: "Nome - Categoria em Cidade"
    const pageTitle = `${fornecedor.nome} - ${fornecedor.categoria || 'Fornecedor'} em ${fornecedor.cidade || 'São Paulo'}`;
    this.title.setTitle(pageTitle);

    // Meta description: primeiros 155 caracteres da bio/descrição
    const description = (fornecedor.descricao || fornecedor.nome || '').substring(0, 155);
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph image para compartilhamento social
    const ogImage = fornecedor.coverPictureUrl || fornecedor.primaryImage?.url || fornecedor.imagens?.[0]?.url || '';
    if (ogImage) {
      this.meta.updateTag({ property: 'og:image', content: ogImage });
      this.meta.updateTag({ property: 'og:image:alt', content: `${fornecedor.nome} - Foto de capa` });
    }

    // Open Graph adicionais
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'business.business' });
  }

  private updateNotFoundMetaTags(): void {
    const pageTitle = 'Fornecedor não encontrado - Guia Noivas Piracicaba';
    this.title.setTitle(pageTitle);

    const description = 'O perfil que você está procurando não está disponível ou ainda não foi publicado no Guia Noivas Piracicaba.';
    this.meta.updateTag({ name: 'description', content: description });

    // Open Graph para página 404
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
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

    const message = 'Te achei no Guia Noivas Piracicaba, e quero mais informações';
    const encodedMessage = encodeURIComponent(message);

    // Priorizar URL do backend, mas garantir a mensagem se for link do WhatsApp
    if (this.fornecedor?.whatsAppUrl) {
      let url = this.fornecedor.whatsAppUrl;
      // Se for link do WhatsApp e não tiver o parâmetro text, adicionamos
      if ((url.includes('wa.me') || url.includes('whatsapp.com/send')) && !url.includes('text=')) {
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}text=${encodedMessage}`;
      }
      return url;
    }

    // Gerar localmente a partir do telefone
    const w = this.fornecedor?.telefone || '';
    const digits = w.replace(/\D/g, '');
    return digits ? `https://wa.me/${digits}?text=${encodedMessage}` : '#';
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
    this.isClaimModalOpen.set(true);
  }

  /**
   * Callback quando claim é realizado com sucesso
   */
  closeClaimModal(): void {
    this.isClaimModalOpen.set(false);
  }

  /**
   * Callback quando claim é realizado com sucesso
   * Redireciona para o painel do fornecedor
   */
  onClaimSuccess(): void {
    // Fecha modal
    this.isClaimModalOpen.set(false);

    // Mostra toast de sucesso se tivesse um service para isso
    // alert('Perfil reivindicado com sucesso! Redirecionando...');

    // Redireciona
    setTimeout(() => {
      window.location.href = '/supplier-panel';
    }, 1500);
  }

  /**
   * Solicita remoção do perfil (LGPD)
   * Redireciona para página dedicada de remoção
   */
  requestRemoval(): void {
    if (!this.fornecedor) return;

    // A rota é relativa à cidade (ex: /piracicaba/privacy/request-removal)
    // Com a estrutura /:cidade/fornecedores/:id, precisamos subir dois níveis
    this.router.navigate(['../../privacy/request-removal'], {
      relativeTo: this.route,
      queryParams: { fornecedorId: this.fornecedor.id }
    });
  }

}
