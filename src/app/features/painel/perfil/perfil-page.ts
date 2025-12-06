import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupplierService, FornecedorDto, FornecedorUpdateDto } from '../services/supplier.service';
import { PainelLayoutComponent } from '../layout/painel-layout';

@Component({
  selector: 'app-perfil-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PainelLayoutComponent],
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
    private supplierService: SupplierService
  ) {
    this.perfilForm = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(200)]],
      descricao: ['', Validators.maxLength(2000)],
      cidade: ['', Validators.maxLength(100)],
      telefone: ['', Validators.maxLength(50)],
      email: ['', [Validators.email, Validators.maxLength(200)]],
      website: ['', Validators.maxLength(250)],
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

  loadFornecedor(): void {
    this.loading = true;
    this.supplierService.getMe().subscribe({
      next: (data) => {
        this.fornecedor = data;
        this.perfilForm.patchValue(data);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar dados do perfil';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.perfilForm.invalid) {
      return;
    }

    this.saving = true;
    this.error = '';
    this.success = '';

    const data: FornecedorUpdateDto = this.perfilForm.value;

    this.supplierService.updateMe(data).subscribe({
      next: (result) => {
        this.fornecedor = result;
        this.success = 'Perfil atualizado com sucesso!';
        this.saving = false;
        setTimeout(() => this.success = '', 5000);
      },
      error: (err) => {
        this.error = err.error?.detail || 'Erro ao salvar perfil';
        this.saving = false;
      }
    });
  }
}
