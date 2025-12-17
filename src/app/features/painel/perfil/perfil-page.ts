import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { SupplierService, FornecedorDto, FornecedorUpdateDto } from '../services/supplier.service';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-page.html',
  styleUrls: ['./perfil-page.css']
})
export class PerfilPageComponent implements OnInit {
  perfilForm: FormGroup;
  fornecedor: FornecedorDto | null = null;
  loading = true;
  saving = false;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private supplierService: SupplierService,
    private toastService: ToastService
  ) {
    this.perfilForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(200)]],
      descricao: ['', Validators.maxLength(2000)],
      cidade: ['', Validators.maxLength(100)],
      telefone: ['', Validators.maxLength(50)],
      email: ['', [Validators.email, Validators.maxLength(200)]],
      website: ['', [Validators.maxLength(250), this.urlValidator.bind(this)]],
      whatsApp: ['', Validators.maxLength(50)],
      endereco: ['', Validators.maxLength(300)],
      horarioFuncionamento: ['', Validators.maxLength(500)],
      instagram: ['', Validators.maxLength(200)],
      facebook: ['', Validators.maxLength(200)]
    });
  }

  ngOnInit(): void {
    this.loadFornecedor();
  }

  /**
   * Valida se o website é uma URL válida (http://, https://, ou ftp://)
   * Se vazio, permite (validação opcional). Se preenchido, deve ser URL válida.
   */
  private urlValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    
    // Se vazio, é válido (campo opcional)
    if (!value || value.trim() === '') {
      return null;
    }
    
    // Se preenchido, deve ser URL válida
    try {
      // Expressão regular para validar URLs com http, https ou ftp
      const urlPattern = /^(https?:\/\/|ftp:\/\/)([^\s/$.?#].[^\s]*)$/i;
      if (!urlPattern.test(value)) {
        return { invalidUrl: true };
      }
      return null;
    } catch {
      return { invalidUrl: true };
    }
  }

  loadFornecedor(): void {
    this.loading = true;
    this.error = '';
    console.log('Loading fornecedor...');
    
    this.supplierService.getMe().subscribe({
      next: (data) => {
        console.log('Fornecedor data received:', data);
        if (!data) {
          this.error = 'Dados vazios recebidos do servidor';
          this.loading = false;
          return;
        }
        this.fornecedor = data;
        this.perfilForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading fornecedor:', err);
        console.error('Error status:', err.status);
        console.error('Error message:', err.message);
        
        if (err.status === 401) {
          this.error = 'Sessão expirada. Por favor, faça login novamente.';
        } else if (err.status === 403) {
          this.error = 'Acesso negado. Você não tem permissão para acessar estes dados.';
        } else if (err.status === 404) {
          this.error = 'Perfil não encontrado.';
        } else {
          this.error = err.error?.message || 'Erro ao carregar dados do perfil';
        }
        this.loading = false;
      },
      complete: () => {
        console.log('getMe subscription completed');
      }
    });
  }

  onSubmit(): void {
    if (this.perfilForm.invalid) {
      this.toastService.error('Formulário inválido. Verifique os campos.');
      return;
    }

    this.saving = true;
    this.error = '';
    this.success = '';

    const formData = this.perfilForm.value;
    
    // Remover campos vazios para não enviar no payload
    const data = Object.keys(formData)
      .filter(key => formData[key] !== '' && formData[key] !== null && formData[key] !== undefined)
      .reduce((obj: any, key: string) => {
        obj[key] = formData[key];
        return obj;
      }, {}) as FornecedorUpdateDto;

    this.supplierService.updateMe(data).subscribe({
      next: (result) => {
        this.fornecedor = result;
        this.toastService.success('Perfil gravado com sucesso!');
        this.saving = false;
      },
      error: (err) => {
        const errorMsg = err.error?.detail || 'Erro ao salvar perfil';
        this.toastService.error(errorMsg);
        this.saving = false;
      }
    });
  }
}
