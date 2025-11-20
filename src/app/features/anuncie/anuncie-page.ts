import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anuncie-page',
  standalone: true,
  templateUrl: './anuncie-page.html',
  styleUrls: ['./anuncie-page.css'],
  imports: [CommonModule]
})
export class AnunciePageComponent {
  submitted = false;
  error = false;

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
