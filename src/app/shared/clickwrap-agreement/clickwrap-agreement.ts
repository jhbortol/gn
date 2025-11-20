import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clickwrap-agreement',
  standalone: true,
  templateUrl: './clickwrap-agreement.html',
  styleUrl: './clickwrap-agreement.css',
  imports: [CommonModule]
})
export class ClickwrapAgreementComponent {
  isVisible = false;

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.isVisible = !window.localStorage.getItem('clickwrapAccepted');
    } else {
      this.isVisible = true;
    }
  }

  accept() {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('clickwrapAccepted', 'true');
    }
    this.isVisible = false;
  }
}
