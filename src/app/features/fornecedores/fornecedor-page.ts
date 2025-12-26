import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FornecedoresData, Fornecedor } from './services/fornecedores-data';
import { TrackingService } from '../../core/tracking.service';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-fornecedor-page',
  standalone: true,
  templateUrl: './fornecedor-page.html',
  styleUrls: ['./fornecedor-page.css'],
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FornecedorPageComponent implements OnInit {
  fornecedor?: Fornecedor;
  selectedImage?: string;
  isPreviewMode = false;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fornecedores: FornecedoresData,
    private cdr: ChangeDetectorRef,
    private tracking: TrackingService
  ) {}

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

  getWhatsAppLink(): string {
    const w = this.fornecedor?.telefone || '';
    const digits = w.replace(/\D/g, '');
    const message = encodeURIComponent('Olá, Te encontrei no Guia Noivas Piracicaba, preciso de mais informações.');
    return digits ? `https://wa.me/${digits}?text=${message}` : '#';
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
}
