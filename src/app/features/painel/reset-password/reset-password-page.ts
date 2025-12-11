import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './reset-password-page.html',
  styleUrls: ['./reset-password-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordPage implements OnInit {
  resetForm: FormGroup;
  token = signal<string | null>(null);
  isSubmitting = signal(false);
  error = signal<string | null>(null);
  showPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private supplierService: SupplierService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    
    if (!token) {
      this.error.set('Token de recuperação não encontrado. Solicite um novo link de recuperação.');
    } else {
      this.token.set(token);
    }
  }

  onSubmit(): void {
    if (this.resetForm.invalid || !this.token()) {
      this.resetForm.markAllAsTouched();
      return;
    }

    const newPassword = this.resetForm.get('newPassword')?.value;
    const confirmPassword = this.resetForm.get('confirmPassword')?.value;

    // Validar senhas iguais
    if (newPassword !== confirmPassword) {
      this.error.set('As senhas não coincidem.');
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);

    this.supplierService.resetPassword(this.token()!, newPassword).subscribe({
      next: () => {
        alert('Senha redefinida com sucesso! Faça login com sua nova senha.');
        this.router.navigate(['/painel/login']);
      },
      error: (err: any) => {
        const message = err.error?.message || 'Erro ao redefinir senha. O token pode ter expirado.';
        this.error.set(message);
        this.isSubmitting.set(false);
        console.error('Erro ao redefinir senha:', err);
      }
    });
  }

  togglePasswordVisibility(field: 'password' | 'confirm'): void {
    if (field === 'password') {
      this.showPassword.set(!this.showPassword());
    } else {
      this.showConfirmPassword.set(!this.showConfirmPassword());
    }
  }

  getPasswordStrength(): string {
    const password = this.resetForm.get('newPassword')?.value || '';
    
    if (password.length === 0) return '';
    if (password.length < 6) return 'fraca';
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength === 0) return 'fraca';
    if (strength <= 2) return 'média';
    return 'forte';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.resetForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.resetForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Campo obrigatório';
    if (field.errors['minlength']) return 'Mínimo 6 caracteres';

    return '';
  }
}
