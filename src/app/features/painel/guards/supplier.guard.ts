import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SupplierAuthService } from '../services/supplier-auth.service';

@Injectable({ providedIn: 'root' })
export class SupplierGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: SupplierAuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    // Redirecionar para login, preservando URL de destino
    this.router.navigate(['/painel/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
