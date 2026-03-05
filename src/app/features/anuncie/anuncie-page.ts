import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MetaTagService } from '../../core/meta-tag.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-anuncie-page',
  standalone: true,
  templateUrl: './anuncie-page.html',
  styleUrls: ['./anuncie-page.css'],
  imports: [CommonModule]
})
export class AnunciePageComponent implements OnInit {
  submitted = false;
  error = false;

  private metaTagService = inject(MetaTagService);
  private router = inject(Router);
  private title = inject(Title);

  ngOnInit(): void {
    const route = this.router.url.split('?')[0];
    this.title.setTitle('Anuncie no Guia Noivas Piracicaba | Divulgue seu Negócio');
    this.metaTagService.applyMetadata(route, {
      title: 'Anuncie no Guia Noivas Piracicaba | Divulgue seu Negócio',
      description: 'Anuncie seu negócio para noivas de Piracicaba e região. Alcance noivas em busca de fornecedores de casamento. Cadastre sua empresa no Guia Noivas Piracicaba.'
    });
  }

  /**
   * Permite apenas números para telefone
   */
  onlyNumbers(event: KeyboardEvent): void {
    const char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    fetch('https://formspree.io/f/xovnglda', {
      method: 'POST',
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          this.submitted = true;
          this.error = false;
          form.reset();
        } else {
          this.submitted = false;
          this.error = true;
        }
      })
      .catch(() => {
        this.submitted = false;
        this.error = true;
      });
  }
}
