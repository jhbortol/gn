import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrideAuthService } from '../../core/services/bride-auth.service';
import { TrackingService } from '../../core/tracking.service';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { IconComponent } from '../icon/icon';

@Component({
  selector: 'app-bride-login-modal',
  standalone: true,
  imports: [CommonModule, GoogleSigninButtonModule, IconComponent, FormsModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col md:flex-row animate-in zoom-in-95 duration-200">
        
        <!-- Left Side: Features List -->
        <div class="md:w-1/2 bg-gradient-to-br from-rose-50 to-pink-50 p-6 md:p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-rose-100/50">
          <div class="flex items-center gap-2 mb-4">
            <app-icon name="heart" [size]="20" className="fill-rose-600 text-rose-600"></app-icon>
            <h3 class="text-lg md:text-xl font-serif font-bold text-rose-800">Organize seu Casamento</h3>
          </div>
          <p class="text-xs text-rose-700/80 mb-6 leading-relaxed">
            Tenha acesso a todas as ferramentas essenciais gratuitas para planejar o seu grande dia com tranquilidade:
          </p>
          <ul class="space-y-4 text-sm text-gray-700">
            <li class="flex items-start gap-3">
              <span class="text-rose-500 mt-0.5 text-base">📅</span>
              <div>
                <strong class="text-rose-950 font-semibold block leading-tight">Cronograma de Tarefas</strong>
                <span class="text-xs text-gray-500">Checklist completo para não esquecer nada</span>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-rose-500 mt-0.5 text-base">💰</span>
              <div>
                <strong class="text-rose-950 font-semibold block leading-tight">Controle Financeiro</strong>
                <span class="text-xs text-gray-500">Gerencie seu orçamento e pagamentos</span>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-rose-500 mt-0.5 text-base">👥</span>
              <div>
                <strong class="text-rose-950 font-semibold block leading-tight">Lista de Convidados</strong>
                <span class="text-xs text-gray-500">Organize a lista de presença e RSVP</span>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-rose-500 mt-0.5 text-base">💖</span>
              <div>
                <strong class="text-rose-950 font-semibold block leading-tight">Fornecedores Favoritos</strong>
                <span class="text-xs text-gray-500">Guarde e compare seus prediletos</span>
              </div>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-rose-500 mt-0.5 text-base">📩</span>
              <div>
                <strong class="text-rose-950 font-semibold block leading-tight">Histórico de Orçamentos</strong>
                <span class="text-xs text-gray-500">Acompanhe todas as suas propostas</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Right Side: Login/Register Forms -->
        <div class="md:w-1/2 p-6 flex flex-col justify-between relative min-h-[450px]">
          <!-- Close Button -->
          <button (click)="closeModal()" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition rounded-full p-1 hover:bg-gray-100 focus:outline-none z-10">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div class="w-full">
            <!-- Tabs -->
            <div class="flex border-b border-gray-100 mb-6 mt-2">
              <button 
                (click)="switchTab('login')" 
                [class.border-rose-600]="activeTab === 'login'" 
                [class.text-rose-600]="activeTab === 'login'" 
                class="flex-1 pb-3 text-center font-semibold border-b-2 border-transparent transition text-gray-500 focus:outline-none text-sm cursor-pointer"
              >
                Entrar
              </button>
              <button 
                (click)="switchTab('register')" 
                [class.border-rose-600]="activeTab === 'register'" 
                [class.text-rose-600]="activeTab === 'register'" 
                class="flex-1 pb-3 text-center font-semibold border-b-2 border-transparent transition text-gray-500 focus:outline-none text-sm cursor-pointer"
              >
                Cadastrar-se
              </button>
            </div>

            <!-- Error Message Alert -->
            <div *ngIf="errorMessage" class="mb-4 p-3 bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs leading-relaxed">
              {{ errorMessage }}
            </div>

            <!-- Tab: Login -->
            <div *ngIf="activeTab === 'login'" class="animate-in fade-in duration-200">
              <p class="text-xs text-gray-400 font-semibold mb-3 tracking-wide uppercase">Entrar rápido com Google</p>
              
              <div class="w-full flex justify-center [&>div]:w-full [&>div>div]:!w-full [&_iframe]:!w-full mb-5">
                 <asl-google-signin-button type="standard" size="large" [width]="280" class="w-full max-w-[280px]"></asl-google-signin-button>
              </div>

              <div class="flex items-center gap-3 my-4">
                <span class="h-px bg-gray-100 flex-1"></span>
                <span class="text-[10px] text-gray-400 font-bold uppercase tracking-wider">ou com e-mail</span>
                <span class="h-px bg-gray-100 flex-1"></span>
              </div>

              <form (ngSubmit)="loginWithEmailCredentials()" class="space-y-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    [(ngModel)]="loginEmail" 
                    name="loginEmail" 
                    required 
                    placeholder="seuemail@exemplo.com"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500 transition"
                    [disabled]="isLoading"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">Senha</label>
                  <input 
                    type="password" 
                    [(ngModel)]="loginSenha" 
                    name="loginSenha" 
                    required 
                    placeholder="Sua senha"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500 transition"
                    [disabled]="isLoading"
                  />
                </div>

                <button 
                  type="submit" 
                  [disabled]="isLoading" 
                  class="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-lg shadow-sm transition disabled:opacity-50 mt-2 cursor-pointer"
                >
                  {{ isLoading ? 'Entrando...' : 'Entrar' }}
                </button>
              </form>
            </div>

            <!-- Tab: Register -->
            <div *ngIf="activeTab === 'register'" class="animate-in fade-in duration-200">
              <form (ngSubmit)="registerWithEmailCredentials()" class="space-y-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    [(ngModel)]="registerNome" 
                    name="registerNome" 
                    required 
                    placeholder="Seu nome"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500 transition"
                    [disabled]="isLoading"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">E-mail</label>
                  <input 
                    type="email" 
                    [(ngModel)]="registerEmail" 
                    name="registerEmail" 
                    required 
                    placeholder="seuemail@exemplo.com"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500 transition"
                    [disabled]="isLoading"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-600 mb-1">Senha (mín. 6 caracteres)</label>
                  <input 
                    type="password" 
                    [(ngModel)]="registerSenha" 
                    name="registerSenha" 
                    required 
                    placeholder="Defina uma senha"
                    class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500 transition"
                    [disabled]="isLoading"
                  />
                </div>

                <button 
                  type="submit" 
                  [disabled]="isLoading" 
                  class="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm rounded-lg shadow-sm transition disabled:opacity-50 mt-4 cursor-pointer"
                >
                  {{ isLoading ? 'Cadastrando...' : 'Criar Conta Grátis' }}
                </button>
              </form>
            </div>
          </div>

          <div class="mt-8 text-center" *ngIf="showContinueWithoutLogin">
            <button (click)="continueWithoutLogin()" class="text-rose-600 hover:text-rose-700 font-medium underline text-xs transition">
              Continuar sem logar
            </button>
          </div>
        </div>
        
      </div>
    </div>
  `
})
export class BrideLoginModalComponent implements OnInit {
  @Input() message?: string;
  @Input() showContinueWithoutLogin = false;
  
  @Output() close = new EventEmitter<void>();
  @Output() continue = new EventEmitter<void>();
  @Output() loginSuccess = new EventEmitter<void>();

  isLoading = false;
  activeTab: 'login' | 'register' = 'login';
  errorMessage = '';

  // Form Models
  loginEmail = '';
  loginSenha = '';
  registerNome = '';
  registerEmail = '';
  registerSenha = '';

  private authService = inject(BrideAuthService);
  private socialAuthService = inject(SocialAuthService);
  private trackingService = inject(TrackingService);

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user && user.idToken && this.activeTab === 'login') {
        this.processGoogleLogin(user.idToken);
      }
    });
  }

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
    this.errorMessage = '';
  }

  closeModal() {
    this.close.emit();
  }

  continueWithoutLogin() {
    this.continue.emit();
  }

  private processGoogleLogin(idToken: string) {
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.loginWithGoogle(idToken).subscribe({
      next: () => {
        this.isLoading = false;
        this.trackingService.trackBrideLogin('google');
        this.loginSuccess.emit();
        this.closeModal();
      },
      error: (err) => {
        console.error('Google login failed', err);
        this.isLoading = false;
        this.errorMessage = 'Falha no login com o Google. Tente novamente.';
      }
    });
  }

  loginWithEmailCredentials() {
    if (!this.loginEmail || !this.loginSenha) {
      this.errorMessage = 'E-mail e senha são obrigatórios.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    this.authService.loginWithEmail({ email: this.loginEmail, senha: this.loginSenha }).subscribe({
      next: () => {
        this.isLoading = false;
        this.trackingService.trackBrideLogin('email');
        this.loginSuccess.emit();
        this.closeModal();
      },
      error: (err) => {
        console.error('Email login failed', err);
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'E-mail ou senha inválidos.';
      }
    });
  }

  registerWithEmailCredentials() {
    if (!this.registerNome || !this.registerEmail || !this.registerSenha) {
      this.errorMessage = 'Nome, e-mail e senha são obrigatórios.';
      return;
    }
    if (this.registerSenha.length < 6) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres.';
      return;
    }
    this.isLoading = true;
    this.errorMessage = '';
    const payload = {
      nome: this.registerNome,
      email: this.registerEmail,
      senha: this.registerSenha
    };
    this.authService.registerWithEmail(payload).subscribe({
      next: () => {
        this.isLoading = false;
        this.trackingService.trackBrideRegister('email');
        this.loginSuccess.emit();
        this.closeModal();
      },
      error: (err) => {
        console.error('Email registration failed', err);
        this.isLoading = false;
        this.errorMessage = err.error?.error || 'Erro ao realizar cadastro. Verifique se o e-mail já existe.';
      }
    });
  }
}
