import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FornecedoresData, FornecedorListDto } from '../../features/fornecedores/services/fornecedores-data';
import { CategoriasData } from './services/categorias-data';
import { Observable, switchMap, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-categoria-detalhe-page',
  standalone: true,
  templateUrl: './categoria-detalhe-page.html',
  styleUrls: ['./categoria-detalhe-page.css'],
  imports: [CommonModule, RouterModule, FormsModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriaDetalhePageComponent {
  categoriaId$: Observable<string>;
  categoriaNome$: Observable<string>;
  fornecedores$: Observable<FornecedorListDto[]>;
  destaquesCategoria$: Observable<FornecedorListDto[]>;
  sortOrder$ = new BehaviorSubject<string>('relevante');
  sortedFornecedores$: Observable<FornecedorListDto[]>;

  constructor(
    private route: ActivatedRoute,
    private fornecedores: FornecedoresData,
    private categorias: CategoriasData
  ) {
    this.categoriaId$ = this.route.paramMap.pipe(
      map((params: any) => params.get('id') || '')
    );
    this.fornecedores$ = this.categoriaId$.pipe(
      switchMap((id: string) => this.fornecedores.getByCategoria(id))
    );
    this.categoriaNome$ = this.categoriaId$.pipe(
      switchMap((slug: string) => this.categorias.getBySlug(slug)),
      map(categoria => categoria?.nome || '')
    );
    this.destaquesCategoria$ = this.fornecedores$.pipe(
      map(list => (list || []).filter(f => f.destaque))
    );
    this.sortedFornecedores$ = combineLatest([this.fornecedores$, this.sortOrder$]).pipe(
      map(([list, order]) => this.sortFornecedores(list, order))
    );
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.sortOrder$.next(value);
  }

  private sortFornecedores(list: FornecedorListDto[], order: string): FornecedorListDto[] {
    const sorted = [...list];
    switch (order) {
      case 'relevante':
        return sorted.sort((a, b) => (b.destaque ? 1 : 0) - (a.destaque ? 1 : 0));
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'nome':
        return sorted.sort((a, b) => a.nome.localeCompare(b.nome));
      default:
        return sorted;
    }
  }

  getSpecialties(fornecedor: FornecedorListDto): string[] {
    // Mock - ajustar quando backend fornecer tags/especialidades
    const specialties = ['DOCUMENTAL', 'ARTÍSTICO', 'DRONE'];
    return specialties.slice(0, 3);
  }
}
