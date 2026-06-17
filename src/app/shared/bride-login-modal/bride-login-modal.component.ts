import { Component, EventEmitter, Input, Output, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrideAuthService } from '../../core/services/bride-auth.service';
import { SocialAuthService, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

declare const AppleID: any;

@Component({
  selector: 'app-bride-login-modal',
  standalone: true,
  imports: [CommonModule, GoogleSigninButtonModule],
  template: `
    <div class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div class="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-serif font-bold text-gray-800">Entrar</h2>
            <button (click)="closeModal()" class="text-gray-400 hover:text-gray-600 transition rounded-full p-1 hover:bg-gray-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p class="text-gray-600 mb-8" *ngIf="message">{{ message }}</p>
          <p class="text-gray-600 mb-8" *ngIf="!message">Quer gerenciar todos os seus orçamentos em um só lugar? Entre rápido para continuar.</p>
          
          <div class="space-y-4 flex flex-col items-center">
            <!-- Google Login Button -->
            <div class="w-full flex justify-center [&>div]:w-full [&>div>div]:!w-full [&_iframe]:!w-full">
               <asl-google-signin-button type="standard" size="large" [width]="350" class="w-full max-w-[350px]"></asl-google-signin-button>
            </div>
            
            <!-- Apple Login Button -->
            <button (click)="loginWithApple()" [disabled]="isLoading" class="w-full max-w-[350px] flex items-center justify-center gap-3 bg-black text-white rounded px-4 py-2 font-medium hover:bg-gray-900 transition shadow-sm disabled:opacity-50" style="height: 40px;">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.74 3.48-.82 1.54-.08 2.81.6 3.65 1.83-3.14 1.83-2.61 5.82.52 7.02-.75 1.95-1.8 4.05-2.73 4.14zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Sign in with Apple
            </button>
          </div>

          <div class="mt-8 text-center" *ngIf="showContinueWithoutLogin">
            <button (click)="continueWithoutLogin()" class="text-rose-600 hover:text-rose-700 font-medium underline text-sm transition">
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

  private authService = inject(BrideAuthService);
  private socialAuthService = inject(SocialAuthService);

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
      if (user && user.idToken) {
        this.processGoogleLogin(user.idToken);
      }
    });

    this.initAppleSdk();
  }

  private initAppleSdk() {
    if (typeof window !== 'undefined' && !document.getElementById('apple-auth-script')) {
      const script = document.createElement('script');
      script.id = 'apple-auth-script';
      script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
      document.head.appendChild(script);
    }
  }

  closeModal() {
    this.close.emit();
  }

  continueWithoutLogin() {
    this.continue.emit();
  }

  private processGoogleLogin(idToken: string) {
    this.isLoading = true;
    this.authService.loginWithGoogle(idToken).subscribe({
      next: () => {
        this.isLoading = false;
        this.loginSuccess.emit();
        this.closeModal();
      },
      error: (err) => {
        console.error('Google login failed', err);
        this.isLoading = false;
        alert('Erro ao conectar na API.');
      }
    });
  }

  async loginWithApple() {
    if (typeof AppleID === 'undefined') {
      alert('Apple Auth SDK not loaded yet. Please try again in a moment.');
      return;
    }

    try {
      AppleID.auth.init({
        clientId: environment.APPLE_CLIENT_ID || 'com.guianoivas.web',
        scope: 'name email',
        redirectURI: environment.APPLE_REDIRECT_URI || (window.location.origin + '/apple-auth-callback'),
        usePopup: true
      });

      this.isLoading = true;
      const data = await AppleID.auth.signIn();
      const idToken = data.authorization.id_token;
      
      let firstName, lastName;
      if (data.user && data.user.name) {
        firstName = data.user.name.firstName;
        lastName = data.user.name.lastName;
      }

      this.authService.loginWithApple({ idToken, firstName, lastName }).subscribe({
        next: () => {
          this.isLoading = false;
          this.loginSuccess.emit();
          this.closeModal();
        },
        error: (err) => {
          console.error('Apple login failed', err);
          this.isLoading = false;
          alert('Erro ao conectar na API.');
        }
      });
    } catch (error) {
      console.error('Apple SignIn Error:', error);
      this.isLoading = false;
    }
  }
}

