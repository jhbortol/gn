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
      autorizaFotos: [true] // Pre-marcado
    });
  }

  ngOnInit(): void {
    // Step 1: Carregar Termo
    this.termoService.carregarTermo('ADESAO').subscribe({
      next: (response) => {
        // Backend pode responder com { termo: { ... } } ou diretamente com os campos
        const payload: any = (response as any)?.termo ?? response;

        const conteudo = payload.conteudo ?? payload.texto;

        if (conteudo) {
          const versaoStr = payload.versao ?? '1.0';
          const versaoNum = typeof versaoStr === 'string'
            ? parseFloat(String(versaoStr).replace(/[^0-9.]/g, '')) || 1
            : versaoStr;

          const termoNormalizado: TermoAdesao = {
            id: payload.id ?? 'TERMO-ADESAO',
            versao: versaoNum,
            conteudo,
            dataVigencia: payload.dataVigencia ? new Date(payload.dataVigencia) : new Date(),
            dataValidade: payload.dataValidade ? new Date(payload.dataValidade) : undefined,
            tipoTermo: payload.tipoTermo ?? 'ADESAO',
            hash: payload.hash,
            ativo: payload.ativo ?? true
          };

          this.termo.set(termoNormalizado);
        } else {
          console.error('Termo recebido sem conteúdo:', payload);
          this.error.set('Não foi possível carregar o termo. Tente novamente em instantes.');
        }
      },
      error: (err) => {
        console.error('Erro ao carregar termo:', err);
        this.error.set('Erro ao carregar os termos. Por favor, recarregue a página.');
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
      // Por enquanto, aceitar qualquer CNPJ com 14 dígitos
      // TODO: Descomentar validação abaixo quando algoritmo estiver correto
      return null;
      // return this.validarCNPJ(valor) ? null : { cnpjCpfInvalido: true };
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

    // Validar primeiro dígito (verificador de posição 8)
    // Sequência: 5,4,3,2,9,8,7,6
    const multiplicadores1 = [5, 4, 3, 2, 9, 8, 7, 6];
    let soma = 0;
    for (let i = 0; i < 8; i++) {
      soma += parseInt(cnpj[i]) * multiplicadores1[i];
    }
    let resto = soma % 11;
    let primeiroDigito = resto < 2 ? 0 : 11 - resto;
    if (parseInt(cnpj[8]) !== primeiroDigito) return false;

    // Validar segundo dígito (verificador de posição 9)
    // Sequência: 6,5,4,3,2,9,8,7,6
    const multiplicadores2 = [6, 5, 4, 3, 2, 9, 8, 7, 6];
    soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cnpj[i]) * multiplicadores2[i];
    }
    resto = soma % 11;
    let segundoDigito = resto < 2 ? 0 : 11 - resto;
    if (parseInt(cnpj[9]) !== segundoDigito) return false;

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
      valor = valor.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
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

      // Step 5: Enviar tudo de uma vez para /adesao-express
      const response = await this.api.post<any>('/fornecedores/adesao-express', {
        nomeFantasia: formData.nomeFantasia,
        instagramOficial: formData.instagramOficial,
        cnpjCpf: formData.cnpjCpf.replace(/\D/g, ''),
        nomeResponsavel: formData.nomeResponsavel,
        whatsapp: formData.whatsapp.replace(/\D/g, ''),
        email: formData.email,
        autorizaFotos: formData.autorizaFotos,
        aceitaTermos: true,
        dataAceite: new Date().toISOString(),
        termoHash: termoHash,
        valor: this.PRECO_FINAL
      }).toPromise();

      if (response) {
        // Converter resposta genérica para ComprovanteAceite se possível
        const comprovante: ComprovanteAceite = {
          protocolo: response.protocolo || response.id || 'PROTOCOLO-' + Date.now(),
          fornecedorId: response.fornecedorId || response.id || '',
          termo: response.termo || { id: termo.id, versao: termo.versao, hash: termoHash },
          dataAceite: response.dataAceite ? new Date(response.dataAceite) : new Date(),
          statusAceite: response.statusAceite || 'ACEITO',
          validacaoHash: response.validacaoHash || 'VÁLIDO'
        };
        this.comprovante.set(comprovante);
      }

      this.submitted.set(true);

      // Step 6: Exibir comprovante e redirecionar para checkout da API após 2s
      console.log('Cadastro realizado com sucesso:', response);

      // Obter checkoutUrl da resposta
      const checkoutUrl = response?.checkoutUrl;

      if (!checkoutUrl) {
        this.error.set('Erro ao gerar link de pagamento. Por favor, entre em contato conosco.');
        this.submitted.set(false);
        this.loading.set(false);
        return;
      }

      setTimeout(() => {
        window.location.href = checkoutUrl;
      }, 2000);
    } catch (err: any) {
      const errorMsg = err.error?.message || err.message || 'Erro ao processar sua adesão. Tente novamente.';
      
      // Step 6: Tratamento de erros específicos
      if (err.error?.codigo === 'TERMO_DUPLICADO') {
        this.error.set('Você já aceitou este termo anteriormente.');
      } else if (err.error?.codigo === 'HASH_INVALIDO') {
        this.error.set('Erro na validação do termo.');
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
