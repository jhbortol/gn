import { Component, signal, inject, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApiService } from '../../core/api.service';
import { TermoAdesaoService } from '../../core/services/termo-adesao.service';
import { TermoScrollTrackerComponent } from './termo-scroll-tracker.component';
import { ComprovanteAceiteComponent } from './comprovante-aceite.component';
import { TermoAdesao, AceitacaoTermo, ComprovanteAceite } from '../../core/models/termo-adesao.model';

@Component({
  selector: 'app-comecar-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TermoScrollTrackerComponent, ComprovanteAceiteComponent],
  templateUrl: './comecar-page.html',
  styleUrls: ['./comecar-page.css']
})
export class ComecarPage implements OnInit {
  @ViewChild(TermoScrollTrackerComponent) termoScrollTracker?: TermoScrollTrackerComponent;

  adesaoForm: FormGroup;
  loading = signal(false);
  error = signal('');
  submitted = signal(false);
  comprovante = signal<ComprovanteAceite | null>(null);
  scrollCompletoTermo = signal(false);
  aceitoTermo = signal(false);
  termo = signal<TermoAdesao | null>(null);

  private fb = inject(FormBuilder);
  private api = inject(ApiService);
  private http = inject(HttpClient);
  private router = inject(Router);
  private termoService = inject(TermoAdesaoService);

  readonly INFINITEPAY_URL = 'https://link.infinitepay.io/guianoivaspiracicaba/Ri1D-72iRl1Vgzd-397,00';
  readonly PRECO_FINAL = 397.00;
  readonly PRECO_ORIGINAL = 997.00;

  readonly TERMOS_LEGAIS = `TERMOS DE USO E RESPONSABILIDADE

Para garantirmos a segurança jurídica da nossa parceria e a conformidade com a LGPD, formalizamos abaixo as regras de atuação do Portal:

1. CLÁUSULAS DE ADESÃO – VIGÊNCIA 2025/2026

1.1 Natureza do Serviço e Limitação de Responsabilidade

O GUIA NOIVAS PIRACICABA atua exclusivamente como veículo de publicidade, divulgação e vitrine digital para apresentação dos serviços do ANUNCIANTE. O GUIA não realiza:

• Intermediação de contratação
• Venda
• Cobrança
• Atendimento ao consumidor em nome do ANUNCIANTE
• Recomendação personalizada

Toda negociação, contratação, entrega, suporte, execução e responsabilidade civil são exclusivamente entre ANUNCIANTE e cliente final.

1.2 Responsabilidade pelas Informações e Conteúdos Publicados

O ANUNCIANTE declara que:

• Todas as informações fornecidas são verdadeiras
• Possui autorização de uso das imagens, fotos, vídeos e materiais enviados
• Não viola direitos autorais, direitos de imagem ou propriedade intelectual de terceiros
• Atualiza imediatamente qualquer alteração cadastral

Qualquer infração decorrente de conteúdos enviados pelo ANUNCIANTE será de responsabilidade integral deste.

1.3 LGPD – Tratamento de Dados

O ANUNCIANTE responsabiliza-se pelo tratamento adequado dos dados pessoais eventualmente recebidos por meio do seu perfil, devendo cumprir integralmente a Lei Geral de Proteção de Dados (LGPD). O GUIA não utiliza, armazena ou compartilha dados pessoais do consumidor em nome do ANUNCIANTE, agindo apenas como veículo de divulgação.

1.4 Direito de Regresso e Ressarcimento

Caso o GUIA seja acionado judicial ou administrativamente em razão de:

• Informações inverídicas
• Falhas na prestação de serviços
• Danos causados pelo ANUNCIANTE a terceiros
• Uso indevido de imagem, marca ou propriedade intelectual
• Violações de LGPD ou outros ilícitos cometidos pelo ANUNCIANTE

O ANUNCIANTE obriga-se a:

• Assumir imediatamente a defesa, quando solicitado
• Indenizar integralmente o GUIA por quaisquer valores despendidos (indenizações, acordos extrajudiciais, custas processuais, honorários advocatícios)
• Realizar o ressarcimento no prazo máximo de 10 dias úteis após solicitação formal

1.5 Aceite e Vinculação Contratual

O aceite abaixo confirma ciência, concordância integral e integração destas cláusulas ao contrato do fornecedor, renovado para o período 2026. O aceite por e-mail é válido e reconhecido como manifestação expressa de vontade do ANUNCIANTE.`;

