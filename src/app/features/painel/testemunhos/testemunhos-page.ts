import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SupplierService, TestemunhoDto } from '../services/supplier.service';

type Testemunho = TestemunhoDto;

interface PaginatedResponse {
  data: Testemunho[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

@Component({
  selector: 'app-testemunhos-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './testemunhos-page.html',
  styleUrls: ['./testemunhos-page.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestemunhosPage implements OnInit {
  testemunhos = signal<Testemunho[]>([]);
  isLoading = signal(false);
  error = signal<string | null>(null);
  successMessage = signal<string | null>(null);
  
  // Paginação
  currentPage = signal(1);
  pageSize = signal(10);
  totalPages = signal(0);
  total = signal(0);

  // Modal
  showModal = signal(false);
  isEditing = signal(false);
  isSaving = signal(false);
  editingId = signal<number | null>(null);
  
  testemunhoForm: FormGroup;

  constructor(
    private supplierService: SupplierService,
    private fb: FormBuilder
  ) {
    this.testemunhoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(100)]],
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]]
    });
  }

  ngOnInit(): void {
    this.loadTestemunhos();
  }

  loadTestemunhos(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.supplierService.getTestemunhos(this.currentPage(), this.pageSize()).subscribe({
      next: (response: PaginatedResponse) => {
        console.log('Testemunhos recebidos:', response.data);
        this.testemunhos.set(response.data);
        this.total.set(response.total);
        this.totalPages.set(response.totalPages);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.error.set('Erro ao carregar testemunhos. Tente novamente.');
        this.isLoading.set(false);
        console.error('Erro ao carregar testemunhos:', err);
      }
    });
  }

  openCreateModal(): void {
    this.isEditing.set(false);
    this.editingId.set(null);
    this.testemunhoForm.reset({
      nome: '',
      descricao: ''
    });
    this.showModal.set(true);
  }

  openEditModal(testemunho: Testemunho): void {
    this.isEditing.set(true);
    this.editingId.set(testemunho.id);
    this.testemunhoForm.patchValue({
      nome: testemunho.nome || testemunho.nomeCliente,
      descricao: testemunho.descricao || testemunho.mensagem
    });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.testemunhoForm.reset();
    this.editingId.set(null);
  }

  saveTestemunho(): void {
    if (this.testemunhoForm.invalid) {
      this.testemunhoForm.markAllAsTouched();
      return;
    }

    this.isSaving.set(true);
    this.error.set(null);

    const formData = this.testemunhoForm.value;

    if (this.isEditing()) {
      // Update
      this.supplierService.updateTestemunho(this.editingId()!, formData).subscribe({
        next: () => {
          this.successMessage.set('Testemunho atualizado com sucesso!');
          this.closeModal();
          this.loadTestemunhos();
          this.isSaving.set(false);
          setTimeout(() => this.successMessage.set(null), 3000);
        },
        error: (err) => {
          this.error.set('Erro ao atualizar testemunho. Tente novamente.');
          this.isSaving.set(false);
          console.error('Erro ao atualizar:', err);
        }
      });
    } else {
      // Create
      this.supplierService.createTestemunho(formData).subscribe({
        next: () => {
          this.successMessage.set('Testemunho criado com sucesso!');
          this.closeModal();
          this.loadTestemunhos();
          this.isSaving.set(false);
          setTimeout(() => this.successMessage.set(null), 3000);
        },
        error: (err) => {
          this.error.set('Erro ao criar testemunho. Tente novamente.');
          this.isSaving.set(false);
          console.error('Erro ao criar:', err);
        }
      });
    }
  }

  deleteTestemunho(id: number): void {
    if (!confirm('Tem certeza que deseja excluir este testemunho?')) {
      return;
    }

    this.supplierService.deleteTestemunho(id).subscribe({
      next: () => {
        this.successMessage.set('Testemunho excluído com sucesso!');
        this.loadTestemunhos();
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err) => {
        this.error.set('Erro ao excluir testemunho.');
        console.error('Erro ao excluir:', err);
      }
    });
  }

  toggleAtivo(testemunho: Testemunho): void {
    const newStatus = !testemunho.ativo;
    
    this.supplierService.updateTestemunho(testemunho.id, { ativo: newStatus }).subscribe({
      next: () => {
        this.successMessage.set(`Testemunho ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
        this.loadTestemunhos();
        setTimeout(() => this.successMessage.set(null), 3000);
      },
      error: (err) => {
        this.error.set('Erro ao atualizar status do testemunho.');
        console.error('Erro ao toggle ativo:', err);
      }
    });
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
    this.loadTestemunhos();
  }

  getStars(rating: number): string[] {
    return Array(5).fill('').map((_, i) => i < rating ? '★' : '☆');
  }

  // Validação helpers
  isFieldInvalid(fieldName: string): boolean {
    const field = this.testemunhoForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.testemunhoForm.get(fieldName);
    if (!field || !field.errors) return '';

    if (field.errors['required']) return 'Campo obrigatório';
    if (field.errors['email']) return 'Email inválido';
    if (field.errors['maxlength']) return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
    if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
    if (field.errors['max']) return `Valor máximo: ${field.errors['max'].max}`;

    return '';
  }
}
