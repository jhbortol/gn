import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FornecedoresData, Fornecedor } from '../services/fornecedores-data';
import { ClaimPayload } from '../services/fornecedores-data';
import { IpService } from '../../../core/ip.service';
import { firstValueFrom } from 'rxjs';

@Component({
    selector: 'app-claim-profile-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './claim-profile-page.html',
    styleUrls: ['./claim-profile-page.css']
})
export class ClaimProfilePageComponent implements OnInit {
    fornecedor?: Fornecedor;
    notFound = false;
    loading = true;

    claimForm: FormGroup;
    isSubmitting = false;
    showPassword = false;
    errorMessage = '';
    successMessage = '';

    loadingTermo = true;
    termoHtml = '';
    termoHash = '';
    termoVersao = '';

    passwordStrength = { score: 0, label: 'Fraca', color: '#ef4444' };

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private fornecedoresService: FornecedoresData,
        private ipService: IpService,
        @Inject(PLATFORM_ID) private platformId: object
    ) {
        this.claimForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            aceitaTermos: [false, [Validators.requiredTrue]]
        });
    }

    async ngOnInit(): Promise<void> {
        const identifier = this.route.snapshot.params['id'];
        if (!identifier) {
            this.notFound = true;
            this.loading = false;
            return;
        }

        try {
            this.fornecedor = await firstValueFrom(this.fornecedoresService.getById(identifier));
            this.loading = false;
        } catch {
            this.notFound = true;
            this.loading = false;
        }

        this.loadTermos();
    }

    loadTermos(): void {
        if (this.termoHtml && this.termoHash) {
            this.loadingTermo = false;
            return;
        }

        this.loadingTermo = true;

        const timeout = setTimeout(() => {
            if (this.loadingTermo) {
                this.loadingTermo = false;
                this.errorMessage = 'Timeout ao carregar os termos. Tente novamente.';
            }
        }, 10000);

        this.fornecedoresService.getTermoAdesao().subscribe({
            next: (termo) => {
                clearTimeout(timeout);
                this.termoHtml = termo.texto.replace(/\n/g, '<br>');
                this.termoVersao = termo.versao;
                this.termoHash = termo.hash;
                this.loadingTermo = false;
            },
            error: (err) => {
                clearTimeout(timeout);
                console.error('Erro ao carregar termos:', err);
                this.errorMessage = 'Não foi possível carregar os termos de adesão. Tente novamente.';
                this.loadingTermo = false;
            }
        });
    }

    onPhoneInput(event: Event): void {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;
        const masked = this.formatPhoneValue(input.value);
        input.value = masked;
        this.claimForm.get('phone')?.setValue(masked, { emitEvent: false });
    }

    onPhoneBlur(event: FocusEvent): void {
        const input = event.target as HTMLInputElement | null;
        if (!input) return;
        const masked = this.formatPhoneValue(input.value);
        input.value = masked;
        this.claimForm.get('phone')?.setValue(masked, { emitEvent: false });
    }

    private formatPhoneValue(rawValue: string): string {
        let digits = rawValue.replace(/\D/g, '');
        if (digits.length > 11) digits = digits.slice(0, 11);
        if (digits.length <= 2) return digits;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }

    updatePasswordStrength(event: Event): void {
        const pass = (event.target as HTMLInputElement).value;
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        this.passwordStrength = {
            score,
            label: ['Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'][score],
            color: ['#ef4444', '#ef4444', '#f59e0b', '#10b981', '#059669'][score]
        };
    }

    isFieldInvalid(field: string): boolean {
        const control = this.claimForm.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    onSubmit(): void {
        if (this.claimForm.invalid) {
            this.claimForm.markAllAsTouched();
            return;
        }

        if (!this.fornecedor?.id) {
            this.errorMessage = 'Fornecedor não encontrado.';
            return;
        }

        this.isSubmitting = true;
        this.errorMessage = '';

        const formVal = this.claimForm.value;
        const cleanPhone = formVal.phone.replace(/\D/g, '');

        this.ipService.getUserIp().subscribe({
            next: (clientIp: string) => {
                const payload: ClaimPayload = {
                    fullName: formVal.fullName,
                    email: formVal.email,
                    phone: cleanPhone,
                    password: formVal.password,
                    aceitaTermos: formVal.aceitaTermos,
                    termoHash: this.termoHash,
                    dataAceite: new Date().toISOString(),
                    clientIp
                };
                this.sendClaimRequest(payload);
            },
            error: () => {
                const payload: ClaimPayload = {
                    fullName: formVal.fullName,
                    email: formVal.email,
                    phone: cleanPhone,
                    password: formVal.password,
                    aceitaTermos: formVal.aceitaTermos,
                    termoHash: this.termoHash,
                    dataAceite: new Date().toISOString(),
                    clientIp: ''
                };
                this.sendClaimRequest(payload);
            }
        });
    }

    private sendClaimRequest(payload: ClaimPayload): void {
        this.fornecedoresService.claimProfile(this.fornecedor!.id, payload).subscribe({
            next: (res) => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('userId', res.userId);

                this.successMessage = 'Perfil reivindicado com sucesso! Redirecionando...';
                this.isSubmitting = false;

                if (isPlatformBrowser(this.platformId)) {
                    setTimeout(() => {
                        window.location.href = '/supplier-panel';
                    }, 1500);
                }
            },
            error: (err) => {
                console.error('[ClaimProfilePage] Erro no claim:', err);
                this.isSubmitting = false;
                if (err.error?.message) {
                    this.errorMessage = err.error.message;
                } else if (err.error?.error) {
                    this.errorMessage = err.error.error;
                } else {
                    this.errorMessage = 'Ocorreu um erro ao processar sua solicitação.';
                }
            }
        });
    }

    goBack(): void {
        // Navigate back to the supplier profile page
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    getSupplierImage(): string {
        return (
            this.fornecedor?.coverPictureUrl ||
            this.fornecedor?.primaryImage?.url ||
            this.fornecedor?.imagens?.[0]?.url ||
            ''
        );
    }
}
