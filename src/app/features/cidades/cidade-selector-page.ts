import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CidadeService } from '../../core/cidade.service';

@Component({
  selector: 'app-cidade-selector-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cidade-selector-page.html',
  styleUrls: ['./cidade-selector-page.css']
})
export class CidadeSelectorPageComponent {
  private cidadeService = inject(CidadeService);
  cidades$ = this.cidadeService.carregarCidadesDisponiveis();
}
