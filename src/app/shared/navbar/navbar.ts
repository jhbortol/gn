


import { Component, Output, EventEmitter } from '@angular/core';
import { IconComponent } from '../icon/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  imports: [IconComponent, RouterModule]
})
export class NavbarComponent {
  @Output() goHome = new EventEmitter<void>();
  @Output() navigateTo = new EventEmitter<string>();
  @Output() scrollToCategories = new EventEmitter<void>();
}
