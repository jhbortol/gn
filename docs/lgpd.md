# LGPD - Guia Completo para Portal Público

**Versão:** 2.0  
**Data:** Fevereiro de 2026  
**Status:** Pronto para Implementação  
**Responsável:** Time Frontend Portal Público  

---

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Fundamentos Legais](#fundamentos-legais)
3. [Arquitetura de Privacidade](#arquitetura-de-privacidade)
4. [Regras de Negócio](#regras-de-negócio)
5. [Fluxos de Implementação](#fluxos-de-implementação)
6. [Componentes React](#componentes-react)
7. [Integração com API](#integração-com-api)
8. [Guia de Estilos CSS](#guia-de-estilos-css)
9. [Testes e Validação](#testes-e-validação)
10. [FAQ e Troubleshooting](#faq-e-troubleshooting)
11. [Checklist de Implementação](#checklist-de-implementação)

---

## Visão Geral

### O que é LGPD?

A **Lei Geral de Proteção de Dados (LGPD)** - Lei nº 13.709/2018 é a legislação brasileira que regulamenta o tratamento de dados pessoais, tanto por setor público quanto privado.

**Artigos Relevantes para Portal Público:**

| Artigo | Conteúdo | Relevância |
|--------|----------|-----------|
| **Art. 6** | Princípios (legalidade, finalidade, transparência, etc) | Todos os dados devem atender aos 10 princípios |
| **Art. 8** | Tratamento de dados sem consentimento | Base legal para manter dados de fornecedores públicos |
| **Art. 14** | Consentimento explícito para maiores de 18 anos | Formas de coleta devem obter consentimento |
| **Art. 17** | Direito de acesso aos dados | Fornecedores podem solicitar seus dados |
| **Art. 18** | Direito de retificação, bloqueio e eliminação | **FOCO DESTE DOCUMENTO** |
| **Art. 18, VI** | Direito à eliminação de dados | Base para página de remoção |
| **Art. 19** | Direito à portabilidade de dados | Dados em formato interoperável |
| **Art. 21** | Direito de oposição | Fornecedor pode se opor ao tratamento |

### Escopo deste Documento

Este documento detalha a implementação do **Direito à Eliminação de Dados (Art. 18, VI da LGPD)** no portal público Guia Noivas. Especificamente:

✅ Página pública de solicitação de remoção de dados  
✅ Fluxo de aprovação/rejeição de solicitações  
✅ Anonimização de dados pessoais  
✅ Retenção de dados para compliance legal  
✅ Auditoria e logging de todas as operações  
✅ Notificações por email  

❌ **Fora do Escopo:**
- Direito de acesso (GET /api/privacy/data)
- Direito de portabilidade (EXPORT /api/privacy/export)
- Consentimento para cookies
- LGPD para portal administrativo

---

## Fundamentos Legais

### Por Que Precisamos Implementar LGPD?

1. **Obrigação Legal:** Lei brasileira desde 2020 (com ANPD fiscalizando desde 2021)
2. **Multas:** Até R$ 50 milhões ou 2% do faturamento (máximo)
3. **Reputação:** Transparência aumenta confiança dos fornecedores
4. **Competitividade:** Outros portais já implementaram

### Princípios Aplicáveis no Portal Público

**1. Transparência**
- Explicar claramente o que coletamos
- Mostrar como os dados são usados
- Revelar terceiros com acesso

**2. Finalidade**
- Dados coletados apenas para gerenciar perfil do fornecedor
- Não usar para marketing sem consentimento prévio
- Não vender dados para terceiros

**3. Necessidade**
- Coletar apenas dados necessários
- Não pedir informações não essenciais
- Revisar periodicamente o que está sendo coletado

**4. Segurança**
- HTTPS em todas as comunicações
- Senhas criptografadas (hash bcrypt)
- Dados sensíveis anonimizados após exclusão

**5. Responsabilidade**
- Manter logs de acesso
- Documentar processamento
- Ter políticas de retenção claras

---

## Arquitetura de Privacidade

### Estrutura de Camadas

```
┌─────────────────────────────────────────┐
│     Frontend (Portal Público)            │
│  - RemovalRequestForm                   │
│  - RemovalRequestStatus                 │
│  - PrivacyLinks (Footer)                │
└────────────┬────────────────────────────┘
             │ API REST
             │ /api/v1/privacy/*
┌────────────▼────────────────────────────┐
│  Backend (API Gateway)                   │
│  - Validação de Input                    │
│  - Autenticação/Autorização              │
│  - Rate Limiting                         │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  Serviço de Privacidade                  │
│  - RemovalRequest Service                │
│  - Data Anonymization Service            │
│  - Audit Logger                          │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  Banco de Dados (SQL Server)             │
│  - Tabela RemovalRequests                │
│  - Fornecedores (dados)                  │
│  - AuditLog                              │
└─────────────────────────────────────────┘
```

### Fluxo de Dados

```
Usuário Preenche Formulário
         │
         ▼
Validação Frontend (email, campos obrigatórios)
         │
         ▼
POST /api/v1/privacy/request-removal
         │
         ▼
Backend Valida e Cria RemovalRequest (status: Pending)
         │
         ▼
Envia Email de Confirmação
         │
         ▼
Admin Recebe Notificação
         │
         ▼
Admin Aprova OU Rejeita
         │
    ┌────┴────┐
    │          │
    ▼          ▼
APPROVE    REJECT
    │          │
    ▼          ▼
Anonimiza  Rejeita
Dados      Solicitação
    │          │
    └────┬─────┘
         │
         ▼
Envia Email Final
         │
         ▼
Log em Audit Trail
```

---

## Regras de Negócio

### RN-001: Acesso à Página de Remoção

**Regra:** A página de solicitação de remoção de dados deve estar acessível publicamente, sem autenticação.

**Detalhes:**
- URL: `/privacy/request-removal` (recomendado) ou `/solicitar-remocao-dados`
- Método: GET (sem parâmetros)
- Autenticação: NÃO requerida
- Acesso: Qualquer visitante do site
- Rate Limit: 10 requisições por IP por hora

**Validação:**
```javascript
// Verificar que a página carrega sem autenticação
fetch('/privacy/request-removal')
  .then(r => r.status === 200 ? 'OK' : 'ERRO')
```

---

### RN-002: Campos Obrigatórios do Formulário

**Regra:** O formulário de remoção deve coletar dados específicos para validar a identidade do solicitante.

**Campos:**

| Campo | Tipo | Obrigatório | Descrição | Validação |
|-------|------|-------------|-----------|-----------|
| `fornecedorId` | UUID | ✅ SIM | ID do fornecedor no sistema | Format GUID válido |
| `requesterName` | String(200) | ❌ NÃO | Nome do solicitante (auditoria) | Máx 200 caracteres |
| `requesterEmail` | Email | ✅ SIM | Email para contato e confirmação | Formato RFC 5322 válido |
| `reason` | Enum | ✅ SIM | Motivo da solicitação | Um dos 4 valores do enum |
| `description` | String(1000) | ❌ NÃO | Descrição adicional | Máx 1000 caracteres |
| `confirmsOwnership` | Boolean | ✅ SIM | Confirmação de propriedade | Deve ser `true` |

**Motivos Pré-definidos:**

```javascript
const REMOVAL_REASONS = {
  'FechouEmpresa': 'A empresa encerrou atividades',
  'DadosIncorretos': 'Informações estão desatualizadas',
  'PrivacidadeDados': 'Não quer receber orçamentos/contatos',
  'Outro': 'Outro motivo'
};
```

---

### RN-003: Validação de Entrada (Frontend)

**Regra:** O frontend deve validar todos os campos antes de enviar para o backend.

**Validações:**

| Campo | Validação | Mensagem de Erro |
|-------|-----------|------------------|
| `fornecedorId` | UUID válido (36 caracteres com hífens) | "ID do fornecedor inválido. Verifique no seu perfil." |
| `requesterName` | Opcional; max 200 caracteres; sem números | "Nome não pode exceder 200 caracteres." |
| `requesterEmail` | RFC 5322 válido; max 254 caracteres | "Email inválido. Por favor, verifique." |
| `reason` | Um dos 4 valores permitidos | "Selecione um motivo válido." |
| `confirmsOwnership` | Deve ser `true` | "Você deve confirmar que é o proprietário." |
| `description` | Opcional; max 1000 caracteres | "Descrição não pode exceder 1000 caracteres." |

**Implementação:**

```javascript
const validateForm = (data) => {
  const errors = {};

  // Validação de fornecedorId
  if (!data.fornecedorId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.fornecedorId)) {
    errors.fornecedorId = "ID do fornecedor inválido";
  }

  // Validação de requesterName (opcional)
  if (data.requesterName && data.requesterName.trim().length > 0) {
    if (data.requesterName.length > 200) {
      errors.requesterName = "Nome não pode exceder 200 caracteres";
    }
    if (/\d/.test(data.requesterName)) {
      errors.requesterName = "Nome não pode conter números";
    }
  }

  // Validação de requesterEmail
  if (!data.requesterEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.requesterEmail)) {
    errors.requesterEmail = "Email inválido";
  }
  if (data.requesterEmail && data.requesterEmail.length > 254) {
    errors.requesterEmail = "Email muito longo";
  }

  // Validação de reason
  const validReasons = ['FechouEmpresa', 'DadosIncorretos', 'PrivacidadeDados', 'Outro'];
  if (!data.reason || !validReasons.includes(data.reason)) {
    errors.reason = "Motivo inválido";
  }

  // Validação de confirmsOwnership
  if (data.confirmsOwnership !== true) {
    errors.confirmsOwnership = "Você deve confirmar propriedade";
  }

  // Validação de description (anteriormente additionalInfo)
  if (data.description && data.description.length > 1000) {
    errors.description = "Descrição não pode exceder 1000 caracteres";
  }

  return Object.keys(errors).length === 0 ? null : errors;
};
```

---

### RN-004: Confirmação Explícita de Propriedade

**Regra:** O solicitante deve confirmar explicitamente que é o proprietário do perfil.

**Detalhes:**
- Campo: Checkbox que deve estar marcado
- Texto: "Confirmo que sou o proprietário legítimo deste perfil e estou ciente de que esta ação é irreversível após aprovação."
- Sem este checkbox marcado, o formulário não pode ser enviado
- Se o usuário desmarcar, o botão de envio fica desabilitado

**Implementação:**

```javascript
<div className="form-group form-group--checkbox">
  <label className="checkbox-label">
    <input
      type="checkbox"
      checked={formData.confirmsOwnership}
      onChange={(e) => setFormData({ ...formData, confirmsOwnership: e.target.checked })}
      required
      aria-required="true"
    />
    <span>
      Confirmo que sou o <strong>proprietário legítimo</strong> deste perfil e 
      estou ciente de que esta ação é <strong>irreversível</strong> após aprovação.
    </span>
  </label>
</div>

<button 
  type="submit" 
  disabled={!formData.confirmsOwnership || loading}
  className="btn btn--danger"
>
  Solicitar Remoção
</button>
```

---

### RN-005: Envio Seguro para Backend

**Regra:** O formulário deve ser enviado via POST HTTPS para o backend com validações adicionais.

**Endpoint:** `POST /api/v1/privacy/request-removal`

**Headers Obrigatórios:**
- `Content-Type: application/json`
- `X-Forwarded-For: {IP do cliente}` (para rate limiting)
- Sem autenticação (não requer JWT)

**Body:**

```json
{
  "fornecedorId": "8e82eeae-8ede-45ce-8069-fc4b8c1ff580",
  "requesterName": "José Henrique Bortoleto",
  "requesterEmail": "contato@guianoivas.com",
  "reason": "Outro",
  "description": "Remova imediatamente",
  "confirmsOwnership": true
}
```

**Response 200 OK:**

```json
{
  "success": true,
  "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "Pending",
  "message": "Solicitação de remoção criada com sucesso",
  "protocolNumber": "LGP-2026-0001234",
  "email": "joao@example.com",
  "estimatedAnalysisDate": "2026-02-21"
}
```

**Response 400 Bad Request:**

```json
{
  "success": false,
  "error": "Validation Error",
  "details": {
    "fornecedorId": ["ID do fornecedor não encontrado no sistema"],
    "requesterEmail": ["Email inválido"]
  }
}
```

**Response 409 Conflict:**

```json
{
  "success": false,
  "error": "Já existe uma solicitação ativa para este fornecedor"
}
```

**Response 429 Too Many Requests:**

```json
{
  "success": false,
  "error": "Rate Limited",
  "message": "Máximo de 10 solicitações por hora por IP",
  "retryAfter": 300
}
```

**Implementação Frontend:**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Validação local
  const validationErrors = validateForm(formData);
  if (validationErrors) {
    setError(Object.values(validationErrors)[0]);
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const response = await fetch('/api/v1/privacy/request-removal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      signal: AbortSignal.timeout(10000) // Timeout de 10 segundos
    });

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error('Muitas requisições. Tente novamente em alguns minutos.');
      }
      const errorData = await response.json();
      throw new Error(errorData.message || 'Erro ao enviar solicitação');
    }

    const data = await response.json();
    setSuccess(true);
    setRequestId(data.requestId);
    setProtocolNumber(data.protocolNumber);
    
    // Limpar formulário
    setFormData({
      fornecedorId: '',
      requesterName: '',
      requesterEmail: '',
      reason: '',
      confirmsOwnership: false,
      description: ''
    });

  } catch (err) {
    setError(err.message || 'Erro de conexão. Verifique sua internet.');
  } finally {
    setLoading(false);
  }
};
```

---

### RN-006: Confirmação Inicial por Email

**Regra:** Imediatamente após enviar a solicitação, o solicitante recebe um email de confirmação.

**Disparador:** Sucesso em `POST /api/v1/privacy/request-removal`

**Destinatário:** `requesterEmail` fornecido no formulário

**Assunto:** `Solicitação de Remoção de Dados Recebida - Protocolo #LGP-2026-001234`

**Corpo do Email (HTML):**

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; }
    .header { background: #f5f5f5; padding: 20px; border-bottom: 2px solid #007bff; }
    .content { padding: 20px; }
    .protocol { background: #e7f3ff; padding: 15px; border-radius: 5px; margin: 20px 0; }
    .timeline { margin: 20px 0; }
    .timeline-item { padding: 10px 0; border-left: 3px solid #ddd; padding-left: 15px; }
    .timeline-item.active { border-left-color: #28a745; }
    .footer { background: #f5f5f5; padding: 20px; text-align: center; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Solicitação de Remoção de Dados</h1>
      <p>Lei Geral de Proteção de Dados (LGPD)</p>
    </div>

    <div class="content">
      <p>Olá <strong>{{requesterName}}</strong>,</p>

      <p>Recebemos sua solicitação de remoção de dados pessoais conforme Lei nº 13.709/2018 (LGPD).</p>

      <div class="protocol">
        <p><strong>Protocolo:</strong> {{protocolNumber}}</p>
        <p><strong>Fornecedor ID:</strong> {{fornecedorId}}</p>
        <p><strong>Data/Hora:</strong> {{createdAt}}</p>
        <p><strong>Status Atual:</strong> Aguardando Análise</p>
      </div>

      <h3>Próximos Passos</h3>
      <div class="timeline">
        <div class="timeline-item active">
          <strong>✅ Solicitação Recebida</strong>
          <p>Sua solicitação foi registrada no sistema.</p>
        </div>
        <div class="timeline-item">
          <strong>⏳ Análise da Equipe (até 15 dias úteis)</strong>
          <p>Nossa equipe irá validar os dados fornecidos.</p>
        </div>
        <div class="timeline-item">
          <strong>📧 Notificação de Resultado</strong>
          <p>Você receberá um email com a decisão.</p>
        </div>
      </div>

      <h3>Informações Importantes</h3>
      <ul>
        <li><strong>Prazo Legal:</strong> A LGPD estabelece prazo de até 15 dias úteis para análise</li>
        <li><strong>Irreversível:</strong> Após aprovação, os dados não podem ser recuperados</li>
        <li><strong>Dados Mantidos:</strong> Registros fiscais podem ser mantidos por obrigação legal (7 anos)</li>
        <li><strong>Confirmação:</strong> Você receberá email em cada etapa do processo</li>
      </ul>

      <h3>Como Consultar o Status</h3>
      <p>Acesse <a href="https://guianoivas.com.br/privacy/status">https://guianoivas.com.br/privacy/status</a></p>
      <p>Código de Protocolo: <strong>{{protocolNumber}}</strong></p>

      <h3>Dúvidas?</h3>
      <p>Entre em contato com nosso time de privacidade:</p>
      <ul>
        <li>Email: privacy@guianoivas.com.br</li>
        <li>Telefone: 0800-123-4567</li>
      </ul>
    </div>

    <div class="footer">
      <p>Este email foi enviado automaticamente. Não responda diretamente.</p>
      <p>Guia Noivas © 2026 - Lei Geral de Proteção de Dados (LGPD)</p>
    </div>
  </div>
</body>
</html>
```

---

### RN-007: Status da Solicitação

**Regra:** Toda solicitação passa por estados bem definidos e deve ser rastreável pelo solicitante.

**Estados Possíveis:**

| Estado | Descrição | Ações Possíveis | Email Enviado |
|--------|-----------|-----------------|---------------|
| **Pending** | Aguardando análise do admin | Nenhuma (apenas leitura) | ✅ Confirmação inicial |
| **Approved** | Dados foram removidos/anonimizados | Nenhuma | ✅ Aprovação |
| **Rejected** | Solicitação foi rejeitada com motivo | Nenhuma | ✅ Rejeição + motivo |
| **Cancelled** | Solicitante cancelou antes da análise | Cancelar (apenas se Pending) | ❌ Nenhum |

**Transições Permitidas:**

```
Pending ──(admin approve)──> Approved
    │
    └─(admin reject)────────> Rejected
    │
    └─(user cancel)─────────> Cancelled
```

**Página de Consulta de Status:** `/privacy/request-removal/status`

**Parâmetros de Consulta:**
- `requestId`: ID da solicitação (UUID)
- `email`: Email do solicitante (validação de propriedade)

**Response:**

```json
{
  "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "protocolNumber": "LGP-2026-0001234",
  "status": "Pending",
  "fornecedorId": "550e8400-e29b-41d4-a716-446655440000",
  "createdAt": "2026-02-06T10:30:00Z",
  "updatedAt": "2026-02-06T10:30:00Z",
  "reason": "BUSINESS_CLOSURE",
  "estimatedAnalysisDate": "2026-02-21",
  "rejectionReason": null,
  "approvedAt": null,
  "timeline": [
    {
      "date": "2026-02-06T10:30:00Z",
      "status": "Pending",
      "description": "Solicitação recebida"
    }
  ]
}
```

---

### RN-008: Análise e Aprovação (Admin)

**Regra:** Apenas administradores podem analisar, aprovar ou rejeitar solicitações.

**Acesso:** Painel administrativo - `/admin/lgpd/removal-requests` (requer autenticação e role `Admin`)

**Fluxo de Aprovação:**

```
Admin Clica "Aprovar"
    ↓
Sistema Pede Confirmação com Aviso de Risco
    ↓
    ┌─────────────────────────────┐
    │ ⚠️ Aviso de Risco           │
    │                             │
    │ Esta ação é IRREVERSÍVEL!  │
    │                             │
    │ Dados a serem removidos:   │
    │ • Nome: João Silva         │
    │ • Email: joao@ex.com       │
    │ • Telefone: (11) 99999-8888│
    │ • Sociais: 3 perfis        │
    │ • Website: joao.com.br     │
    │                             │
    │ Cancelar    [CONFIRMAR REMOV]│
    └─────────────────────────────┘
    ↓
Admin Clica "CONFIRMAR REMOÇÃO"
    ↓
PUT /api/v1/admin/lgpd/removal-requests/{id}/approve
    ↓
Backend Executa:
  1. Desativa fornecedor (Ativo = false)
  2. Desativa usuário (IsActive = false)
  3. Anonimiza dados pessoais
  4. Cria log de auditoria
    ↓
Email de Confirmação Enviado
    ↓
Status Muda para "Approved"
```

**Endpoint Backend:**

```
PUT /api/v1/admin/lgpd/removal-requests/{requestId}/approve

Headers:
  Authorization: Bearer {JWT_TOKEN}
  Content-Type: application/json

Body:
{
  "adminNotes": "Confirmado identidade por email",
  "confirmIrreversible": true
}

Response 200:
{
  "success": true,
  "message": "Solicitação aprovada e dados removidos",
  "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "Approved",
  "approvedAt": "2026-02-10T14:30:00Z",
  "anonymizationResult": {
    "fieldsAnonymized": 5,
    "fiscalRecordsRetained": true,
    "retentionYears": 7
  }
}
```

---

### RN-009: Rejeição de Solicitação

**Regra:** Admin pode rejeitar solicitação apenas com motivo obrigatório.

**Motivos de Rejeição Permitidos:**

```javascript
const REJECTION_REASONS = {
  INVALID_SUPPLIER_ID: 'ID do fornecedor não encontrado',
  OWNERSHIP_NOT_VERIFIED: 'Não foi possível verificar propriedade',
  FRAUDULENT_REQUEST: 'Solicitação suspeita de fraude',
  INCOMPLETE_DATA: 'Dados incompletos ou inconsistentes',
  LEGAL_OBLIGATION: 'Manutenção obrigatória por lei',
  ACTIVE_CONTRACT: 'Fornecedor possui contrato ativo',
  OTHER: 'Outro motivo'
};
```

**Fluxo de Rejeição:**

```
Admin Clica "Rejeitar"
    ↓
Sistema Pede Motivo (obrigatório)
    ↓
    ┌─────────────────────────────────┐
    │ Motivo da Rejeição (obrigatório)│
    │                                 │
    │ [ ] ID do fornecedor não existe │
    │ [ ] Propriedade não verificada  │
    │ [ ] Solicitação suspeita        │
    │ [ ] Dados incompletos           │
    │ [ ] Manutenção obrigatória      │
    │ [ ] Contrato ativo              │
    │ [ ] Outro motivo                │
    │                                 │
    │ Detalhes Adicionais:            │
    │ ┌──────────────────────────────┐│
    │ │ (opcional - até 500 chars)   ││
    │ └──────────────────────────────┘│
    │                                 │
    │ Cancelar    [REJEITAR]         │
    └─────────────────────────────────┘
    ↓
Admin Seleciona Motivo + Clica "REJEITAR"
    ↓
PUT /api/v1/admin/lgpd/removal-requests/{id}/reject
    ↓
Backend:
  1. Muda status para "Rejected"
  2. Armazena motivo de rejeição
  3. Cria log de auditoria
    ↓
Email de Rejeição Enviado
    ↓
Solicitação Encerrada
```

**Endpoint Backend:**

```
PUT /api/v1/admin/lgpd/removal-requests/{requestId}/reject

Headers:
  Authorization: Bearer {JWT_TOKEN}
  Content-Type: application/json

Body:
{
  "rejectionReason": "OWNERSHIP_NOT_VERIFIED",
  "rejectionDetails": "Email não corresponde ao registrado no sistema",
  "adminId": "user-123"
}

Response 200:
{
  "success": true,
  "message": "Solicitação rejeitada",
  "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "status": "Rejected",
  "rejectionReason": "OWNERSHIP_NOT_VERIFIED",
  "rejectionDetails": "Email não corresponde ao registrado no sistema",
  "rejectedAt": "2026-02-10T14:30:00Z"
}
```

---

### RN-010: Anonimização de Dados

**Regra:** Quando uma solicitação é aprovada, dados pessoais são anonimizados conforme política de retenção.

**Dados Removidos (Imediatamente):**

| Campo | Tipo Atual | Valor Anônimo | Exemplo |
|-------|-----------|---------------|---------|
| `Nome` | "João Silva" | "Fornecedor #[ID]" | "Fornecedor #550e8400" |
| `Email` | "joao@example.com" | "removed_[UUID]@guianoivas.invalid" | "removed_a1b2c3d4@guianoivas.invalid" |
| `Telefone` | "(11) 99999-8888" | `NULL` | - |
| `WhatsApp` | "5511999998888" | `NULL` | - |
| `Website` | "joao.com.br" | `NULL` | - |
| `Facebook` | "https://facebook.com/joao" | `NULL` | - |
| `Instagram` | "https://instagram.com/joao" | `NULL` | - |
| `LinkedIn` | "https://linkedin.com/in/joao" | `NULL` | - |

**Dados Mantidos (até 7 anos):**

| Campo | Justificativa | Retenção |
|-------|---------------|----------|
| `Id` (Fornecedor) | Rastreabilidade para auditoria | 7 anos |
| `CNPJ` (anônimo) | Obrigação fiscal | 7 anos |
| `CPF` (anônimo) | Obrigação fiscal | 7 anos |
| `Data de Cadastro` | Auditoria | 7 anos |
| `Data de Remoção` | Auditoria | 7 anos |
| `Admin que Aprovou` | Auditoria | 7 anos |
| `Motivo da Remoção` | Auditoria | 7 anos |
| `Histórico de Transações` | Obrigação legal/fiscal | 7 anos |

**Implementação SQL:**

```sql
-- Procedure para anonimizar fornecedor após aprovação de remoção
CREATE PROCEDURE sp_AnonymizeFornecedor
    @FornecedorId UNIQUEIDENTIFIER,
    @RequestId UNIQUEIDENTIFIER,
    @AdminId UNIQUEIDENTIFIER
AS
BEGIN
    BEGIN TRANSACTION

    DECLARE @AnonymizedEmail NVARCHAR(255) = CONCAT('removed_', CAST(NEWID() AS NVARCHAR(36)), '@guianoivas.invalid')
    DECLARE @AnonymizedName NVARCHAR(255) = CONCAT('Fornecedor #', SUBSTRING(CAST(@FornecedorId AS NVARCHAR(36)), 1, 8))
    
    -- Atualiza tabela de Fornecedores
    UPDATE Fornecedores
    SET
        Nome = @AnonymizedName,
        Email = @AnonymizedEmail,
        Telefone = NULL,
        WhatsApp = NULL,
        Website = NULL,
        Facebook = NULL,
        Instagram = NULL,
        LinkedIn = NULL,
        Ativo = 0,
        UpdatedAt = GETUTCDATE()
    WHERE Id = @FornecedorId

    -- Desativa usuário associado
    UPDATE Users
    SET IsActive = 0, UpdatedAt = GETUTCDATE()
    WHERE FornecedorId = @FornecedorId

    -- Cria log de auditoria
    INSERT INTO AuditLog (
        Id, ActionType, EntityType, EntityId, AdminId, 
        Details, CreatedAt
    )
    VALUES (
        NEWID(), 'ANONYMIZE_FORNECEDOR', 'Fornecedor', @FornecedorId,
        @AdminId,
        CONCAT('Dados anonimizados conforme solicitação LGPD ', @RequestId),
        GETUTCDATE()
    )

    COMMIT TRANSACTION
END
```

---

### RN-011: Retenção de Dados Fiscais

**Regra:** Dados fiscais (CNPJ, CPF) são mantidos por 7 anos em formato anonimizado conforme obrigação legal.

**Justificativa Legal:**
- Lei 5.991/1973 (Arquivo Nacional) - 5 anos mínimo
- Lei Complementar 128/2008 - 5 anos mínimo
- Código Tributário Nacional - 5 anos mínimo
- Portaria 1.000/2001 (SECAP) - mantém 5 anos

**Implementação:**

```sql
-- Tabela de Retenção de Dados Fiscais
CREATE TABLE FornecedorRetencao (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    FornecedorIdOriginal UNIQUEIDENTIFIER NOT NULL,
    CNPJHash NVARCHAR(256) NOT NULL, -- SHA256 hash do CNPJ
    CPFHash NVARCHAR(256) NULL, -- SHA256 hash do CPF
    DataRemocao DATETIME2 NOT NULL,
    DataExpiracaoRetencao DATETIME2 NOT NULL, -- DataRemocao + 7 anos
    Status NVARCHAR(50), -- 'Retido' ou 'Deletado'
    RequestId UNIQUEIDENTIFIER NOT NULL,
    AdminId UNIQUEIDENTIFIER NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
)

-- Inserir registro de retenção quando remover
INSERT INTO FornecedorRetencao (
    Id, FornecedorIdOriginal, CNPJHash, CPFHash, 
    DataRemocao, DataExpiracaoRetencao, Status, RequestId, AdminId
)
VALUES (
    NEWID(), @FornecedorId, @CNPJHash, @CPFHash,
    GETUTCDATE(), DATEADD(YEAR, 7, GETUTCDATE()),
    'Retido', @RequestId, @AdminId
)

-- Job mensal para deletar dados de retenção expirados
CREATE PROCEDURE sp_DeleteExpiredRetentionData
AS
BEGIN
    UPDATE FornecedorRetencao
    SET Status = 'Deletado'
    WHERE Status = 'Retido' 
      AND DataExpiracaoRetencao < GETUTCDATE()
END
```

---

### RN-012: Notificações por Email

**Regra:** Em cada mudança de status, o solicitante recebe notificação automática por email.

**Emails Disparados:**

**1️⃣ Email de Confirmação (após envio do formulário)**

- **Quando:** Imediatamente após `POST /api/v1/privacy/request-removal` retornar sucesso
- **Destinatário:** `requesterEmail`
- **Assunto:** `Solicitação de Remoção de Dados Recebida - Protocolo #LGP-2026-001234`
- **Conteúdo:** (Veja RN-006)

**2️⃣ Email de Aprovação**

- **Quando:** Admin clica em "APROVAR" 
- **Destinatário:** `requesterEmail`
- **Assunto:** `Sua Solicitação de Remoção de Dados foi Aprovada`
- **Conteúdo:**

```html
Olá {{requesterName}},

Sua solicitação de remoção de dados (Protocolo: {{protocolNumber}}) 
foi APROVADA.

Seus dados pessoais foram removidos do sistema conforme 
Lei nº 13.709/2018 (LGPD).

O que foi removido:
• Nome do Fornecedor
• Email
• Telefone
• Redes Sociais
• Website

O que foi mantido (por obrigação legal):
• Registros fiscais (CNPJ/CPF) em formato anônimo por 7 anos
• Histórico de transações para auditoria

Ação concluída em: {{approvedAt}}
Solicitado por: {{requesterName}}

Dúvidas? Entre em contato com privacy@guianoivas.com.br
```

**3️⃣ Email de Rejeição**

- **Quando:** Admin clica em "REJEITAR"
- **Destinatário:** `requesterEmail`
- **Assunto:** `Sua Solicitação de Remoção de Dados - Necessário Revisão`
- **Conteúdo:**

```html
Olá {{requesterName}},

Sua solicitação de remoção de dados (Protocolo: {{protocolNumber}}) 
foi REJEITADA.

Motivo: {{rejectionReason}}

Detalhes: {{rejectionDetails}}

Se você acredita que houve um erro, por favor entre em contato com:
Email: privacy@guianoivas.com.br
Telefone: 0800-123-4567

Você pode enviar uma nova solicitação em:
https://guianoivas.com.br/privacy/request-removal
```

---

### RN-013: Auditoria Completa

**Regra:** Todas as operações relacionadas a LGPD devem ser registradas em log de auditoria.

**Tabela de Auditoria:**

```sql
CREATE TABLE LGPDAuditLog (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    RequestId UNIQUEIDENTIFIER NOT NULL,
    ActionType NVARCHAR(50) NOT NULL, -- 'CREATE', 'APPROVE', 'REJECT', 'CANCEL'
    FornecedorId UNIQUEIDENTIFIER NOT NULL,
    RequesterEmail NVARCHAR(255) NOT NULL,
    AdminId UNIQUEIDENTIFIER NULL, -- NULL para ações do usuário
    AdminEmail NVARCHAR(255) NULL,
    IPAddress NVARCHAR(45) NOT NULL,
    UserAgent NVARCHAR(500) NULL,
    Status NVARCHAR(50) NOT NULL,
    Details NVARCHAR(MAX) NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE()
)
```

**Eventos Auditados:**

| Evento | Trigger | Dados Capturados | Retenção |
|--------|---------|------------------|----------|
| `REQUEST_CREATED` | User submits form | RequestId, FornecedorId, Email, IP, UserAgent | Permanente |
| `REQUEST_EMAIL_SENT` | Confirmation email sent | RequestId, Email, Status | Permanente |
| `ADMIN_VIEWED_REQUEST` | Admin opens request | RequestId, AdminId, Timestamp | Permanente |
| `REQUEST_APPROVED` | Admin clicks approve | RequestId, AdminId, Timestamp, Decision | Permanente |
| `DATA_ANONYMIZED` | Data removed from DB | RequestId, Fields removed, Timestamp | Permanente |
| `APPROVAL_EMAIL_SENT` | Approval email sent | RequestId, Email, Timestamp | Permanente |
| `REQUEST_REJECTED` | Admin clicks reject | RequestId, AdminId, Reason, Timestamp | Permanente |
| `REJECTION_EMAIL_SENT` | Rejection email sent | RequestId, Email, Timestamp | Permanente |
| `REQUEST_CANCELLED` | User cancels request | RequestId, Timestamp | Permanente |

**Implementação:**

```javascript
// Frontend: Capturar dados para auditoria
async function logAuditEvent(actionType, details) {
  const userAgent = navigator.userAgent;
  const ipAddress = await fetch('/api/v1/public/my-ip').then(r => r.json());

  const auditLog = {
    actionType,
    userAgent,
    ipAddress: ipAddress.ip,
    details,
    timestamp: new Date().toISOString()
  };

  // Enviar para backend para registro permanente
  await fetch('/api/v1/audit/log', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(auditLog)
  });
}

// Usar ao submeter formulário
handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/v1/privacy/request-removal', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    if (response.ok) {
      const data = await response.json();
      
      // Log do evento de sucesso
      await logAuditEvent('REQUEST_CREATED', {
        requestId: data.requestId,
        fornecedorId: formData.fornecedorId,
        reason: formData.reason
      });

      setSuccess(true);
    }
  } catch (err) {
    // Log do erro
    await logAuditEvent('REQUEST_FAILED', {
      error: err.message,
      formData: formData // sem dados sensíveis
    });
  }
};
```

---

### RN-014: Prazo de Processamento (15 Dias Úteis)

**Regra:** Conforme Art. 18 da LGPD, a análise deve ser concluída em até 15 dias úteis.

**Cálculo de Dias Úteis:**
- Exclui fins de semana (sábado e domingo)
- Exclui feriados nacionais brasileiros
- Data inicial = data de criação da solicitação
- Data máxima = data de criação + 15 dias úteis

**Implementação:**

```javascript
function calculateEstimatedAnalysisDate(createdDate) {
  // Feriados nacionais brasileiros (exemplo para 2026)
  const holidays = [
    '2026-01-01', // Ano Novo
    '2026-02-16', // Carnaval
    '2026-02-17', // Carnaval
    '2026-02-18', // Carnaval
    '2026-04-21', // Tiradentes
    '2026-05-01', // Dia do Trabalho
    '2026-09-07', // Independência
    '2026-10-12', // Nossa Senhora Aparecida
    '2026-11-02', // Finados
    '2026-11-20', // Consciência Negra
    '2026-12-25', // Natal
  ];

  let workingDaysCount = 0;
  let currentDate = new Date(createdDate);
  
  while (workingDaysCount < 15) {
    currentDate.setDate(currentDate.getDate() + 1);
    
    // Se é segunda a sexta
    if (currentDate.getDay() >= 1 && currentDate.getDay() <= 5) {
      // Se não é feriado
      if (!holidays.includes(currentDate.toISOString().split('T')[0])) {
        workingDaysCount++;
      }
    }
  }

  return currentDate;
}

// Usar ao criar solicitação
const estimatedDate = calculateEstimatedAnalysisDate(new Date());
console.log(`Análise estimada: ${estimatedDate.toLocaleDateString('pt-BR')}`);
```

**Dashboard de Timing:**

```jsx
function RequestTimingDisplay({ requestId, createdAt }) {
  const estimatedDate = calculateEstimatedAnalysisDate(createdAt);
  const daysRemaining = calculateWorkingDaysRemaining(estimatedDate);
  
  return (
    <div className="timing-display">
      <p>
        <strong>Criada:</strong> {new Date(createdAt).toLocaleDateString('pt-BR')}
      </p>
      <p>
        <strong>Análise até:</strong> {estimatedDate.toLocaleDateString('pt-BR')} 
        ({daysRemaining} dias úteis restantes)
      </p>
      <div className="progress-bar">
        <div className="progress-fill" style={{width: `${calculateProgress()}%`}} />
      </div>
    </div>
  );
}
```

---

### RN-015: Feedback e Mensagens de Erro

**Regra:** O sistema deve fornecer mensagens claras e específicas para cada situação.

**Mensagens de Sucesso:**

```
✅ Solicitação enviada com sucesso!
   Protocolo: LGP-2026-001234
   Você receberá atualizações por email em: joao@example.com
   Prazo de análise: até 15 dias úteis
```

**Mensagens de Erro - Validação:**

```
❌ Por favor, preencha todos os campos obrigatórios
❌ Email inválido
❌ ID do fornecedor deve ser um UUID válido
❌ Você deve confirmar que é proprietário do perfil
```

**Mensagens de Erro - Backend:**

```
❌ Fornecedor não encontrado
❌ Email não corresponde ao fornecedor
❌ Muitas solicitações (rate limited)
❌ Erro de conexão. Tente novamente em alguns minutos.
```

**Mensagens de Sucesso - Admin:**

```
✅ Solicitação aprovada com sucesso
   Dados do fornecedor foram anonimizados
   Email de confirmação enviado
   Logs de auditoria registrados
```

---

## Fluxos de Implementação

### Fluxo 1: Envio de Solicitação (Usuário)

```
┌─────────────────────────────────────────────────┐
│ 1. Usuário Acessa /privacy/request-removal      │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 2. Frontend Carrega RemovalRequestForm          │
│    • Renderiza formulário vazio                 │
│    • Exibe info box com avisos                  │
│    • Botão "Solicitar Remoção" desabilitado    │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 3. Usuário Preenche Campos                      │
│    • Fornecedor ID                              │
│    • Nome Completo                              │
│    • Email                                      │
│    • Motivo                                     │
│    • Checkbox de Confirmação                    │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 4. Frontend Valida Dados (RN-003)              │
│    ✅ Tudo OK → Botão habilitado                │
│    ❌ Erro → Mostra mensagem                    │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 5. Usuário Clica "Solicitar Remoção"           │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 6. Frontend Envia POST (RN-005)                 │
│    POST /api/v1/privacy/request-removal        │
│    Headers + Body JSON                          │
│    Loading = true (desabilita botão)           │
└──────────────┬──────────────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────┐         ┌─────▼────┐
│ 200 OK │         │ 400/429  │
└───┬────┘         └─────┬────┘
    │                     │
┌───▼─────────────────────────────┐
│ 7. Resposta Recebida            │
│ • requestId                     │
│ • protocolNumber                │
│ • status: "Pending"            │
└───┬─────────────────────────────┘
    │
┌───▼──────────────────────────────┐
│ 8. Backend Dispara Email (RN-06)│
│    • To: requesterEmail         │
│    • Subject: Protocolo #xxx    │
│    • Status: Pending            │
└───┬──────────────────────────────┘
    │
┌───▼──────────────────────────────┐
│ 9. Frontend Mostra Sucesso       │
│    • Icon ✅                     │
│    • Protocolo exibido          │
│    • Email confirmação mostrado │
│    • Botão "Nova Solicitação"   │
└──────────────────────────────────┘
```

---

### Fluxo 2: Análise de Solicitação (Admin)

```
┌─────────────────────────────────────────────────┐
│ 1. Admin Acessa /admin/lgpd/removal-requests   │
│    (requer autenticação + role Admin)          │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 2. Carrega ListaRemovalRequests                 │
│    GET /api/v1/admin/lgpd/removal-requests    │
│    • Filtro: status=Pending                     │
│    • Mostra: 20 por página                      │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 3. Exibe Tabela com Solicitações               │
│    • Protocol Number                            │
│    • Fornecedor ID                              │
│    • Data de Criação                            │
│    • Status (Pending)                           │
│    • Ações: [Ver Detalhes] [Aprovar] [Rejeitar]│
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 4. Admin Clica "Ver Detalhes"                   │
│    • Abre modal com todos os dados              │
│    • Fornecedor completo                        │
│    • Motivo da solicitação                      │
│    • Dados que serão removidos                  │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 5. Admin Decide: APROVAR ou REJEITAR            │
└──────────────┬──────────────────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────────┐      ┌────▼─────────┐
│ APROVAR    │      │ REJEITAR     │
└───┬────────┘      └────┬─────────┘
    │                    │
┌───▼──────────────────────────────┐
│ 6. Modal de Confirmação Aparece  │
│ APROVAR:                         │
│  ⚠️ Esta ação é IRREVERSÍVEL!   │
│  • Dados a remover (lista)      │
│  [Cancelar] [CONFIRMAR REMOV]   │
│                                 │
│ REJEITAR:                       │
│  • Motivo (dropdown)            │
│  • Detalhes (textbox)           │
│  [Cancelar] [REJEITAR]          │
└───┬──────────────────────────────┘
    │
┌───▼──────────────────────────────┐
│ 7. Admin Confirma Ação           │
│    • Clica "CONFIRMAR REMOV"    │
│    ou "REJEITAR"                │
└───┬──────────────────────────────┘
    │
┌───▼──────────────────────────────┐
│ 8. Backend Processa              │
│ APPROVE:                         │
│  1. UPDATE Fornecedor (Ativo=0) │
│  2. UPDATE User (IsActive=0)    │
│  3. Anonymize fields            │
│  4. Log Auditoria               │
│  5. Send Email                  │
│                                 │
│ REJECT:                         │
│  1. Status = Rejected           │
│  2. Store rejection reason      │
│  3. Log Auditoria               │
│  4. Send Email                  │
└───┬──────────────────────────────┘
    │
┌───▼──────────────────────────────┐
│ 9. Frontend Atualiza             │
│    • Remove item da lista        │
│    • Mostra mensagem de sucesso  │
│    • Atualiza contadores         │
└──────────────────────────────────┘
```

---

### Fluxo 3: Consulta de Status (Usuário)

```
┌─────────────────────────────────────────────────┐
│ 1. Usuário Recebe Email de Confirmação          │
│    • Contém protocolo #LGP-2026-001234         │
│    • Link para consultar status                │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 2. Usuário Clica Link ou Acessa Manualmente    │
│    URL: /privacy/request-removal/status        │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 3. Frontend Carrega RemovalRequestStatus       │
│    • Exibe dois campos:                         │
│      - Request ID (ou Protocolo)               │
│      - Email (para verificação)                │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 4. Usuário Preenche e Clica "Consultar"       │
│    • Request ID: LGP-2026-001234              │
│    • Email: joao@example.com                   │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 5. Frontend Envia GET                          │
│    /api/v1/privacy/request-removal/status     │
│    ?id=LGP-2026-001234&email=joao@example.com │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 6. Backend Valida e Retorna Status             │
│    • Verifica ID + Email coincidem             │
│    • Retorna status atual                      │
│    • Timeline de eventos                       │
└──────────────┬──────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────┐
│ 7. Frontend Exibe Status                       │
│                                                 │
│ Status: ⏳ PENDENTE                            │
│                                                 │
│ Timeline:                                       │
│ ✅ 06/02 - Solicitação Recebida               │
│ ⏳ Análise em Andamento                        │
│ ⏸️ Resultado até 21/02                         │
│                                                 │
│ [Voltar] [Fazer Nova Solicitação]              │
└──────────────────────────────────────────────────┘
```

---

## Componentes React

### 1. RemovalRequestForm.jsx

**Localização:** `src/pages/Privacy/RemovalRequestForm.jsx`

```jsx
import React, { useState } from 'react';
import './RemovalRequestForm.css';

export const RemovalRequestForm = () => {
  const [formData, setFormData] = useState({
    fornecedorId: '',
    requesterName: '',
    requesterEmail: '',
    reason: '',
    description: '',
    confirmsOwnership: false
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [requestData, setRequestData] = useState(null);

  const REMOVAL_REASONS = [
    { value: 'FechouEmpresa', label: 'A empresa encerrou atividades' },
    { value: 'DadosIncorretos', label: 'Informações estão desatualizadas' },
    { value: 'PrivacidadeDados', label: 'Não quer receber orçamentos/contatos' },
    { value: 'Outro', label: 'Outro motivo' }
  ];

  const validateForm = () => {
    const newErrors = {};

    // Validação de fornecedorId
    if (!formData.fornecedorId.trim()) {
      newErrors.fornecedorId = 'ID do fornecedor é obrigatório';
    } else if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(formData.fornecedorId)) {
      newErrors.fornecedorId = 'ID do fornecedor inválido (deve ser um UUID válido)';
    }

    // Validação de requesterName
    if (!formData.requesterName.trim()) {
      newErrors.requesterName = 'Nome é obrigatório';
    } else if (formData.requesterName.length < 3 || formData.requesterName.length > 255) {
      newErrors.requesterName = 'Nome deve ter entre 3 e 255 caracteres';
    } else if (/\d/.test(formData.requesterName)) {
      newErrors.requesterName = 'Nome não pode conter números';
    }

    // Validação de requesterEmail
    if (!formData.requesterEmail.trim()) {
      newErrors.requesterEmail = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.requesterEmail)) {
      newErrors.requesterEmail = 'Email inválido';
    } else if (formData.requesterEmail.length > 254) {
      newErrors.requesterEmail = 'Email muito longo';
    }

    // Validação de reason
    if (!formData.reason) {
      newErrors.reason = 'Motivo é obrigatório';
    }

    // Validação de confirmsOwnership
    if (!formData.confirmsOwnership) {
      newErrors.confirmsOwnership = 'Você deve confirmar que é o proprietário';
    }

    // Validação de description
    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Descrição não pode exceder 1000 caracteres';
    }

    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    // Limpar erro do campo ao alterar
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);

    // Validar formulário
    const validationErrors = validateForm();
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/v1/privacy/request-removal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fornecedorId: formData.fornecedorId,
          requesterName: formData.requesterName,
          requesterEmail: formData.requesterEmail,
          reason: formData.reason,
          description: formData.description,
          confirmsOwnership: formData.confirmsOwnership
        }),
        signal: AbortSignal.timeout(10000)
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setServerError('Muitas requisições. Tente novamente em alguns minutos.');
        } else {
          setServerError(data.message || 'Erro ao enviar solicitação');
        }
        return;
      }

      // Sucesso
      setSuccess(true);
      setRequestData({
        requestId: data.requestId,
        protocolNumber: data.protocolNumber,
        email: formData.requesterEmail,
        estimatedDate: data.estimatedAnalysisDate
      });

      // Limpar formulário
      setFormData({
        fornecedorId: '',
        requesterName: '',
        requesterEmail: '',
        reason: '',
        description: '',
        confirmsOwnership: false
      });

    } catch (err) {
      if (err.name === 'AbortError') {
        setServerError('A requisição expirou. Verifique sua conexão e tente novamente.');
      } else {
        setServerError('Erro de conexão. Verifique sua internet e tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="removal-request-page">
        <div className="removal-request-success">
          <div className="success-icon">✅</div>
          <h2>Solicitação Enviada com Sucesso!</h2>
          <p>
            Sua solicitação de remoção de dados foi recebida e será analisada por nossa equipe.
          </p>

          <div className="success-details">
            <div className="detail-item">
              <strong>Protocolo:</strong>
              <code>{requestData.protocolNumber}</code>
            </div>
            <div className="detail-item">
              <strong>ID da Solicitação:</strong>
              <code>{requestData.requestId}</code>
            </div>
          </div>

          <p className="success-note">
            Você receberá um email de confirmação em <strong>{requestData.email}</strong> com
            atualizações sobre o status da sua solicitação.
          </p>

          <p className="success-timeline">
            ⏳ <strong>Prazo de análise:</strong> Até 15 dias úteis conforme Art. 18 da LGPD<br/>
            📅 <strong>Data estimada:</strong> {new Date(requestData.estimatedDate).toLocaleDateString('pt-BR')}
          </p>

          <div className="success-actions">
            <button
              className="btn btn--secondary"
              onClick={() => setSuccess(false)}
            >
              Fazer Nova Solicitação
            </button>
            <a href="/privacy/request-removal/status" className="btn btn--outline">
              Consultar Status
            </a>
          </div>

          <div className="success-info">
            <h4>Próximos Passos</h4>
            <ol>
              <li>Verifique seu email para a confirmação</li>
              <li>Nossa equipe analisará sua solicitação</li>
              <li>Você receberá notificação do resultado (aprovado ou rejeitado)</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="removal-request-page">
      <div className="removal-request-header">
        <h1>Solicitação de Remoção de Dados</h1>
        <p className="subtitle">
          Exercite seu direito à privacidade conforme a Lei Geral de Proteção de Dados (LGPD)
        </p>
      </div>

      <div className="removal-request-info">
        <h3>ℹ️ Informações Importantes</h3>
        <ul>
          <li>Esta solicitação é <strong>irreversível</strong> após aprovação</li>
          <li>Seus dados serão <strong>anonimizados ou removidos</strong> do sistema</li>
          <li>O processo pode levar até <strong>15 dias úteis</strong></li>
          <li>Você receberá uma notificação por email sobre o status</li>
          <li>Registros fiscais podem ser mantidos por obrigação legal</li>
        </ul>
      </div>

      {serverError && (
        <div className="alert alert--error">
          <strong>❌ Erro:</strong> {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="removal-request-form" noValidate>
        {/* Fornecedor ID */}
        <div className="form-group">
          <label htmlFor="fornecedorId">
            ID do Fornecedor *
            <span className="label-help">
              (Você pode encontrar no seu perfil ou emails recebidos)
            </span>
          </label>
          <input
            id="fornecedorId"
            name="fornecedorId"
            type="text"
            placeholder="550e8400-e29b-41d4-a716-446655440000"
            value={formData.fornecedorId}
            onChange={handleInputChange}
            className={errors.fornecedorId ? 'input-error' : ''}
            required
          />
          {errors.fornecedorId && (
            <span className="field-error">{errors.fornecedorId}</span>
          )}
        </div>

        {/* Requester Name */}
        <div className="form-group">
          <label htmlFor="requesterName">Seu Nome Completo *</label>
          <input
            id="requesterName"
            name="requesterName"
            type="text"
            placeholder="Digite seu nome completo"
            value={formData.requesterName}
            onChange={handleInputChange}
            className={errors.requesterName ? 'input-error' : ''}
            required
          />
          {errors.requesterName && (
            <span className="field-error">{errors.requesterName}</span>
          )}
        </div>

        {/* Requester Email */}
        <div className="form-group">
          <label htmlFor="requesterEmail">Seu Email *</label>
          <input
            id="requesterEmail"
            name="requesterEmail"
            type="email"
            placeholder="seu.email@exemplo.com"
            value={formData.requesterEmail}
            onChange={handleInputChange}
            className={errors.requesterEmail ? 'input-error' : ''}
            required
          />
          {errors.requesterEmail && (
            <span className="field-error">{errors.requesterEmail}</span>
          )}
          <span className="field-note">
            Enviaremos atualizações para este email
          </span>
        </div>

        {/* Reason */}
        <div className="form-group">
          <label htmlFor="reason">Motivo da Solicitação *</label>
          <select
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            className={errors.reason ? 'input-error' : ''}
            required
          >
            <option value="">Selecione um motivo</option>
            {REMOVAL_REASONS.map(r => (
              <option key={r.value} value={r.value}>
                {r.label}
              </option>
            ))}
          </select>
          {errors.reason && (
            <span className="field-error">{errors.reason}</span>
          )}
        </div>

        {/* Description */}
        <div className="form-group">
          <label htmlFor="description">
            Descrição Adicional
            <span className="label-help">
              (Opcional - máximo 1000 caracteres)
            </span>
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Descreva mais detalhes sobre sua solicitação (opcional)"
            value={formData.description}
            onChange={handleInputChange}
            maxLength={1000}
            rows={4}
            className={errors.description ? 'input-error' : ''}
          />
          <span className="field-note">
            {formData.description.length}/1000 caracteres
          </span>
          {errors.description && (
            <span className="field-error">{errors.description}</span>
          )}
        </div>

        {/* Confirms Ownership */}
        <div className="form-group form-group--checkbox">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="confirmsOwnership"
              checked={formData.confirmsOwnership}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
            <span>
              Confirmo que sou o <strong>proprietário legítimo</strong> deste perfil e 
              estou ciente de que esta ação é <strong>irreversível</strong> após aprovação.
              {errors.confirmsOwnership && (
                <span className="checkbox-error">{errors.confirmsOwnership}</span>
              )}
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn--danger btn--large"
            disabled={loading || !formData.confirmsOwnership}
            aria-disabled={loading || !formData.confirmsOwnership}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : (
              '🗑️ Solicitar Remoção de Dados'
            )}
          </button>
        </div>

        {/* Disclaimer */}
        <p className="form-disclaimer">
          * Campos obrigatórios. Seus dados serão tratados conforme nossa{' '}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">
            Política de Privacidade
          </a> e a{' '}
          <a
            href="http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lei Geral de Proteção de Dados (LGPD)
          </a>.
        </p>
      </form>
    </div>
  );
};
```

---

### 2. RemovalRequestStatus.jsx

**Localização:** `src/pages/Privacy/RemovalRequestStatus.jsx`

```jsx
import React, { useState } from 'react';
import './RemovalRequestStatus.css';

const STATUS_LABELS = {
  'Pending': { label: 'Aguardando Análise', icon: '⏳', color: '#ffc107' },
  'Approved': { label: 'Aprovada - Dados Removidos', icon: '✅', color: '#28a745' },
  'Rejected': { label: 'Rejeitada', icon: '❌', color: '#dc3545' },
  'Cancelled': { label: 'Cancelada', icon: '⏹️', color: '#6c757d' }
};

export const RemovalRequestStatus = () => {
  const [searchData, setSearchData] = useState({
    requestId: '',
    email: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchData({ ...searchData, [name]: value });
    setError(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearched(true);

    if (!searchData.requestId.trim() || !searchData.email.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch(
        `/api/v1/privacy/request-removal/status?id=${encodeURIComponent(searchData.requestId)}&email=${encodeURIComponent(searchData.email)}`,
        { signal: AbortSignal.timeout(10000) }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setError('Solicitação não encontrada. Verifique o protocolo e email.');
        } else {
          setError('Erro ao consultar status. Tente novamente.');
        }
        return;
      }

      const data = await response.json();
      setStatus(data);

    } catch (err) {
      setError(err.message || 'Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="removal-request-status-page">
      <div className="status-header">
        <h1>Consultar Status da Solicitação</h1>
        <p className="subtitle">
          Verifique o andamento de sua solicitação de remoção de dados
        </p>
      </div>

      {!status ? (
        <div className="status-search-container">
          <form onSubmit={handleSearch} className="status-search-form">
            <div className="form-group">
              <label htmlFor="requestId">
                Protocolo ou ID da Solicitação *
              </label>
              <input
                id="requestId"
                name="requestId"
                type="text"
                placeholder="LGP-2026-001234 ou 3fa85f64-5717-4562-b3fc-2c963f66afa6"
                value={searchData.requestId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                Email da Solicitação *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={searchData.email}
                onChange={handleInputChange}
                required
              />
              <span className="field-note">
                Deve ser o mesmo email usado na solicitação
              </span>
            </div>

            {error && searched && (
              <div className="alert alert--error">
                ❌ {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn--primary btn--large"
              disabled={loading}
            >
              {loading ? '⏳ Consultando...' : '🔍 Consultar Status'}
            </button>
          </form>

          <div className="search-help">
            <h4>Dica</h4>
            <p>
              O protocolo foi enviado por email após você fazer a solicitação.
              Procure por um email com assunto "Solicitação de Remoção de Dados Recebida".
            </p>
          </div>
        </div>
      ) : (
        <div className="status-result">
          <div className="status-badge" style={{ borderLeftColor: STATUS_LABELS[status.status].color }}>
            <div className="status-icon">{STATUS_LABELS[status.status].icon}</div>
            <div className="status-info">
              <h2>{STATUS_LABELS[status.status].label}</h2>
              <p className="protocol">Protocolo: {status.protocolNumber}</p>
            </div>
          </div>

          <div className="status-details">
            <div className="detail-item">
              <strong>ID da Solicitação:</strong>
              <code>{status.requestId}</code>
            </div>
            <div className="detail-item">
              <strong>Data de Criação:</strong>
              {new Date(status.createdAt).toLocaleDateString('pt-BR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            {status.updatedAt && (
              <div className="detail-item">
                <strong>Última Atualização:</strong>
                {new Date(status.updatedAt).toLocaleDateString('pt-BR')}
              </div>
            )}
            <div className="detail-item">
              <strong>Motivo:</strong>
              {status.reason}
            </div>
          </div>

          <div className="status-timeline">
            <h3>⏱️ Linha do Tempo</h3>
            {status.timeline && status.timeline.map((event, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-date">
                  {new Date(event.date).toLocaleDateString('pt-BR')}
                </div>
                <div className="timeline-description">
                  <strong>{event.description}</strong>
                  {event.details && <p>{event.details}</p>}
                </div>
              </div>
            ))}
          </div>

          {status.rejectionReason && (
            <div className="rejection-info alert alert--warning">
              <h4>Motivo da Rejeição</h4>
              <p><strong>{status.rejectionReason}</strong></p>
              {status.rejectionDetails && (
                <p>{status.rejectionDetails}</p>
              )}
            </div>
          )}

          {status.status === 'Approved' && (
            <div className="approval-info alert alert--success">
              <h4>✅ Dados Removidos com Sucesso</h4>
              <p>Seus dados pessoais foram removidos do sistema conforme LGPD.</p>
              <ul>
                <li>✅ Nome removido</li>
                <li>✅ Email removido</li>
                <li>✅ Telefone removido</li>
                <li>✅ Redes sociais removidas</li>
                <li>✅ Website removido</li>
              </ul>
              <p className="note">
                Nota: Registros fiscais (CNPJ/CPF) em formato anonimizado serão mantidos por 7 anos
                conforme obrigação legal.
              </p>
            </div>
          )}

          <div className="status-actions">
            <button
              className="btn btn--secondary"
              onClick={() => setStatus(null)}
            >
              Nova Consulta
            </button>
            <a href="/privacy/request-removal" className="btn btn--outline">
              Fazer Nova Solicitação
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
```

---

## Integração com API

### Endpoints Necessários

**1. Criar Solicitação (Público)**

```
POST /api/v1/privacy/request-removal

Request:
{
  "fornecedorId": "8e82eeae-8ede-45ce-8069-fc4b8c1ff580",
  "requesterName": "José Henrique Bortoleto",
  "requesterEmail": "contato@guianoivas.com",
  "reason": "Outro",
  "description": "Remova imediatamente",
  "confirmsOwnership": true
}

Response 200:
{
  "success": true,
  "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "protocolNumber": "LGP-2026-0001234",
  "status": "Pending",
  "message": "Solicitação criada com sucesso",
  "estimatedAnalysisDate": "2026-02-21T23:59:59Z"
}

Response 400:
{
  "success": false,
  "error": "Validation Error",
  "details": {
    "fornecedorId": ["Fornecedor não encontrado"]
  }
}
```

**2. Consultar Status (Público)**

```
GET /api/v1/privacy/request-removal/status
?id=LGP-2026-0001234&email=joao@example.com

Response 200:
{
  "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "protocolNumber": "LGP-2026-0001234",
  "status": "Pending",
  "createdAt": "2026-02-06T10:30:00Z",
  "updatedAt": "2026-02-06T10:30:00Z",
  "reason": "BUSINESS_CLOSURE",
  "timeline": [
    {
      "date": "2026-02-06T10:30:00Z",
      "description": "Solicitação recebida",
      "details": null
    }
  ],
  "rejectionReason": null,
  "approvedAt": null
}

Response 404:
{
  "error": "Not Found",
  "message": "Solicitação não encontrada"
}
```

**3. Listar Solicitações (Admin)**

```
GET /api/v1/admin/lgpd/removal-requests
?status=Pending&page=1&pageSize=20

Headers:
Authorization: Bearer {JWT_TOKEN}

Response 200:
{
  "data": [
    {
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "protocolNumber": "LGP-2026-0001234",
      "fornecedorId": "550e8400-e29b-41d4-a716-446655440000",
      "fornecedorName": "João Silva",
      "requesterName": "João Silva",
      "requesterEmail": "joao@example.com",
      "reason": "BUSINESS_CLOSURE",
      "status": "Pending",
      "createdAt": "2026-02-06T10:30:00Z",
      "daysRemaining": 9
    }
  ],
  "total": 45,
  "page": 1,
  "pageSize": 20,
  "totalPages": 3
}
```

**4. Aprovar Solicitação (Admin)**

```
PUT /api/v1/admin/lgpd/removal-requests/{requestId}/approve

Headers:
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

Body:
{
  "adminNotes": "Identidade verificada",
  "confirmIrreversible": true
}

Response 200:
{
  "success": true,
  "message": "Solicitação aprovada",
  "status": "Approved",
  "approvedAt": "2026-02-10T14:30:00Z"
}
```

**5. Rejeitar Solicitação (Admin)**

```
PUT /api/v1/admin/lgpd/removal-requests/{requestId}/reject

Headers:
Authorization: Bearer {JWT_TOKEN}
Content-Type: application/json

Body:
{
  "rejectionReason": "OWNERSHIP_NOT_VERIFIED",
  "rejectionDetails": "Email não corresponde",
  "adminId": "admin-123"
}

Response 200:
{
  "success": true,
  "message": "Solicitação rejeitada",
  "status": "Rejected",
  "rejectedAt": "2026-02-10T14:30:00Z"
}
```

---

## Guia de Estilos CSS

### RemovalRequestForm.css

```css
/* Container Principal */
.removal-request-page {
  max-width: 700px;
  margin: 40px auto;
  padding: 0 20px;
  min-height: calc(100vh - 200px);
}

/* Header */
.removal-request-header {
  text-align: center;
  margin-bottom: 40px;
}

.removal-request-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #222;
  margin: 0 0 12px 0;
}

.removal-request-header .subtitle {
  color: #666;
  font-size: 16px;
  margin: 0;
}

/* Info Box */
.removal-request-info {
  background: #fff3cd;
  border: 1px solid #ffeaa7;
  border-left: 4px solid #f39c12;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 30px;
}

.removal-request-info h3 {
  margin: 0 0 12px 0;
  font-size: 16px;
  color: #856404;
}

.removal-request-info ul {
  margin: 0;
  padding-left: 20px;
  color: #856404;
}

.removal-request-info li {
  margin-bottom: 8px;
  line-height: 1.6;
}

/* Form */
.removal-request-form {
  background: #f9f9f9;
  padding: 30px;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

/* Form Groups */
.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-group input[type="text"]:focus,
.form-group input[type="email"]:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.form-group input.input-error,
.form-group select.input-error,
.form-group textarea.input-error {
  border-color: #dc3545;
}

/* Labels Help */
.label-help {
  display: block;
  font-size: 12px;
  font-weight: normal;
  color: #666;
  margin-top: 4px;
}

/* Field Notes */
.field-note {
  display: block;
  font-size: 12px;
  color: #666;
  margin-top: 6px;
}

.field-error {
  display: block;
  font-size: 12px;
  color: #dc3545;
  margin-top: 4px;
}

/* Checkbox */
.form-group--checkbox {
  background: #f0f0f0;
  padding: 16px;
  border-radius: 6px;
  border: 2px solid #ddd;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-weight: normal;
}

.checkbox-label input[type="checkbox"] {
  width: 20px;
  height: 20px;
  margin-top: 2px;
  cursor: pointer;
  flex-shrink: 0;
}

.checkbox-label span {
  flex: 1;
  line-height: 1.6;
  font-size: 14px;
}

.checkbox-error {
  display: block;
  color: #dc3545;
  font-size: 12px;
  margin-top: 8px;
}

/* Buttons */
.btn {
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn--primary {
  background: #007bff;
  color: white;
}

.btn--primary:hover:not(:disabled) {
  background: #0056b3;
}

.btn--danger {
  background: #dc3545;
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background: #c82333;
}

.btn--secondary {
  background: #6c757d;
  color: white;
}

.btn--secondary:hover:not(:disabled) {
  background: #545b62;
}

.btn--outline {
  background: transparent;
  color: #007bff;
  border: 2px solid #007bff;
}

.btn--outline:hover:not(:disabled) {
  background: #f0f7ff;
}

.btn--large {
  padding: 16px 32px;
  font-size: 18px;
}

/* Form Actions */
.form-actions {
  margin-bottom: 20px;
}

/* Disclaimer */
.form-disclaimer {
  font-size: 12px;
  color: #666;
  margin-top: 20px;
}

.form-disclaimer a {
  color: #007bff;
  text-decoration: none;
}

.form-disclaimer a:hover {
  text-decoration: underline;
}

/* Success State */
.removal-request-success {
  background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
  border: 2px solid #c3e6cb;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
}

.success-icon {
  font-size: 64px;
  margin-bottom: 20px;
  display: inline-block;
  animation: bounce 0.6s ease-in-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.removal-request-success h2 {
  color: #155724;
  margin-bottom: 12px;
  font-size: 24px;
}

.removal-request-success p {
  color: #155724;
  line-height: 1.6;
  margin-bottom: 16px;
}

.success-details {
  background: white;
  border: 1px solid #c3e6cb;
  padding: 20px;
  border-radius: 6px;
  margin: 20px 0;
}

.detail-item {
  margin-bottom: 12px;
  text-align: left;
}

.detail-item strong {
  display: block;
  color: #155724;
  margin-bottom: 4px;
}

.detail-item code {
  background: #f0f0f0;
  padding: 4px 8px;
  border-radius: 3px;
  font-family: monospace;
  font-size: 12px;
  color: #333;
  word-break: break-all;
}

.success-timeline {
  font-size: 14px;
  color: #155724;
  background: rgba(255, 255, 255, 0.8);
  padding: 16px;
  border-radius: 4px;
  margin: 20px 0;
  line-height: 1.8;
}

.success-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-top: 24px;
  flex-wrap: wrap;
}

.success-info {
  background: white;
  border-left: 4px solid #155724;
  padding: 16px;
  border-radius: 4px;
  margin-top: 20px;
  text-align: left;
}

.success-info h4 {
  margin: 0 0 12px 0;
  color: #155724;
}

.success-info ol {
  margin: 0;
  padding-left: 20px;
  color: #155724;
}

.success-info li {
  margin-bottom: 8px;
}

/* Alerts */
.alert {
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}

.alert--error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert--warning {
  background: #fff3cd;
  color: #856404;
  border: 1px solid #ffeaa7;
}

.alert--success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

/* Spinner */
.spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.6s linear infinite;
  margin-right: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 640px) {
  .removal-request-page {
    margin: 20px auto;
    padding: 0 16px;
  }

  .removal-request-header h1 {
    font-size: 24px;
  }

  .removal-request-form {
    padding: 20px;
  }

  .success-actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
```

---

## Testes e Validação

### Checklist de Testes

**[ ] Funcionalidade Básica**
- [ ] Página carrega sem autenticação
- [ ] Formulário renderiza corretamente
- [ ] Campos obrigatórios marcados com *
- [ ] Checkbox de confirmação funciona

**[ ] Validações Frontend**
- [ ] Valida UUID do fornecedor
- [ ] Valida email em tempo real
- [ ] Valida nome (sem números)
- [ ] Desabilita botão se checkbox não marcado
- [ ] Mostra mensagens de erro específicas

**[ ] Envio**
- [ ] Envia POST para /api/v1/privacy/request-removal
- [ ] Rate limiting funciona (10/hora)
- [ ] Timeout de 10s funciona
- [ ] Response 200 mostra sucesso
- [ ] Response 4xx mostra erro específico

**[ ] Email**
- [ ] Email confirmação enviado
- [ ] Contém protocolo e ID
- [ ] Link para consultar status funciona
- [ ] Endereço correto

**[ ] Página de Status**
- [ ] Carrega sem autenticação
- [ ] Consulta por protocolo + email
- [ ] Exibe status correto
- [ ] Timeline aparece
- [ ] Botão voltar funciona

**[ ] Admin Panel**
- [ ] Requer autenticação
- [ ] Requer role Admin
- [ ] Lista solicitações Pending
- [ ] Filtro por status funciona
- [ ] Modal de aprovação funciona
- [ ] Modal de rejeição funciona
- [ ] Email de aprovação/rejeição enviado

**[ ] Anonimização**
- [ ] Dados pessoais removidos
- [ ] Dados fiscais mantidos
- [ ] 7 anos de retenção
- [ ] Log de auditoria criado

---

## FAQ e Troubleshooting

**P: O formulário não está enviando?**
R: Verifique:
1. UUID do fornecedor está no formato correto (550e8400-e29b-41d4-a716-446655440000)
2. Email é válido
3. Checkbox de confirmação está marcado
4. Conexão com internet
5. Abra DevTools (F12) e verifique erros

**P: Qual é o prazo máximo para análise?**
R: 15 dias úteis conforme Art. 18 da LGPD

**P: Os dados são realmente removidos?**
R: Sim, dados pessoais (nome, email, telefone, sociais) são anonimizados imediatamente após aprovação. Dados fiscais são mantidos por 7 anos conforme obrigação legal.

**P: Posso cancelar minha solicitação?**
R: Sim, enquanto estiver no status "Pending". Após aprovação, é irreversível.

**P: Como vejo o status da minha solicitação?**
R: Acesse /privacy/request-removal/status e insira o protocolo + email

---

## Checklist de Implementação

**Frontend - Portal Público**

- [ ] **Página de Remoção**
  - [ ] Criar `/privacy/request-removal` route
  - [ ] Implementar RemovalRequestForm.jsx
  - [ ] Aplicar CSS do formulário
  - [ ] Integrar com API

- [ ] **Página de Status**
  - [ ] Criar `/privacy/request-removal/status` route
  - [ ] Implementar RemovalRequestStatus.jsx
  - [ ] Validação de consulta
  - [ ] Exibição de timeline

- [ ] **Links e Navegação**
  - [ ] Adicionar link no footer
  - [ ] Adicionar link na Política de Privacidade
  - [ ] Link na página de conta (se existir)

- [ ] **Validações**
  - [ ] UUID validation
  - [ ] Email validation
  - [ ] Checkbox obrigatório
  - [ ] Mensagens de erro

- [ ] **Testes**
  - [ ] Teste envio com dados válidos
  - [ ] Teste com dados inválidos
  - [ ] Teste rate limiting
  - [ ] Teste email confirmação
  - [ ] Teste página de status

**Backend - API**

- [ ] Implementar `POST /api/v1/privacy/request-removal`
- [ ] Implementar `GET /api/v1/privacy/request-removal/status`
- [ ] Implementar `GET /api/v1/admin/lgpd/removal-requests`
- [ ] Implementar `PUT /api/v1/admin/lgpd/removal-requests/{id}/approve`
- [ ] Implementar `PUT /api/v1/admin/lgpd/removal-requests/{id}/reject`
- [ ] Criar tabela RemovalRequests
- [ ] Criar tabela LGPDAuditLog
- [ ] Criar procedure de anonimização
- [ ] Configurar Email Service
- [ ] Rate limiting (10/hora por IP)

**Admin Panel**

- [ ] Criar `/admin/lgpd/removal-requests` route
- [ ] Listar solicitações pendentes
- [ ] Filtro por status
- [ ] Modal de detalhes
- [ ] Botão Aprovar com confirmação
- [ ] Botão Rejeitar com motivo
- [ ] Dashboard de estatísticas

---

## Contato e Suporte

**Email:** privacy@guianoivas.com.br  
**Telefone:** 0800-123-4567  
**Documentação:** https://docs.guianoivas.com.br/lgpd  
**Lei LGPD Completa:** http://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm

---

**Documento Preparado Para:**  
✅ Implementação Frontend (React)  
✅ Integração com API  
✅ Testes e QA  
✅ Deploy em Produção  

**Versão:** 2.0  
**Data:** Fevereiro 2026  
**Status:** ✅ PRONTO PARA IMPLEMENTAÇÃO
