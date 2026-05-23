import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CIDADES_DISPONIVEIS } from '../../core/cidades.config';

@Component({
  selector: 'app-cidade-selector-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cidade-selector-page.html',
  styleUrls: ['./cidade-selector-page.css']
})
export class CidadeSelectorPageComponent {
  cidades = CIDADES_DISPONIVEIS;
}
