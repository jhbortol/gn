import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-midia-kit-page',
  standalone: true,
  template: ''
})
export class MidiaKitPage implements OnInit {
  private router = inject(Router);

  ngOnInit() {
    // Redirect directly to the static midia-kit page
    window.location.href = '/midia-kit.html';
  }
}

