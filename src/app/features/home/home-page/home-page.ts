import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../../shared/icon/icon';
import { DestaquesSemanaComponent } from '../destaques-semana/destaques-semana';
import { RouterModule } from '@angular/router';

const CATEGORIES = [
  { id: 'fotografia', name: 'Fotografia', iconName: 'camera', image: 'assets/categorias/fotografia.jpg' },
  { id: 'buffet', name: 'Buffet', iconName: 'utensils', image: 'assets/categorias/buffet.jpg' },
  { id: 'decoracao', name: 'Decoração', iconName: 'flower', image: 'assets/categorias/decoracao.jpg' },
  { id: 'musica', name: 'Música', iconName: 'music', image: 'assets/categorias/musica.jpg' },
  { id: 'espacos', name: 'Espaços', iconName: 'home', image: 'assets/categorias/espacos.jpg' },
  { id: 'vestidos', name: 'Vestido de Noiva', iconName: 'shirt', image: 'assets/categorias/vestidos.jpg' }
];

@Component({
  selector: 'app-home-page',
  standalone: true,
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  imports: [CommonModule, IconComponent, DestaquesSemanaComponent, RouterModule]
})
export class HomePageComponent {
  categories = CATEGORIES;
}