  constructor() {
    this.adesaoForm = this.fb.group({
      nomeFantasia: ['', [Validators.required, Validators.minLength(3)]],
      instagramOficial: ['', [Validators.required, Validators.pattern(/^@[a-zA-Z0-9_.]+$/)]],
      cnpjCpf: ['', [Validators.required, this.validarCNPJCPF.bind(this)]],
      nomeResponsavel: ['', [Validators.required, Validators.minLength(3)]],
      whatsapp: ['', [Validators.required, this.validarWhatsApp.bind(this)]],
      email: ['', [Validators.required, Validators.email]],
      autorizaFotos: [true], // Pre-marcado
      aceitaTermos: [false, [Validators.requiredTrue]]
    });
  }

  ngOnInit(): void {
    // Step 1: Carregar Termo
    // TODO: Backend precisa adicionar CORS headers para permitir localhost:4200
    // Enquanto isso, usando mock temporário
    
    this.termoService.carregarTermo('ADESAO').subscribe({
      next: (response) => {
        this.termo.set(response.termo);
      },
      error: (err) => {
        console.error('Erro ao carregar termo (usando mock temporário):', err);
        
        // Mock temporário até backend configurar CORS
        this.termo.set({
          id: 'termo-adesao-2026-v1',
          versao: 1,
          conteudo: this.TERMOS_LEGAIS,
          dataVigencia: new Date('2026-01-01'),
          tipoTermo: 'ADESAO',
          hash: 'mock-hash-temporario-development-only',
          ativo: true
        });
      }
    });
  }

  validarCNPJCPF(control: any): { [key: string]: any } | null {
    const valor = control.value?.replace(/\D/g, '') || '';
    
    if (!valor) return null;

    // Validar CPF (11 dígitos) ou CNPJ (14 dígitos)
    if (valor.length === 11) {
      return this.validarCPF(valor) ? null : { cnpjCpfInvalido: true };
    } else if (valor.length === 14) {
      return this.validarCNPJ(valor) ? null : { cnpjCpfInvalido: true };
    }

    return { cnpjCpfInvalido: true };
  }

