import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriasData, Categoria } from './services/categorias-data';
import { Observable } from 'rxjs';
import { FornecedoresData, FornecedorListDto } from '../fornecedores/services/fornecedores-data';
import { forkJoin, map, switchMap } from 'rxjs';
import { CidadeService } from '../../core/cidade.service';

@Component({
  selector: 'app-categorias-page',
  standalone: true,
  templateUrl: './categorias-page.html',
  styleUrls: ['./categorias-page.css'],
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriasPageComponent {
  categoriasComFornecedores$!: Observable<Array<{ categoria: Categoria; fornecedores: FornecedorListDto[] }>>;

  private cidadeService = inject(CidadeService);

  constructor(
    private categoriasData: CategoriasData,
    private fornecedoresData: FornecedoresData
  ) {
    this.categoriasComFornecedores$ = this.categoriasData.getAll().pipe(
      map(cats => this.shuffleArray(cats)),
      switchMap(cats => forkJoin(
        cats.map(cat =>
          this.fornecedoresData.getDestaquesByCategoria(cat.slug).pipe(
            map(destaques => ({
              categoria: cat,
              fornecedores: this.shuffleArray(destaques).slice(0, 6)
            }))
          )
        )
      ))
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

  private shuffleArray<T>(array: T[]): T[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }
}
