import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MetaTagService } from '../../core/meta-tag.service';
import { CidadeService } from '../../core/cidade.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-guia-custos-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './guia-custos-page.html',
  styleUrls: ['./guia-custos-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuiaCustosPage implements OnInit {
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
    this.title.setTitle(`Guia de Custos de Casamento em ${nomeFormatado} 2026 | Guia Noivas`);
    this.metaTagService.applyMetadata(route, {
      title: `Guia de Custos de Casamento em ${nomeFormatado} 2026 | Guia Noivas`,
      description: `Descubra quanto custa um casamento em ${nomeFormatado} em 2026. Comparativo completo de perfis econômico, clássico e luxo com estimativas reais de buffet, decoração, fotografia e mais.`,
      robots: 'noindex, follow'
    });
  }
}
