import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { RemovalReason, RemovalReasonLabels } from '../../../core/models/removal-request.model';
import { RemovalRequestService } from '../../../core/services/removal-request.service';

@Component({
    selector: 'app-removal-request-page',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './removal-request-page.html',
    styleUrls: ['./removal-request-page.css']
})
export class RemovalRequestPageComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private privacyService = inject(RemovalRequestService);

    form!: FormGroup;
    loading = false;
    success = false;
    serverError: string | null = null;
    requestData: any = null;

    removalReasons = Object.entries(RemovalReasonLabels).map(([value, label]) => ({
        value: value as RemovalReason,
        label
    }));

    ngOnInit() {
        this.initForm();

        // Auto-fill fornecedorId from query param if available
        this.route.queryParams.subscribe(params => {
            const fid = params['fornecedorId'];
            if (fid) {
                this.form.patchValue({ fornecedorId: fid });
            }
        });
    }

    initForm() {
        this.form = this.fb.group({
            fornecedorId: ['', [
                Validators.required,
                Validators.pattern(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
            ]],
            requesterName: ['', [Validators.maxLength(200), this.noNumbersValidator]],
            requesterEmail: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
            reason: ['', Validators.required],
            description: ['', [Validators.maxLength(1000)]], // Renomeado de additionalInfo
            confirmsOwnership: [false, Validators.requiredTrue]
        });
    }

    // Custom validator: No numbers allowed
    noNumbersValidator(control: any) {
        if (!control.value) return null;
        const hasNumbers = /\d/.test(control.value);
        return hasNumbers ? { hasNumbers: true } : null;
    }

    onSubmit() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.serverError = null;

        this.privacyService.submitRemovalRequest(this.form.value).subscribe({
            next: (response) => {
                this.loading = false;
                this.success = true;
                this.requestData = {
                    protocolNumber: response.protocolNumber,
                    requestId: response.requestId,
                    email: this.form.get('requesterEmail')?.value,
                    estimatedDate: response.estimatedAnalysisDate
                };
                this.form.reset();
            },
            error: (err) => {
                this.loading = false;
                console.error('Error submitting removal request:', err);
                if (err.status === 429) {
                    this.serverError = 'Muitas requisições. Tente novamente em alguns minutos.';
                } else {
                    this.serverError = err.error?.error || err.error?.message || 'Erro ao enviar solicitação. Verifique os dados e tente novamente.';
                }
            }
        });
    }

    resetForm() {
        this.success = false;
        this.requestData = null;
        this.initForm();
    }
}
