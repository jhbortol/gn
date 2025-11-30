


import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icon/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  imports: [CommonModule, IconComponent, RouterModule]
})
export class NavbarComponent {
  @Output() goHome = new EventEmitter<void>();
  @Output() navigateTo = new EventEmitter<string>();
  @Output() scrollToCategories = new EventEmitter<void>();
  
  mobileMenuOpen = false;

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu() {
    this.mobileMenuOpen = false;
  }
}
