import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SupplierService } from '../services/supplier.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password-page.html',
  styleUrls: ['./forgot-password-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordPage {
  forgotForm: FormGroup;
  isSubmitting = signal(false);
  successMessage = signal<string | null>(null);
  error = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private router: Router
  ) {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotForm.invalid) {
      this.forgotForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.error.set(null);
    this.successMessage.set(null);

    const email = this.forgotForm.get('email')?.value;

    this.supplierService.forgotPassword(email).subscribe({
      next: () => {
        this.successMessage.set(
          'Se o email existir em nosso sistema, você receberá instruções para recuperar sua senha. ' +
          'Verifique sua caixa de entrada e spam.'
        );
        this.forgotForm.reset();
        this.isSubmitting.set(false);
      },
      error: (err: any) => {
        this.error.set('Ocorreu um erro ao processar sua solicitação. Tente novamente.');
        this.isSubmitting.set(false);
        console.error('Erro ao solicitar recuperação:', err);
      }
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.forgotForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.forgotForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Email é obrigatório';
    if (field.errors['email']) return 'Email inválido';

    return '';
  }
}
