import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FornecedoresData, FornecedorListDto } from '../../fornecedores/services/fornecedores-data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CidadeService } from '../../../core/cidade.service';
import { environment } from '../../../../environments/environment';

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
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DestaquesSemanaComponent implements OnInit {
  @Input() category?: string | undefined;
  @Input() exclude: string[] = [];
  @Input() limit = 4;
  @Output() displayed = new EventEmitter<string[]>();

  destaques$!: Observable<DestaqueView[]>;

  private cidadeService = inject(CidadeService);

  constructor(private fornecedoresData: FornecedoresData) {}

  ngOnInit(): void {
    this.destaques$ = this.fornecedoresData.getDestaques(1, this.limit * 3).pipe(
      map(list => {
        if (!list || !Array.isArray(list)) {
          console.warn('[DESTAQUES] API returned invalid data:', list);
          return [];
        }
        const filtered = list
          .filter(f => !this.category || (f.categoria?.nome || '').toLowerCase() === this.category!.toLowerCase())
          .filter(f => !this.exclude?.length || !this.exclude.includes(f.id));
        
        // Randomize order to show different highlights on each page load
        const shuffled = filtered.sort(() => Math.random() - 0.5);
        
        const result = shuffled
          .slice(0, this.limit)
          .map(f => ({
            id: f.id,
            slug: f.slug,
            categoria: f.categoria?.nome,
            nome: f.nome,
            local: f.cidade,
            descricao: undefined,
            nota: f.rating || 0,
            imagem: this.resolveImage(f.primaryImage?.url, 'assets/fornecedores/placeholder.jpg')
          }));
        if (!result.length) {
          console.warn('[DESTAQUES] nenhum resultado após filtragem.');
        }
        this.displayed.emit(result.map(x => x.id));
        return result;
      })
    );
  }

  buildUrl(path: string | string[]): string {
    if (Array.isArray(path)) {
      const [base, ...rest] = path;
      const fullPath = rest.length ? `${base}/${rest.join('/')}` : base;
      return this.cidadeService.buildUrl(fullPath);
    }
    return this.cidadeService.buildUrl(path);
  }

  private resolveImage(url?: string | null, fallback: string = 'assets/fornecedores/placeholder.jpg'): string {
    if (!url) return fallback;
    if (url.startsWith('http')) return url;
    const base = environment.API_BASE_URL?.replace(/\/$/, '') || '';
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${base}${path}`;
  }
}
