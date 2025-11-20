import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FornecedoresData, Fornecedor } from '../../features/fornecedores/services/fornecedores-data';

@Component({
  selector: 'app-categoria-detalhe-page',
  standalone: true,
  templateUrl: './categoria-detalhe-page.html',
  styleUrls: ['./categoria-detalhe-page.css'],
  imports: [CommonModule, RouterModule]
})
export class CategoriaDetalhePageComponent {
  categoriaId = '';
  fornecedores: Fornecedor[] = [];

  constructor(private route: ActivatedRoute, private db: FornecedoresData) {
    this.route.paramMap.subscribe(params => {
      this.categoriaId = params.get('id') || '';
      this.fornecedores = this.db.getByCategoria(this.categoriaId);
    });
  }
}
