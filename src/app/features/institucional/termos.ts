import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MetaTagService } from '../../core/meta-tag.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-termos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './termos.html',
  styleUrls: ['./termos.css']
})
export class TermosPageComponent implements OnInit {
  private metaTagService = inject(MetaTagService);
  private router = inject(Router);
  private title = inject(Title);

  ngOnInit(): void {
    const route = this.router.url.split('?')[0];
    this.title.setTitle('Termos de Uso | Guia Noivas Piracicaba');
    this.metaTagService.applyMetadata(route, {
      title: 'Termos de Uso | Guia Noivas Piracicaba',
      description: 'Termos de uso e política de responsabilidade do Guia Noivas Piracicaba. Saiba como nossa plataforma funciona e quais são seus direitos e deveres.'
    });
  }
}
