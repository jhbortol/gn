import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoriasData, Categoria } from './services/categorias-data';

@Component({
  selector: 'app-categorias-page',
  standalone: true,
  templateUrl: './categorias-page.html',
  styleUrls: ['./categorias-page.css'],
  imports: [CommonModule, RouterModule]
})
export class CategoriasPageComponent {
  categorias: Categoria[] = [];

  constructor(private categoriasData: CategoriasData) {
    this.categorias = this.categoriasData.getAll();
  }
}