  private validarCPF(cpf: string): boolean {
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto = 0;

    for (let i = 1; i <= 9; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
  }

  private validarCNPJ(cnpj: string): boolean {
    if (/^(\d)\1{13}$/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = 0;

    for (let i = tamanho - 1; i >= 0; i--) {
      pos++;
      soma += parseInt(numeros.charAt(tamanho - pos)) * Math.pow(2, (pos % 8));
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = 0;

    for (let i = tamanho - 1; i >= 0; i--) {
      pos++;
      soma += parseInt(numeros.charAt(tamanho - pos)) * Math.pow(2, (pos % 8));
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1))) return false;

    return true;
  }

  aplicarMaskCNPJCPF(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');

    if (valor.length <= 11) {
      // CPF: XXX.XXX.XXX-XX
      valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
      valor = valor.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    } else {
      // CNPJ: XX.XXX.XXX/XXXX-XX
      valor = valor.replace(/(\d{2})(\d)/, '$1.$2');
      valor = valor.replace(/(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
      valor = valor.replace(/(\d{2})\.(\d{3})\.(\d{4})(\d)/, '$1.$2.$3/$4');
      valor = valor.replace(/(\d{2})\.(\d{3})\.(\d{4})\/(\d{2})(\d)/, '$1.$2.$3/$4-$5');
    }

    event.target.value = valor;
    this.adesaoForm.get('cnpjCpf')?.setValue(valor, { emitEvent: false });
  }

  validarWhatsApp(control: any): { [key: string]: any } | null {
    const valor = control.value?.replace(/\D/g, '') || '';
    
    if (!valor) return null;
    
    // Check if length is between 10-11 digits (10 for fixed line, 11 for mobile with area code)
    if (valor.length < 10 || valor.length > 11) {
      return { whatsappInvalido: true };
    }
    
    // Check if it's a valid Brazilian phone (starts with 1-9 after area code)
    if (valor.length >= 2) {
      const areaCode = parseInt(valor.substring(0, 2));
      // Area code must be between 11 and 99
      if (areaCode < 11 || areaCode > 99) {
        return { whatsappInvalido: true };
      }
    }
    
    return null;
  }

  aplicarMaskWhatsApp(event: any): void {
    let valor = event.target.value.replace(/\D/g, '');

    if (valor.length > 11) valor = valor.substring(0, 11);

    if (valor.length <= 2) {
      // (XX
      valor = `(${valor}`;
    } else if (valor.length <= 6) {
      // (XX) XXXX
      valor = `(${valor.substring(0, 2)}) ${valor.substring(2)}`;
    } else {
      // (XX) XXXXX-XXXX
      valor = `(${valor.substring(0, 2)}) ${valor.substring(2, 7)}-${valor.substring(7)}`;
    }

    event.target.value = valor;
    this.adesaoForm.get('whatsapp')?.setValue(valor, { emitEvent: false });
  }

  async onSubmit(): Promise<void> {
    if (this.adesaoForm.invalid || !this.scrollCompletoTermo() || !this.aceitoTermo()) {
      this.adesaoForm.markAllAsTouched();
      this.error.set('Por favor, leia e aceite todos os termos para prosseguir.');
      return;
    }

    this.loading.set(true);
    this.error.set('');

    try {
      const formData = this.adesaoForm.value;
      const termo = this.termo();

      if (!termo) {
        throw new Error('Termo não carregado');
      }

      // Step 4: Validar hash localmente
      const hashValido = await this.termoService.validarHash(
        termo.conteudo,
        termo.hash || ''
      );

      if (!hashValido) {
        this.error.set('Erro na validação do termo. Recarregando página...');
        this.termoService.tratarErroHashInvalido({
          codigo: 'HASH_INVALIDO',
          mensagem: 'Hash do termo não corresponde ao esperado'
        });
        return;
      }

      // Calcular hash para submissão
      const termoHash = await this.termoService.calcularHashTermo(termo.conteudo);

      // Obter dados de auditoria do scroll tracker
      const dadosAuditoria = this.termoScrollTracker?.obterDadosAuditoria() || {
        scrollCompleto: true,
        tempoLeitura: 0,
        aceito: true,
        percentualLido: 100
      };

      // Step 5: Preparar payload com auditoria completa
      const aceitacaoTermo: AceitacaoTermo = {
        termoId: termo.id,
        versao: termo.versao,
        termoHash: termoHash,
        dataAceite: new Date(),
        scrollCompleto: dadosAuditoria.scrollCompleto,
        tempoLeitura: dadosAuditoria.tempoLeitura
      };

      // Submeter aceite do termo (auditoria)
      const comprovanteResponse = await this.termoService.submeterAceitacaoTermo(
        aceitacaoTermo
      ).toPromise();

      if (comprovanteResponse) {
        this.comprovante.set(comprovanteResponse);
      }

      // Enviar dados para API (salvar cadastro com referência ao termo)
      const response = await this.api.post('/fornecedores/adesao-express', {
        nomeFantasia: formData.nomeFantasia,
        instagramOficial: formData.instagramOficial,
        cnpjCpf: formData.cnpjCpf.replace(/\D/g, ''),
        nomeResponsavel: formData.nomeResponsavel,
        whatsapp: formData.whatsapp.replace(/\D/g, ''),
        email: formData.email,
        autorizaFotos: formData.autorizaFotos,
        aceitaTermos: formData.aceitaTermos,
        dataAceite: new Date().toISOString(),
        // Auditoria jurídica
        protocoloAceite: comprovanteResponse?.protocolo,
        termoId: termo.id,
        termoVersao: termo.versao,
        termoHash: termoHash,
        tempoLeitura: dadosAuditoria.tempoLeitura
      }).toPromise();

      this.submitted.set(true);

      // Step 7: Exibir comprovante
      console.log('Comprovante de aceite:', comprovanteResponse);

      // Redirecionar para InfinitePay após 2s (tempo suficiente para ver comprovante)
      setTimeout(() => {
        window.location.href = this.INFINITEPAY_URL;
      }, 2000);
    } catch (err: any) {
      const errorMsg = err.error?.message || err.message || 'Erro ao processar sua adesão. Tente novamente.';
      
      // Step 6: Tratamento de erros específicos
      if (err.error?.codigo === 'TERMO_DUPLICADO') {
        this.termoService.tratarErroDuplicata(err.error);
        this.error.set('Você já aceitos este termo anteriormente.');
      } else if (err.error?.codigo === 'HASH_INVALIDO') {
        this.termoService.tratarErroHashInvalido(err.error);
      } else {
        this.error.set(errorMsg);
      }
      
      this.loading.set(false);
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.adesaoForm.get(fieldName);
    if (!field || !field.errors || !field.touched) return '';

    if (field.errors['required']) return 'Este campo é obrigatório';
    if (field.errors['minLength']) return `Mínimo de ${field.errors['minLength'].requiredLength} caracteres`;
    if (field.errors['email']) return 'E-mail inválido';
    if (field.errors['pattern']) {
      if (fieldName === 'instagramOficial') return 'Use o formato: @sualoja';
    }
    if (field.errors['whatsappInvalido']) return 'WhatsApp inválido (10-11 dígitos)';
    if (field.errors['cnpjCpfInvalido']) return 'CPF ou CNPJ inválido';
    if (field.errors['requiredTrue']) return 'Você deve aceitar os termos para continuar';

    return '';
  }
}
