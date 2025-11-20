import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contato-page',
  standalone: true,
  templateUrl: './contato-page.html',
  styleUrls: ['./contato-page.css'],
  imports: [CommonModule]
})
export class ContatoPageComponent {
  submitted = false;
  error = false;

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
