import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MetaTagService } from '../../core/meta-tag.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-contato-page',
  standalone: true,
  templateUrl: './contato-page.html',
  styleUrls: ['./contato-page.css'],
  imports: [CommonModule]
})
export class ContatoPageComponent implements OnInit {
  submitted = false;
  error = false;

  private metaTagService = inject(MetaTagService);
  private router = inject(Router);
  private title = inject(Title);

  ngOnInit(): void {
    const route = this.router.url.split('?')[0];
    this.title.setTitle('Contato | Guia Noivas Piracicaba');
    this.metaTagService.applyMetadata(route, {
      title: 'Contato | Guia Noivas Piracicaba',
      description: 'Entre em contato com o Guia Noivas Piracicaba. Estamos aqui para ajudar você a encontrar os melhores fornecedores para o seu casamento em Piracicaba e região.'
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);
    fetch('https://formspree.io/f/myzdrpea', {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' }
    })
      .then(res => {
        if (res.ok) {
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
