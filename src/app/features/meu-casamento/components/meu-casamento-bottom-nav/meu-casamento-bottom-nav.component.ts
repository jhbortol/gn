import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-meu-casamento-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './meu-casamento-bottom-nav.component.html',
  styleUrl: './meu-casamento-bottom-nav.component.css'
})
export class MeuCasamentoBottomNavComponent {
  isCollapsed = false;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
