import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MetaTagService } from '../../core/meta-tag.service';
import { CidadeService } from '../../core/cidade.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sobre-nos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sobre-nos.html',
  styleUrls: ['./sobre-nos.css']
})
export class SobreNosPageComponent implements OnInit {
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
    this.title.setTitle(`Sobre o Guia Noivas ${nomeFormatado} | Nossa História`);
    this.metaTagService.applyMetadata(route, {
      title: `Sobre o Guia Noivas ${nomeFormatado} | Nossa História`,
      description: `Conheça o Guia Noivas ${nomeFormatado}: o catálogo regional especializado em casamentos que conecta noivas aos melhores fornecedores de ${nomeFormatado} e região.`
    });
  }

  buildUrl(path: string): string {
    return this.cidadeService.buildUrl(path);
  }
}
