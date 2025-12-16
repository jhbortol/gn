import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FornecedoresData, Fornecedor } from './services/fornecedores-data';
import { Observable } from 'rxjs';

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

  constructor(private route: ActivatedRoute, private fornecedores: FornecedoresData, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const identifier = this.route.snapshot.params['id']; // pode ser GUID ou slug
    if (identifier) {
      this.fornecedores.getById(identifier).subscribe(f => {
        this.fornecedor = f;
        this.trackPageView();
        // For OnPush change detection, ensure view updates after async data arrives
        this.cdr.markForCheck();
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

  getSiteLink(): string {
    return this.fornecedor?.website || '#';
  }

  getInstagramLink(): string {
    const instagram = this.fornecedor?.instagram || '';
    const username = instagram.replace('@', '').trim();
    return username ? `https://instagram.com/${username}` : '#';
  }

  getFacebookLink(): string {
    const facebook = this.fornecedor?.facebook || '';
    const cleaned = facebook.replace('@', '').trim();
    return cleaned ? `https://facebook.com/${cleaned}` : '#';
  }

  getMapsLink(): string {
    const endereco = this.fornecedor?.endereco || '';
    if (!endereco.trim()) return '#';
    const encoded = encodeURIComponent(endereco);
    return `https://www.google.com/maps/search/${encoded}`;
  }
}
