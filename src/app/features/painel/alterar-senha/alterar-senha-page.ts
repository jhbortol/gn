import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupplierService } from '../services/supplier.service';

/** Validador personalizado para comparar senhas */
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const newPassword = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (!newPassword || !confirmPassword) {
    return null;
  }

  // Se o campo de confirmação estiver vazio, não valida ainda (já tem o required)
  if (!confirmPassword.value) {
    return null;
  }

  return newPassword.value === confirmPassword.value ? null : { passwordMismatch: true };
};

@Component({
  selector: 'app-alterar-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './alterar-senha-page.html',
  styleUrls: ['./alterar-senha-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlterarSenhaPage {
  changePasswordForm: FormGroup;
  isSubmitting = signal(false);
  successMessage = signal<string | null>(null);
  error = signal<string | null>(null);
  showCurrentPassword = signal(false);
  showNewPassword = signal(false);
  showConfirmPassword = signal(false);

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router
  ) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();
      return;
    }

    const currentPassword = this.changePasswordForm.get('currentPassword')?.value;
    const newPassword = this.changePasswordForm.get('newPassword')?.value;

    this.isSubmitting.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    this.supplierService.changePassword(currentPassword, newPassword).subscribe({
      next: () => {
        this.successMessage.set('Senha alterada com sucesso!');
        this.changePasswordForm.reset();
        this.isSubmitting.set(false);

        // Limpar mensagem de sucesso após 3 segundos
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err: any) => {
        const message = err.error?.message || 'Erro ao alterar senha. Verifique se a senha atual está correta.';
        this.error.set(message);
        this.isSubmitting.set(false);
        console.error('Erro ao alterar senha:', err);
      }
    });
  }

  togglePasswordVisibility(field: 'current' | 'new' | 'confirm'): void {
    if (field === 'current') {
      this.showCurrentPassword.set(!this.showCurrentPassword());
    } else if (field === 'new') {
      this.showNewPassword.set(!this.showNewPassword());
    } else {
      this.showConfirmPassword.set(!this.showConfirmPassword());
    }
  }

  getPasswordStrength(): string {
    const password = this.changePasswordForm.get('newPassword')?.value || '';

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
    const field = this.changePasswordForm.get(fieldName);

    // Caso especial para confirmPassword: verificar também o erro do grupo
    if (fieldName === 'confirmPassword') {
      const hasGroupError = this.changePasswordForm.hasError('passwordMismatch');
      return !!((field && field.invalid && (field.dirty || field.touched)) || (hasGroupError && field?.touched));
    }

    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.changePasswordForm.get(fieldName);

    if (fieldName === 'confirmPassword' && this.changePasswordForm.hasError('passwordMismatch')) {
      return 'As senhas não conferem';
    }

    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Campo obrigatório';
    if (field.errors['minlength']) return 'Mínimo 6 caracteres';

    return '';
  }
}
