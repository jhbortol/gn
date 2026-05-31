import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CidadeService } from '../../core/cidade.service';
import { CidadeConfig } from '../../core/cidades.config';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cidade-selector-page',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cidade-selector-page.html',
  styleUrls: ['./cidade-selector-page.css']
})
export class CidadeSelectorPageComponent implements OnInit {
  private cidadeService = inject(CidadeService);
  private router = inject(Router);
  cidades$!: Observable<CidadeConfig[]>;

  ngOnInit(): void {
    // Log para debugging
    console.log('CidadeSelectorPageComponent iniciado');
    console.log('URL atual:', this.router.url);
    
    this.cidades$ = this.cidadeService.carregarCidadesDisponiveis().pipe(
      tap(cidades => {
        console.log('Cidades carregadas:', cidades);
      })
    );
  }
}
