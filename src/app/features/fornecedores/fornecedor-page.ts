import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FornecedoresData, Fornecedor } from './services/fornecedores-data';

@Component({
  selector: 'app-fornecedor-page',
  standalone: true,
  templateUrl: './fornecedor-page.html',
  styleUrls: ['./fornecedor-page.css'],
  imports: [CommonModule, RouterModule]
})
export class FornecedorPageComponent implements OnInit {
  fornecedor?: Fornecedor;
  selectedImage?: string;

  constructor(private route: ActivatedRoute, private db: FornecedoresData) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.fornecedor = this.db.getById(id);
    }
  }

  openImage(img: string) {
    this.selectedImage = img;
  }

  closeImage() {
    this.selectedImage = undefined;
  }

  getWhatsAppLink(): string {
    const w = this.fornecedor?.whatsapp || '';
    const digits = w.replace(/\D/g, '');
    return digits ? `https://wa.me/${digits}` : '#';
  }

  getInstagramLink(): string {
    const ig = this.fornecedor?.instagram || '';
    return ig ? `https://instagram.com/${ig}` : '#';
  }

  getSiteLink(): string {
    return this.fornecedor?.site || '#';
  }
}
