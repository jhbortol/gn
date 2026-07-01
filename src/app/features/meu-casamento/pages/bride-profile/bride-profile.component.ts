import { Component, OnInit, inject, DestroyRef, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BrideAuthService } from '../../../../core/services/bride-auth.service';
import { BrideProfile, TermoAdesao } from '../../../../core/models/bride-auth.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TermoAceiteModalComponent } from '../../../../shared/components/termo-aceite-modal/termo-aceite-modal.component';
import { MeuCasamentoApiService } from '../../services/meu-casamento-api.service';

@Component({
  selector: 'app-bride-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, TermoAceiteModalComponent],
  template: `
    <div class="min-h-screen bg-gray-50 pt-20 pb-8">
      <div class="container mx-auto px-4 max-w-2xl">
        <!-- Header -->
        <div class="mb-8">
          <button (click)="goBack()" class="text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-2 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Voltar
          </button>
          <h1 class="text-3xl font-serif font-bold text-gray-900">Meu Perfil</h1>
          <p class="text-gray-600 mt-2">Gerenciar informações da sua conta</p>
        </div>

        <!-- Loading State -->
        <div *ngIf="isLoading()" class="bg-white rounded-lg shadow p-8 text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
          <p class="text-gray-600 mt-4">Carregando perfil...</p>
        </div>

        <!-- Email Verification Banner -->
        <div *ngIf="!isLoading() && profile()?.emailVerified === false" class="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div class="flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div class="flex-1">
              <h3 class="font-semibold text-yellow-800">Email não verificado</h3>
              <p class="text-sm text-yellow-700 mt-1">Verifique seu email para confirmar sua conta</p>
              <button 
                (click)="sendVerificationEmail()" 
                [disabled]="isVerificationEmailSending()"
                class="mt-2 text-sm font-semibold text-yellow-600 hover:text-yellow-700 disabled:opacity-50">
                {{ isVerificationEmailSending() ? 'Enviando...' : 'Reenviar email de verificação' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div *ngIf="successMessage()" class="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ successMessage() }}
          </div>
        </div>

        <!-- Error Message -->
        <div *ngIf="errorMessage()" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          <div class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ errorMessage() }}
          </div>
        </div>

        <!-- Profile Form -->
        <div *ngIf="!isLoading()" class="bg-white rounded-lg shadow p-8">
          <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-6">
            <!-- Avatar Section -->
            <div class="flex items-center gap-4 pb-6 border-b border-gray-200">
              <div class="w-16 h-16 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 font-bold text-2xl uppercase">
                {{ profile()?.nome?.charAt(0) || 'N' }}
              </div>
              <div>
                <p class="text-sm text-gray-500">Avatar</p>
                <p class="font-semibold text-gray-900">{{ profile()?.nome || 'Noiva' }}</p>
              </div>
            </div>

            <!-- Nome -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome Completo <span class="text-red-600">*</span></label>
              <input
                type="text"
                formControlName="nome"
                placeholder="Digite seu nome completo"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all"
                [class.border-red-500]="isFieldInvalid('nome')"
              />
              <p *ngIf="isFieldInvalid('nome')" class="text-red-500 text-xs mt-1">
                Nome é obrigatório (mínimo 3 caracteres)
              </p>
            </div>

            <!-- Email (Read-only) -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                [value]="profile()?.email"
                disabled
                class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
              <p class="text-xs text-gray-500 mt-1">Email não pode ser alterado</p>
            </div>

            <!-- LGPD Consent -->
            <div class="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <div class="flex items-center h-5 mt-0.5">
                <input
                  id="lgpd-consent"
                  type="checkbox"
                  [checked]="lgpdConsentido()"
                  (change)="onLgpdConsentChange($event)"
                  [disabled]="isLgpdSaving()"
                  class="w-4 h-4 text-rose-600 bg-white border-gray-300 rounded focus:ring-rose-500 focus:ring-2 disabled:opacity-50 cursor-pointer"
                />
              </div>
              <div class="text-sm">
                <label for="lgpd-consent" class="font-medium text-gray-700 cursor-pointer">
                  Opcional: Quero entrar na "Lista VIP" do Guia para receber condições exclusivas e com desconto em financiamento, consórcio e móveis planejados para o meu novo lar.
                </label>
                <p class="text-gray-500 mt-1">
                  (Ao marcar, você aceita nossa <a href="javascript:void(0)" (click)="openTermosPopup()" class="text-rose-600 hover:underline font-medium">Política de Dados</a>).
                </p>
              </div>
            </div>



            <!-- Form Actions -->
            <div class="flex gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                (click)="resetForm()"
                [disabled]="!profileForm.dirty || isSaving()"
                class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                [disabled]="!profileForm.valid || !profileForm.dirty || isSaving()"
                class="px-6 py-2 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {{ isSaving() ? 'Salvando...' : 'Salvar Alterações' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
    <app-termo-aceite-modal 
      *ngIf="isTermoModalOpen()" 
      [content]="termoAdesao()?.texto || null"
      [isLoading]="termoLoading()"
      [error]="termoError()"
      (close)="isTermoModalOpen.set(false)"
      (onRetry)="loadTermos()"
    ></app-termo-aceite-modal>
  `,
  styles: [`
    :host {
      display: block;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    .animate-spin {
      animation: spin 1s linear infinite;
    }
  `]
})
export class BrideProfileComponent implements OnInit {
  private readonly brideAuthService = inject(BrideAuthService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly meuCasamentoApiService = inject(MeuCasamentoApiService);

  isLoading = signal(false);
  isSaving = signal(false);
  isVerificationEmailSending = signal(false);
  successMessage = signal('');
  errorMessage = signal('');
  profile = signal<BrideProfile | null>(null);
  
  lgpdConsentido = signal(false);
  isLgpdSaving = signal(false);

  isTermoModalOpen = signal(false);
  termoAdesao = signal<TermoAdesao | null>(null);
  termoLoading = signal(false);
  termoError = signal<string | null>(null);

  profileForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  private originalProfile: Partial<BrideProfile> = {};

  ngOnInit(): void {
    this.loadProfile();
    this.loadWeddingProfileConsent();
  }

  private loadWeddingProfileConsent(): void {
    this.meuCasamentoApiService.getWeddingProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (profile) => {
          if (profile && typeof profile.vipConsent === 'boolean') {
            this.lgpdConsentido.set(profile.vipConsent);
          }
        },
        error: (err) => {
          console.warn('Failed to load wedding profile consent', err);
        }
      });
  }

  private loadProfile(): void {
    this.isLoading.set(true);
    this.brideAuthService.getBrideProfile()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (profile) => {
          if (profile) {
            this.profile.set(profile);
            this.originalProfile = { ...profile };
            this.populateForm(profile);
          }
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Failed to load profile', err);
          this.errorMessage.set('Erro ao carregar perfil. Tente novamente.');
          this.isLoading.set(false);
        }
      });
  }

  private populateForm(profile: BrideProfile): void {
    this.profileForm.patchValue({
      nome: profile.nome
    }, { emitEvent: false });
    this.profileForm.markAsPristine();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.profileForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }



  onSubmit(): void {
    if (!this.profileForm.valid) {
      this.errorMessage.set('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    this.isSaving.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    const payload: Partial<BrideProfile> = {
      nome: this.profileForm.value.nome || undefined
    };

    this.brideAuthService.updateProfile(payload)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isSaving.set(false);
          this.profile.set(response.noiva);
          this.originalProfile = { ...response.noiva };
          this.populateForm(response.noiva);
          this.successMessage.set('Perfil atualizado com sucesso!');

          setTimeout(() => {
            this.successMessage.set('');
          }, 5000);
        },
        error: (err) => {
          this.isSaving.set(false);
          const errorMsg = err?.error?.message || 'Erro ao atualizar perfil. Tente novamente.';
          this.errorMessage.set(errorMsg);
        }
      });
  }

  resetForm(): void {
    this.populateForm(this.originalProfile as BrideProfile);
  }

  sendVerificationEmail(): void {
    this.isVerificationEmailSending.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.brideAuthService.sendVerificationEmail()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isVerificationEmailSending.set(false);
          this.successMessage.set('Email de verificação enviado! Verifique sua caixa de entrada.');
          
          setTimeout(() => {
            this.successMessage.set('');
          }, 5000);
        },
        error: (err) => {
          this.isVerificationEmailSending.set(false);
          const errorMsg = err?.error?.message || 'Erro ao enviar email de verificação. Tente novamente.';
          this.errorMessage.set(errorMsg);
        }
      });
  }

  onLgpdConsentChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (!isChecked) {
      const confirmRevoke = confirm('Tem certeza que deseja sair da Lista VIP e revogar seu consentimento? Algumas ferramentas podem ficar indisponíveis.');
      if (!confirmRevoke) {
        checkbox.checked = true; // revert
        return;
      }
    }

    this.isLgpdSaving.set(true);
    this.successMessage.set('');
    this.errorMessage.set('');

    if (this.termoAdesao()) {
      this.doRegisterConsent(isChecked, checkbox);
    } else {
      // Fetch in background if checked directly
      this.brideAuthService.getTermoAdesao()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (termo) => {
            this.termoAdesao.set(termo);
            this.doRegisterConsent(isChecked, checkbox);
          },
          error: (err) => {
            this.isLgpdSaving.set(false);
            checkbox.checked = !isChecked; // revert
            this.errorMessage.set('Erro ao buscar o termo de adesão.');
          }
        });
    }
  }

  private doRegisterConsent(isChecked: boolean, checkbox: HTMLInputElement): void {
    const urlOrigem = window.location.href;
    const termo = this.termoAdesao();
    const hash = termo?.hash;
    const versao = termo?.versao;

    this.brideAuthService.registerLgpdConsent(isChecked, urlOrigem, hash, versao)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isLgpdSaving.set(false);
          this.lgpdConsentido.set(isChecked);
          this.successMessage.set('Preferência atualizada com sucesso! (Protocolo: ' + response.protocoloAceite + ')');
          
          setTimeout(() => {
            this.successMessage.set('');
          }, 5000);
        },
        error: (err) => {
          this.isLgpdSaving.set(false);
          checkbox.checked = !isChecked; // revert on error
          const errorMsg = err?.error?.message || 'Erro ao atualizar preferência. Tente novamente.';
          this.errorMessage.set(errorMsg);
        }
      });
  }

  openTermosPopup(): void {
    this.isTermoModalOpen.set(true);
    this.loadTermos();
  }

  loadTermos(): void {
    if (this.termoAdesao()) return;
    this.termoLoading.set(true);
    this.termoError.set(null);
    this.brideAuthService.getTermoAdesao()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (termo) => {
          this.termoAdesao.set(termo);
          this.termoLoading.set(false);
        },
        error: (err) => {
          this.termoError.set('Erro ao carregar os termos. Tente novamente.');
          this.termoLoading.set(false);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/meu-casamento']);
  }
}
