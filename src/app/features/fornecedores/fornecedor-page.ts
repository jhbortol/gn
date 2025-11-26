import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FornecedoresData, Fornecedor } from './services/fornecedores-data';
import { Observable } from 'rxjs';

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

  constructor(private route: ActivatedRoute, private fornecedores: FornecedoresData) {}

  ngOnInit(): void {
    const identifier = this.route.snapshot.params['id']; // pode ser GUID ou slug
    if (identifier) {
      this.fornecedores.getById(identifier).subscribe(f => {
        this.fornecedor = f;
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
    return digits ? `https://wa.me/${digits}` : '#';
  }

  getSiteLink(): string {
    return this.fornecedor?.website || '#';
  }
}
