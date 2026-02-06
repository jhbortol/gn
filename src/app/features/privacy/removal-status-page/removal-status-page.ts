import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RemovalRequestStatus, RemovalReasonLabels } from '../../../core/models/removal-request.model';
import { RemovalRequestService } from '../../../core/services/removal-request.service';

@Component({
    selector: 'app-removal-status-page',
    standalone: true,
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
    templateUrl: './removal-status-page.html',
    styleUrls: ['./removal-status-page.css']
})
export class RemovalStatusPageComponent {
    private fb = inject(FormBuilder);
    private privacyService = inject(RemovalRequestService);

    searchForm: FormGroup = this.fb.group({
        requestId: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]]
    });

    status: RemovalRequestStatus | null = null;
    loading = false;
    error: string | null = null;
    searched = false;

    get statusLabel(): string {
        if (!this.status) return '';
        const map: Record<string, string> = {
            'Pending': 'Aguardando Análise',
            'Approved': 'Aprovada - Dados Removidos',
            'Rejected': 'Rejeitada',
            'Cancelled': 'Cancelada'
        };
        return map[this.status.status] || this.status.status;
    }

    get statusColor(): string {
        if (!this.status) return 'gray';
        const map: Record<string, string> = {
            'Pending': 'amber',
            'Approved': 'green',
            'Rejected': 'red',
            'Cancelled': 'gray'
        };
        return map[this.status.status] || 'gray';
    }

    get statusIcon(): string {
        if (!this.status) return '';
        const map: Record<string, string> = {
            'Pending': '⏳',
            'Approved': '✅',
            'Rejected': '❌',
            'Cancelled': '⏹️'
        };
        return map[this.status.status] || '❓';
    }

    getReasonLabel(reasonCode: string): string {
        // Tenta encontrar o label no mapa, se não encontrar, retorna o código original
        // Cast para any/keyof para evitar erro se o código vier diferente do enum
        const labels: Record<string, string> = RemovalReasonLabels as Record<string, string>;
        return labels[reasonCode] || reasonCode;
    }

    onSearch() {
        if (this.searchForm.invalid) {
            this.searchForm.markAllAsTouched();
            return;
        }

        this.loading = true;
        this.status = null;
        this.error = null;
        this.searched = true;

        const { requestId, email } = this.searchForm.value;

        this.privacyService.getRemovalRequestStatus(requestId, email).subscribe({
            next: (data) => {
                this.status = data;
                this.loading = false;
            },
            error: (err) => {
                this.loading = false;
                console.error('Error fetching status:', err);
                if (err.status === 404) {
                    this.error = 'Solicitação não encontrada. Verifique o protocolo e email.';
                } else {
                    this.error = 'Erro ao consultar status. Verifique sua conexão e tente novamente.';
                }
            }
        });
    }

    resetSearch() {
        this.status = null;
        this.error = null;
        this.searched = false;
        this.searchForm.reset();
    }
}
