import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CidadeService } from '../../core/cidade.service';

@Component({
  selector: 'app-clickwrap-agreement',
  standalone: true,
  templateUrl: './clickwrap-agreement.html',
  styleUrls: ['./clickwrap-agreement.css'],
  imports: [CommonModule]
})
export class ClickwrapAgreementComponent {
  isVisible = false;
  private cidadeService = inject(CidadeService);

  get cidadeNome(): string {
    const c = this.cidadeService.getCidade();
    return c.charAt(0).toUpperCase() + c.slice(1);
  }

  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const acceptedDate = window.localStorage.getItem('clickwrapAcceptedDate');
      const today = new Date().toDateString();
      
      // Show if never accepted or if last acceptance was on a different day
      this.isVisible = !acceptedDate || acceptedDate !== today;
    } else {
      this.isVisible = true;
    }
  }

  accept() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const today = new Date().toDateString();
      window.localStorage.setItem('clickwrapAcceptedDate', today);
    }
    this.isVisible = false;
  }
}
