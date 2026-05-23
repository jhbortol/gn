import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { MetaTagService } from '../../core/meta-tag.service';
import { CidadeService } from '../../core/cidade.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from '../../core/api.service';
import { TermoAdesaoService } from '../../core/services/termo-adesao.service';
import { TrackingService } from '../../core/tracking.service';
import { CategoriasData, Categoria } from '../categorias/services/categorias-data';
import { firstValueFrom } from 'rxjs';

interface CadastroFreePayload {
  // Campos estruturados do contrato alvo
  empresa: { nomeFantasia: string; cnpjCpf: string; categoria: string };
  responsavel: { nome: string };
  contato: { email: string; telefone: string };
  credenciais?: { senha: string };
  // Campos flat legados: manter até backend concluir contrato unificado
  nomeFantasia: string;
  categoria: string;
  nomeResponsavel: string;
  cnpjCpf: string;
  email: string;
  telefone: string;
  password?: string;
  aceitaTermos: true;
  termoHash: string;
  dataAceite: string;
  planLevel: 'Free';
}

@Component({
  selector: 'app-anuncie-page',
  standalone: true,
  templateUrl: './anuncie-page.html',
  styleUrls: ['./anuncie-page.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class AnunciePageComponent implements OnInit {
  readonly cadastroEndpoint = '/fornecedores/cadastro-free';
  readonly redirectDelayMs = 1200;
  private fb = inject(FormBuilder);

  submitted = false;
  pendingApproval = false;
  loading = false;
  termoLoading = true;
  categoriasLoading = true;
  categorias: Categoria[] = [];
  errorMessage = '';
  successMessage = '';
  termoError = '';
  termoConteudo = '';
  termoHashVigente = '';
  private funilIniciado = false;

  cadastroForm = this.fb.group({
    nomeFantasia: ['', [Validators.required, Validators.minLength(3)]],
    categoria: ['', [Validators.required]],
    nomeResponsavel: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefone: ['', [Validators.required, Validators.pattern(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/)]],
    cnpjCpf: ['', [Validators.required, this.validarCnpjCpf.bind(this)]],
    senha: ['', [Validators.minLength(8)]],
    aceitaTermos: [false, [Validators.requiredTrue]]
  });

  private metaTagService = inject(MetaTagService);
  private router = inject(Router);
  private title = inject(Title);
  private api = inject(ApiService);
  private termoService = inject(TermoAdesaoService);
  private trackingService = inject(TrackingService);
  private categoriasData = inject(CategoriasData);
  private platformId = inject(PLATFORM_ID);
  private cidadeService = inject(CidadeService);

  get cidadeNome(): string {
    const c = this.cidadeService.getCidade();
    return c.charAt(0).toUpperCase() + c.slice(1);
  }

  ngOnInit(): void {
    const route = this.router.url.split('?')[0];
    const cidade = this.cidadeService.getCidade();
    const nomeFormatado = cidade.charAt(0).toUpperCase() + cidade.slice(1);
    this.title.setTitle(`Cadastro Gratuito de Fornecedores | Plano Free - Guia Noivas ${nomeFormatado}`);
    this.metaTagService.applyMetadata(route, {
      title: `Cadastro Gratuito de Fornecedores | Plano Free - Guia Noivas ${nomeFormatado}`,
      description: `Cadastre sua empresa gratuitamente no Plano Free do Guia Noivas ${nomeFormatado}. Envie seus dados, aceite os termos e inicie seu perfil de fornecedor.`
    });

    if (isPlatformBrowser(this.platformId)) {
      this.carregarTermoVigente();
      this.carregarCategorias();
    }
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const masked = this.formatPhoneValue(input.value);
    input.value = masked;
    this.cadastroForm.get('telefone')?.setValue(masked, { emitEvent: false });
  }

  onDocumentoInput(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    let valor = (input.value || '').replace(/\D/g, '');
    if (valor.length <= 11) {
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      valor = valor.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    } else {
      valor = valor.slice(0, 14);
      valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
    }
    input.value = valor;
    this.cadastroForm.get('cnpjCpf')?.setValue(valor, { emitEvent: false });
  }

  async onSubmit(): Promise<void> {
    this.trackCadastroFunil('inicio');

    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();
      this.errorMessage = 'Revise os campos obrigatórios e aceite os termos para concluir.';
      return;
    }

    if (!this.termoConteudo) {
      this.errorMessage = 'Não foi possível validar os termos no momento. Tente novamente em instantes.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.submitted = false;
    this.pendingApproval = false;

    try {
      if (!this.termoHashVigente) {
        throw this.criarErroApi('HASH_INVALIDO');
      }

      const hashValido = await this.termoService.validarHash(this.termoConteudo, this.termoHashVigente);
      if (!hashValido) {
        throw this.criarErroApi('HASH_INVALIDO');
      }

      const termoHash = await this.termoService.calcularHashTermo(this.termoConteudo);
      const raw = this.cadastroForm.getRawValue();
      const cnpjCpf = (raw.cnpjCpf || '').replace(/\D/g, '');
      const telefone = (raw.telefone || '').replace(/\D/g, '');
      const senha = (raw.senha || '').trim();
      const email = (raw.email || '').trim().toLowerCase();
      const categoria = (raw.categoria || '').trim();
      const dataAceite = new Date().toISOString();

      const payload: CadastroFreePayload = {
        // Contrato estruturado principal do novo endpoint de cadastro free
        empresa: {
          nomeFantasia: (raw.nomeFantasia || '').trim(),
          cnpjCpf,
          categoria
        },
        responsavel: {
          nome: (raw.nomeResponsavel || '').trim()
        },
        contato: {
          email,
          telefone
        },
        // TODO(backend-contract): remover campos flat após unificação definitiva do endpoint /fornecedores/cadastro-free
        // Campos flat mantidos temporariamente para compatibilidade com contratos legados
        nomeFantasia: (raw.nomeFantasia || '').trim(),
        categoria,
        nomeResponsavel: (raw.nomeResponsavel || '').trim(),
        cnpjCpf,
        email,
        telefone,
        aceitaTermos: true,
        termoHash,
        dataAceite,
        planLevel: 'Free'
      };

      if (senha) {
        // TODO(backend-contract): remover password legado quando backend consumir apenas credenciais.senha
        // Senha no bloco de credenciais e também no campo legado enquanto o backend unifica contrato
        payload.credenciais = { senha };
        payload.password = senha;
      }

      const response = await firstValueFrom(this.api.post<{
        fornecedorId?: string;
        status?: string;
        message?: string;
        redirectUrl?: string;
        panelUrl?: string;
      }>(this.cadastroEndpoint, payload));

      this.submitted = true;
      this.pendingApproval = (response?.status || '').toUpperCase() === 'PENDENTE_APROVACAO';
      this.successMessage = this.pendingApproval
        ? 'Cadastro recebido com sucesso! Seu perfil está em análise e você receberá confirmação por e-mail.'
        : (response?.message || 'Cadastro concluído com sucesso no Plano Free.');
      this.cadastroForm.reset({ aceitaTermos: false, senha: '' });

      this.trackingService.trackFormSubmit('anuncio', { vendorId: response?.fornecedorId });
      this.trackCadastroFunil('sucesso', response?.fornecedorId);

      const redirectUrl = response?.redirectUrl || response?.panelUrl;
      if (redirectUrl) {
        setTimeout(() => window.location.assign(redirectUrl), this.redirectDelayMs);
      }
    } catch (err: any) {
      const erro = this.mapearErroApi(err);
      this.errorMessage = erro.mensagem;
      if (erro.campo) {
        const field = this.cadastroForm.get(erro.campo);
        const currentErrors = field?.errors || {};
        field?.setErrors({ ...currentErrors, api: erro.mensagem });
        field?.markAsTouched();
      }
      this.trackCadastroFunil('falha', undefined, erro.codigo);
    } finally {
      this.loading = false;
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.cadastroForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';
    if (field.errors['api']) return field.errors['api'];
    if (field.errors['required']) return 'Este campo é obrigatório';
    if (field.errors['requiredTrue']) return 'Você deve aceitar os termos para continuar';
    if (field.errors['email']) return 'E-mail inválido';
    if (field.errors['minlength']) return `Mínimo de ${field.errors['minlength'].requiredLength} caracteres`;
    if (field.errors['pattern']) return 'Telefone inválido (use DDD)';
    if (field.errors['cnpjCpfInvalido']) return 'CPF ou CNPJ inválido';
    return '';
  }

  trackCadastroFunil(stage: 'inicio' | 'sucesso' | 'falha', fornecedorId?: string, motivo?: string): void {
    if (stage === 'inicio' && this.funilIniciado) return;
    if (stage === 'inicio') this.funilIniciado = true;
    this.trackingService.trackFreeSignupFunnel(stage, {
      formType: 'anuncio_free',
      vendorId: fornecedorId,
      reason: motivo
    });
  }

  private carregarTermoVigente(): void {
    type TermoApiResponse = {
      termo?: { conteudo?: string; texto?: string; hash?: string };
      conteudo?: string;
      texto?: string;
      hash?: string;
    };

    this.termoLoading = true;
    this.termoError = '';
    this.termoService.carregarTermo('ADESAO').subscribe({
      next: (response: TermoApiResponse) => {
        const payload = response?.termo ?? response;
        this.termoConteudo = payload?.conteudo ?? payload?.texto ?? '';
        this.termoHashVigente = payload?.hash ?? '';
        if (!this.termoConteudo) {
          this.termoError = 'Termo vigente indisponível. Recarregue a página e tente novamente.';
        }
        this.termoLoading = false;
      },
      error: () => {
        this.termoError = 'Erro ao carregar o termo de adesão.';
        this.termoLoading = false;
      }
    });
  }

  private carregarCategorias(): void {
    this.categoriasLoading = true;
    this.categoriasData.getAll().subscribe({
      next: (cats: Categoria[]) => {
        this.categorias = [...cats].sort((a, b) =>
          (a.nome || '').localeCompare(b.nome || '', 'pt-BR', { sensitivity: 'base' })
        );
        this.categoriasLoading = false;
      },
      error: () => {
        this.categoriasLoading = false;
      }
    });
  }

  private formatPhoneValue(rawValue: string): string {
    let digits = rawValue.replace(/\D/g, '');
    if (digits.length > 11) digits = digits.slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
  }

  private mapearErroApi(err: any): { mensagem: string; campo?: string; codigo: string } {
    const codigo = String(
      err?.apiCode ||
      err?.error?.codigo ||
      err?.error?.error ||
      err?.error?.code ||
      'ERRO_DESCONHECIDO'
    ).toUpperCase();

    switch (codigo) {
      case 'EMAIL_JA_CADASTRADO':
      case 'DUPLICATE_EMAIL':
        return { mensagem: 'Este e-mail já está cadastrado.', campo: 'email', codigo };
      case 'CNPJ_CPF_DUPLICADO':
      case 'DUPLICATE_DOCUMENT':
        return { mensagem: 'Este CPF/CNPJ já está cadastrado.', campo: 'cnpjCpf', codigo };
      case 'PENDENTE_APROVACAO':
        return { mensagem: 'Já existe um cadastro pendente de aprovação para estes dados.', codigo };
      case 'TERMOS_OBRIGATORIO':
      case 'TERMO_OBRIGATORIO':
        return { mensagem: 'O aceite dos termos é obrigatório.', campo: 'aceitaTermos', codigo };
      case 'HASH_INVALIDO':
        return { mensagem: 'Erro de validação dos termos. Recarregue a página.', codigo };
      default:
        return {
          mensagem: err?.error?.message || err?.message || 'Não foi possível concluir seu cadastro no momento.',
          codigo
        };
    }
  }

  private validarCnpjCpf(control: AbstractControl): ValidationErrors | null {
    const valor = (control.value || '').replace(/\D/g, '');
    if (!valor) return null;
    if (valor.length === 11) return this.validarCpf(valor) ? null : { cnpjCpfInvalido: true };
    if (valor.length === 14) return this.validarCnpj(valor) ? null : { cnpjCpfInvalido: true };
    return { cnpjCpfInvalido: true };
  }

  private validarCpf(cpf: string): boolean {
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    let soma = 0;
    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10), 10)) return false;
    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11), 10);
  }

  private criarErroApi(codigo: string): Error {
    const error = new Error(codigo) as Error & { apiCode: string };
    error.apiCode = codigo;
    return error;
  }

  private validarCnpj(cnpj: string): boolean {
    if (!cnpj || cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;

    const calcDigito = (base: string, pesos: number[]): number => {
      const soma = base
        .split('')
        .reduce((acc, num, idx) => acc + parseInt(num, 10) * pesos[idx], 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const base = cnpj.substring(0, 12);
    const digito1 = calcDigito(base, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);
    const digito2 = calcDigito(base + digito1, [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]);

    return cnpj.endsWith(`${digito1}${digito2}`);
  }
}
