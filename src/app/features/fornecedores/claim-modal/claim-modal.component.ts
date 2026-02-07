import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FornecedoresData } from '../services/fornecedores-data';
import { ClaimPayload } from '../services/fornecedores-data';

@Component({
    selector: 'app-claim-modal',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './claim-modal.component.html',
    styleUrls: ['./claim-modal.component.css']
})
export class ClaimModalComponent implements OnInit {
    @Input() fornecedorId!: string;
    @Output() close = new EventEmitter<void>();
    @Output() success = new EventEmitter<void>();

    claimForm: FormGroup;
    isSubmitting = false;
    showPassword = false;
    errorMessage = '';

    // Termos
    loadingTermo = true;
    termoHtml = '';
    termoHash = '';
    termoVersao = '';

    passwordStrength = { score: 0, label: 'Fraca', color: '#ef4444' };

    constructor(
        private fb: FormBuilder,
        private fornecedoresService: FornecedoresData
    ) {
        this.claimForm = this.fb.group({
            fullName: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)]],
            password: ['', [Validators.required, Validators.minLength(8)]],
            aceitaTermos: [false, [Validators.requiredTrue]]
        });
    }

    ngOnInit(): void {
        this.loadTermos();
    }

    loadTermos() {
        this.loadingTermo = true;
        this.fornecedoresService.getTermoAdesao().subscribe({
            next: async (termo) => {
                // O backend retorna o texto formatado, vamos usar como HTML
                this.termoHtml = termo.texto.replace(/\n/g, '<br>');
                this.termoVersao = termo.versao;
                // Usar o hash que vem do backend
                this.termoHash = termo.hash;
                this.loadingTermo = false;
            },
            error: (err) => {
                console.error('Erro ao carregar termos:', err);
                this.errorMessage = 'Não foi possível carregar os termos de adesão. Tente novamente.';
                this.loadingTermo = false;
            }
        });
    }

    // Helper simples para hash SHA-256 no browser (removido - hash vem do backend)
    // async computeSha256(message: string): Promise<string> {
    //     const msgBuffer = new TextEncoder().encode(message);
    //     const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    //     const hashArray = Array.from(new Uint8Array(hashBuffer));
    //     return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    // }

    onPhoneInput(event: any) {
        let value = event.target.value.replace(/\D/g, '');
        if (value.length > 11) value = value.slice(0, 11);

        // Máscara simples (XX) XXXXX-XXXX
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ` + value.slice(2);
        }
        if (value.length > 10) {
            value = value.slice(0, 10) + '-' + value.slice(10);
        }

        this.claimForm.get('phone')?.setValue(value, { emitEvent: false });
    }

    updatePasswordStrength(event: any) {
        const pass = event.target.value;
        let score = 0;
        if (pass.length >= 8) score++;
        if (/[A-Z]/.test(pass)) score++;
        if (/[0-9]/.test(pass)) score++;
        if (/[^A-Za-z0-9]/.test(pass)) score++;

        this.passwordStrength = {
            score: score,
            label: ['Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'][score],
            color: ['#ef4444', '#ef4444', '#f59e0b', '#10b981', '#059669'][score]
        };
    }

    isFieldInvalid(field: string): boolean {
        const control = this.claimForm.get(field);
        return !!(control && control.invalid && (control.dirty || control.touched));
    }

    onSubmit() {
        if (this.claimForm.invalid) {
            this.claimForm.markAllAsTouched();
            return;
        }

        this.isSubmitting = true;
        this.errorMessage = '';

        const formVal = this.claimForm.value;
        const cleanPhone = formVal.phone.replace(/\D/g, '');

        const payload: ClaimPayload = {
            fullName: formVal.fullName,
            email: formVal.email,
            phone: cleanPhone,
            password: formVal.password,
            aceitaTermos: formVal.aceitaTermos,
            termoHash: this.termoHash,
            dataAceite: new Date().toISOString()
        };

        this.fornecedoresService.claimProfile(this.fornecedorId, payload).subscribe({
            next: (res) => {
                // Armazenar tokens
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('refreshToken', res.refreshToken);
                localStorage.setItem('userId', res.userId);

                // Emitir sucesso
                this.success.emit();
                this.isSubmitting = false;

                // Redirecionar para painel (handled by parent or here)
                // O spec diz redirecionar após 2s, o parent vai lidar com isso ou
                // podemos redirecionar aqui. Vou deixar o parent lidar com o evento success.
            },
            error: (err) => {
                console.error('Erro no claim:', err);
                this.isSubmitting = false;
                if (err.error && err.error.message) {
                    this.errorMessage = err.error.message;
                } else if (err.error && err.error.error) { // alguns backends retornam { error: "msg" }
                    this.errorMessage = err.error.error;
                } else {
                    this.errorMessage = 'Ocorreu um erro ao processar sua solicitação.';
                }
            }
        });

    }
}
