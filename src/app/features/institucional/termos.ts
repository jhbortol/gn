import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MetaTagService } from '../../core/meta-tag.service';
import { CidadeService } from '../../core/cidade.service';
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
  private cidadeService = inject(CidadeService);

  get cidadeNome(): string {
    const c = this.cidadeService.getCidade();
    return c.charAt(0).toUpperCase() + c.slice(1);
  }

  ngOnInit(): void {
    const route = this.router.url.split('?')[0];
    const cidade = this.cidadeService.getCidade();
    const nomeFormatado = cidade.charAt(0).toUpperCase() + cidade.slice(1);
    this.title.setTitle(`Termos de Uso e Política de Privacidade e Dados | Guia Noivas ${nomeFormatado}`);
    this.metaTagService.applyMetadata(route, {
      title: `Termos de Uso e Política de Privacidade e Dados | Guia Noivas ${nomeFormatado}`,
      description: `Termos de uso e política de privacidade e dados do Guia Noivas ${nomeFormatado}. Saiba como nossa plataforma funciona e quais são seus direitos e deveres.`
    });
  }
}
