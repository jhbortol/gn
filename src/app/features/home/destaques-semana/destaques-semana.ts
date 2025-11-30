import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FornecedoresData, FornecedorListDto } from '../../fornecedores/services/fornecedores-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DestaqueView {
  id: string;
  slug: string;
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
  destaques$!: Observable<DestaqueView[]>;

  constructor(private fornecedoresData: FornecedoresData) {}

  ngOnInit(): void {
    this.destaques$ = this.fornecedoresData.getDestaques(1, this.limit * 3).pipe(
      map(list => {
        if (!list || !Array.isArray(list)) {
          console.warn('[DESTAQUES] API returned invalid data:', list);
          return [];
        }
        return list
          .filter(f => !this.category || (f.categoria?.nome || '').toLowerCase() === this.category!.toLowerCase())
          .filter(f => !this.exclude?.length || !this.exclude.includes(f.id))
          .sort((a, b) => (b.rating || 0) - (a.rating || 0))
          .slice(0, this.limit)
          .map(f => ({
            id: f.id,
            slug: f.slug,
            categoria: f.categoria?.nome,
            nome: f.nome,
            local: f.cidade,
            descricao: undefined,
            nota: f.rating || 0,
            imagem: f.primaryImage?.url || 'assets/fornecedores/placeholder.jpg'
          }));
      })
    );
    this.destaques$.subscribe(d => {
      this.destaques = d;
      this.displayed.emit(d.map(x => x.id));
    });
  }
}
