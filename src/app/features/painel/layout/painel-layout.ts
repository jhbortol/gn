import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { SupplierAuthService } from '../services/supplier-auth.service';
import { ToastContainerComponent } from '../../../shared/components/toast-container.component';

@Component({
  selector: 'app-painel-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ToastContainerComponent],
  templateUrl: './painel-layout.html',
  styleUrls: ['./painel-layout.css']
})
export class PainelLayoutComponent implements OnInit {
  userName = '';
  sidebarOpen = true;

  menuItems = [
    { path: '/painel/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/painel/perfil', icon: '👤', label: 'Meu Perfil' },
    { path: '/painel/imagens', icon: '🖼️', label: 'Imagens' },
    { path: '/painel/testemunhos', icon: '💬', label: 'Testemunhos' },
    { path: '/painel/alterar-senha', icon: '🔒', label: 'Alterar Senha' }
  ];

  constructor(
    private authService: SupplierAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.userName = user?.displayName || user?.email || 'Fornecedor';
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  logout(): void {
    if (confirm('Deseja realmente sair?')) {
      this.authService.logout();
    }
  }

  viewSite(): void {
    window.open('/', '_blank');
  }
}
