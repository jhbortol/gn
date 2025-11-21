import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FornecedoresData, Fornecedor } from '../../fornecedores/services/fornecedores-data';

export interface DestaqueView {
  id: string;
  categoria?: string;
  nome?: string;
  local?: string;
  descricao?: string;
  nota?: number;
  imagem?: string;
}

@Component({
  selector: 'app-destaques-semana',
  standalone: true,
  templateUrl: './destaques-semana.html',
  styleUrls: ['./destaques-semana.css'],
  imports: [CommonModule, RouterModule]
})
export class DestaquesSemanaComponent implements OnInit {
  @Input() category?: string | undefined;
  @Input() exclude: string[] = [];
  @Input() limit = 4;
  @Output() displayed = new EventEmitter<string[]>();

  destaques: DestaqueView[] = [];

  constructor(private fornecedoresData: FornecedoresData) {}

  ngOnInit(): void {
    let all = this.fornecedoresData.getAll()
      .filter(f => f.imagens && f.imagens.length > 0 && f.destaque === true);

    // Filtra por categoria, se informado
    if (this.category) {
      const catLower = this.category.toLowerCase();
      all = all.filter(f => (f.categoria || '').toLowerCase() === catLower);
    }

    // Remove fornecedores que estão na lista de exclusão
    if (this.exclude && this.exclude.length) {
      const excl = new Set(this.exclude);
      all = all.filter(f => !excl.has(f.id));
    }

    // Ordena por rating (maior primeiro) e pega os `limit` primeiros
    const top = all.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, this.limit);

    this.destaques = top.map(f => ({
      id: f.id,
      categoria: f.categoria,
      nome: f.nome,
      local: [f.cidade, f.estado].filter(Boolean).join(', '),
      descricao: f.sobre,
      nota: f.rating,
      imagem: (f.imagens && f.imagens.length) ? f.imagens[0] : undefined
    }));

    // Emite IDs exibidos para que o pai possa evitar repetições
    this.displayed.emit(this.destaques.map(d => d.id));
  }
}
