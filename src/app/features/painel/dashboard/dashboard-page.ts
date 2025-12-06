import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SupplierService, FornecedorStatsDto } from '../services/supplier.service';
import { PainelLayoutComponent } from '../layout/painel-layout';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterModule, PainelLayoutComponent],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css']
})
export class DashboardPageComponent implements OnInit {
  stats: FornecedorStatsDto | null = null;
  loading = true;
  error = '';

  constructor(private supplierService: SupplierService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.supplierService.getStats().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar estatísticas';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
