# Especificação: Reivindicação de Perfil (Profile Claim)

**Versão:** 1.0  
**Data:** 6 de fevereiro de 2026  
**Status:** ✅ Implementado no Backend  
**Destinatário:** Dev Frontend Público

---

## 📋 Visão Geral

A funcionalidade de **reivindicação de perfil** permite que proprietários de negócios cadastrados no sistema (perfis "Zombie" ou de qualquer tier) reivindiquem seus perfis, criem contas de acesso e obtenham benefícios do **Plano Free**.

Este documento especifica a implementação **completa** da UI/UX frontend para garantir conformidade 100% com os requisitos.

---

## 🎯 Objetivo

Permitir que um fornecedor:
1. Localize seu perfil no portal público
2. Verifique que não foi reivindicado (`IsClaimed = false`)
3. Preencha um formulário com seus dados pessoais
4. **Leia e assine digitalmente os termos de adesão**
5. Crie uma conta de acesso
6. Receba tokens JWT e acesso ao painel do fornecedor
7. Tenha toda a ação auditada para conformidade jurídica

---

## 🔐 Estados do Perfil

### Estado: Zombie (Não Reivindicado)
```
PlanLevel: -2
IsClaimed: false
```
- ✅ Perfil criado por admin
- ✅ Visível no portal público
- ✅ Leads vão para admin (não para fornecedor)
- ✅ **Pode ser reivindicado**
- ✅ Sem acesso ao painel

### Estado: Free (Reivindicado)
```
PlanLevel: 0
IsClaimed: true
ClaimedAt: DateTime
ClaimedByUserId: Guid
```
- ✅ Propriedade comprovada pelo fornecedor
- ✅ Usuário criado com email/senha
- ✅ 3 leads vitalícios
- ✅ Acesso ao painel
- ✅ Pode gerenciar fotos e informações

---

## 📱 UI/UX - Tela de Reivindicação

### 1. **Página de Detalhes do Fornecedor (Portal Público)**

**Local:** `/fornecedor/{id}`

**Elementos Obrigatórios:**

```html
<!-- Se IsClaimed = false, mostrar este botão/link -->
<div class="claim-section">
  <h3>🎉 Você é o proprietário deste negócio?</h3>
  <p>Reivindique seu perfil para obter acesso ao painel e gerenciar suas informações.</p>
  
  <!-- Botão para abrir modal/página de claim -->
  <button class="btn-primary" onclick="openClaimModal()">
    Reivindicar Perfil Agora
  </button>
  
  <!-- Benefícios do plano Free -->
  <div class="benefits-card">
    <h4>✅ Benefícios do Plano Free:</h4>
    <ul>
      <li>3 leads completamente grátis (vitalício)</li>
      <li>Acesso ao painel de gerenciamento</li>
      <li>Atualizar fotos e informações</li>
      <li>Gerenciar contatos de leads</li>
      <li>Ver estatísticas de visualizações</li>
    </ul>
  </div>
</div>

<!-- Se IsClaimed = true, mostrar mensagem diferente -->
<div class="claimed-badge">
  ✅ Este perfil foi reivindicado e está sendo gerenciado pelo proprietário.
</div>
```

**Responsividade:**
- ✅ Mobile: Botão full-width, texto com tamanho legível
- ✅ Desktop: Layout lado a lado, botão 200px
- ✅ Tablet: Layout fluido, centralizado

---

### 2. **Modal/Page: Formulário de Reivindicação**

**Localização:** Modal ou página `/reivindicar/{fornecedorId}`

#### **Estrutura do Formulário**

```html
<form id="claimForm" class="claim-form">
  
  <!-- SEÇÃO 1: Informações Pessoais -->
  <fieldset class="form-section">
    <legend>Seus Dados Pessoais</legend>
    
    <!-- Email -->
    <div class="form-group">
      <label for="email" class="required">Email</label>
      <input 
        type="email" 
        id="email" 
        name="email" 
        required 
        placeholder="seu@email.com"
        maxlength="255"
        aria-describedby="emailHelp"
      />
      <small id="emailHelp">Será usado para acessar o painel e receber leads</small>
      <span class="error-message" id="emailError"></span>
    </div>

    <!-- Senha -->
    <div class="form-group">
      <label for="password" class="required">Senha</label>
      <input 
        type="password" 
        id="password" 
        name="password" 
        required 
        placeholder="Mínimo 8 caracteres"
        minlength="8"
        aria-describedby="passwordHelp"
      />
      <small id="passwordHelp">
        Deve conter pelo menos 8 caracteres (recomendamos incluir números e símbolos)
      </small>
      <span class="error-message" id="passwordError"></span>
      
      <!-- Indicador de força de senha -->
      <div class="password-strength">
        <div class="strength-bar" id="strengthBar"></div>
        <span class="strength-text" id="strengthText">Fraca</span>
      </div>
    </div>

    <!-- Nome Completo -->
    <div class="form-group">
      <label for="fullName" class="required">Nome Completo</label>
      <input 
        type="text" 
        id="fullName" 
        name="fullName" 
        required 
        placeholder="João Silva"
        minlength="3"
        maxlength="200"
      />
      <span class="error-message" id="fullNameError"></span>
    </div>

    <!-- Telefone -->
    <div class="form-group">
      <label for="phone" class="required">Telefone</label>
      <input 
        type="tel" 
        id="phone" 
        name="phone" 
        required 
        placeholder="(11) 98765-4321"
        pattern="^\d{10,11}$"
        aria-describedby="phoneHelp"
        maxlength="11"
      />
      <small id="phoneHelp">DDD + número (10 ou 11 dígitos)</small>
      <span class="error-message" id="phoneError"></span>
    </div>
  </fieldset>

  <!-- SEÇÃO 2: Termos de Adesão -->
  <fieldset class="form-section terms-section">
    <legend>Termos de Adesão</legend>
    
    <!-- Botão para abrir/baixar termo -->
    <div class="term-actions">
      <button type="button" class="btn-secondary" onclick="viewTermModal()">
        📄 Ler Termo Completo
      </button>
      <button type="button" class="btn-secondary" onclick="downloadTerm()">
        ⬇️ Baixar PDF
      </button>
    </div>

    <!-- Exibição resumida do termo (primeiros 500 caracteres) -->
    <div class="term-preview">
      <h4>Resumo do Termo:</h4>
      <div id="termPreview" class="term-content">
        <!-- Conteúdo carregado via API GET /api/v1/contratos/termo-adesao -->
      </div>
      <p class="term-truncated">... [Continue lendo o termo completo]</p>
    </div>

    <!-- Campo de Aceitação -->
    <div class="form-group checkbox-group">
      <input 
        type="checkbox" 
        id="acceptTerms" 
        name="acceptTerms" 
        required 
        aria-describedby="acceptTermsHelp"
      />
      <label for="acceptTerms" id="acceptTermsHelp" class="required">
        Li e concordo com os <strong>Termos de Adesão</strong> do Guia Noivas
      </label>
      <span class="error-message" id="acceptTermsError"></span>
    </div>

    <!-- Campo oculto para armazenar termo hash -->
    <input type="hidden" id="termoHash" name="termoHash" />
    <input type="hidden" id="dataAceite" name="dataAceite" />
  </fieldset>

  <!-- SEÇÃO 3: Dados do Formulário (ocultos) -->
  <input type="hidden" id="fornecedorId" name="fornecedorId" />

  <!-- SEÇÃO 4: Botões de Ação -->
  <div class="form-actions">
    <button type="button" class="btn-secondary" onclick="closeClaimModal()">
      Cancelar
    </button>
    <button 
      type="submit" 
      class="btn-primary" 
      id="submitBtn"
      aria-busy="false"
    >
      🔒 Reivindicar Perfil
    </button>
  </div>

  <!-- Mensagem de conformidade LGPD -->
  <div class="lgpd-notice">
    <p>
      <strong>🔒 Privacidade:</strong> Seus dados são criptografados e processados conforme 
      nossa <a href="/privacy-policy" target="_blank">Política de Privacidade</a> 
      e LGPD Brasileira.
    </p>
  </div>

</form>
```

---

## 🔄 Fluxo de Funcionamento Frontend

### **1. Carregar Termo ao Abrir o Modal**

```javascript
// GET /api/v1/contratos/termo-adesao
// Resposta:
{
  "id": "uuid",
  "versao": "1.0",
  "conteudoHtml": "<h1>Termos de Adesão...</h1>",
  "dataVigencia": "2026-02-01T00:00:00Z",
  "conteudoTexto": "Texto completo para hash SHA-256"
}
```

**Implementação:**
```javascript
async function loadTermAndComputeHash() {
  try {
    const response = await fetch('/api/v1/contratos/termo-adesao');
    const termo = await response.json();
    
    // Exibir resumo
    document.getElementById('termPreview').innerHTML = 
      termo.conteudoHtml.substring(0, 500) + '...';
    
    // Calcular hash SHA-256 do conteúdo texto completo
    const termoHash = await sha256(termo.conteudoTexto);
    document.getElementById('termoHash').value = termoHash;
    
  } catch (error) {
    showError('Erro ao carregar termos de adesão');
    disableSubmitButton();
  }
}
```

### **2. Validações em Tempo Real**

```javascript
// Email validation
document.getElementById('email').addEventListener('blur', (e) => {
  const email = e.target.value;
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    showFieldError('email', 'Email inválido');
  } else {
    clearFieldError('email');
  }
});

// Telefone validation
document.getElementById('phone').addEventListener('input', (e) => {
  e.target.value = e.target.value.replace(/\D/g, '').slice(0, 11);
});

// Senha strength indicator
document.getElementById('password').addEventListener('input', (e) => {
  const strength = calculatePasswordStrength(e.target.value);
  updateStrengthBar(strength);
});

// Checkbox de termos
document.getElementById('acceptTerms').addEventListener('change', (e) => {
  document.getElementById('submitBtn').disabled = !e.target.checked;
});
```

### **3. Submissão do Formulário**

```javascript
document.getElementById('claimForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitBtn');
  submitBtn.disabled = true;
  submitBtn.setAttribute('aria-busy', 'true');
  
  try {
    // Validação final
    if (!validateForm()) {
      return;
    }
    
    // Construir payload
    const payload = {
      email: document.getElementById('email').value,
      password: document.getElementById('password').value,
      fullName: document.getElementById('fullName').value,
      phone: document.getElementById('phone').value.replace(/\D/g, ''),
      termoHash: document.getElementById('termoHash').value,
      aceitaTermos: true,
      dataAceite: new Date().toISOString()
    };
    
    // Enviar para backend
    const response = await fetch(
      `/api/v1/fornecedores/${fornecedorId}/claim`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      }
    );
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Erro ao reivindicar perfil');
    }
    
    const result = await response.json();
    
    // Sucesso
    showSuccessModal(result);
    
    // Armazenar tokens
    localStorage.setItem('accessToken', result.accessToken);
    localStorage.setItem('refreshToken', result.refreshToken);
    
    // Redirecionar para painel do fornecedor após 2 segundos
    setTimeout(() => {
      window.location.href = '/supplier-panel';
    }, 2000);
    
  } catch (error) {
    showError(error.message);
  } finally {
    submitBtn.disabled = false;
    submitBtn.removeAttribute('aria-busy');
  }
});
```

---

## 📊 Validações Obrigatórias

### **Email**
- ✅ Formato válido de email
- ✅ Máximo 255 caracteres
- ✅ Mensagem erro: "Email inválido"

### **Senha**
- ✅ Mínimo 8 caracteres
- ✅ Recomendação: incluir números e símbolos
- ✅ Mostrar indicador de força
- ✅ Opção "mostrar senha" (toggle)
- ✅ Mensagem erro: "Senha deve ter no mínimo 8 caracteres"

### **Nome Completo**
- ✅ Mínimo 3 caracteres
- ✅ Máximo 200 caracteres
- ✅ Mensagem erro: "Nome deve ter entre 3 e 200 caracteres"

### **Telefone**
- ✅ Apenas dígitos (10 ou 11)
- ✅ Formato: (XX) 9XXXX-XXXX ou XXXXXXXXXXX
- ✅ Auto-formatar enquanto digita
- ✅ Mensagem erro: "Telefone deve ter 10 ou 11 dígitos (DDD + número)"

### **Termos**
- ✅ Checkbox obrigatório
- ✅ Botão submit desabilitado até aceitar
- ✅ Hash SHA-256 do termo completo obrigatório
- ✅ Data de aceite em ISO 8601
- ✅ Mensagem erro: "Você deve aceitar os termos de adesão"

---

## 🎨 Estilos CSS - Exemplo Base

```css
/* Claim Form Styles */
.claim-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
  margin: 2rem 0;
}

.claim-section h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.btn-primary {
  background-color: #667eea;
  color: white;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #5568d3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  background-color: #ccc;
  cursor: not-allowed;
  transform: none;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.form-group label.required::after {
  content: " *";
  color: #e74c3c;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-group input.error {
  border-color: #e74c3c;
}

.error-message {
  display: block;
  color: #e74c3c;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.password-strength {
  margin-top: 0.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}

.strength-bar {
  flex: 1;
  height: 6px;
  background: #ecf0f1;
  border-radius: 3px;
  overflow: hidden;
}

.strength-bar.weak { background: #e74c3c; width: 30%; }
.strength-bar.fair { background: #f39c12; width: 60%; }
.strength-bar.good { background: #3498db; width: 80%; }
.strength-bar.strong { background: #27ae60; width: 100%; }

.terms-section {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.term-preview {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  border: 1px solid #ddd;
  margin: 1rem 0;
}

.term-content {
  font-size: 0.875rem;
  line-height: 1.5;
  color: #555;
}

.checkbox-group {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-top: 0.25rem;
}

.checkbox-group label {
  margin: 0;
  font-weight: normal;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.lgpd-notice {
  background: #e8f4f8;
  border-left: 4px solid #3498db;
  padding: 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  margin-top: 1.5rem;
}

.lgpd-notice a {
  color: #2980b9;
  text-decoration: none;
}

.lgpd-notice a:hover {
  text-decoration: underline;
}

/* Claimed Badge */
.claimed-badge {
  background: #d4edda;
  color: #155724;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #c3e6cb;
  margin: 1rem 0;
  text-align: center;
  font-weight: 600;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .claim-section {
    padding: 1rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .term-actions {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .term-actions button {
    width: 100%;
  }
}
```

---

## 🔌 Integração com Modal (Exemplo com Bootstrap)

```html
<!-- Modal -->
<div class="modal fade" id="claimProfileModal" tabindex="-1">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">🎉 Reivindicar Seu Perfil</h5>
        <button type="button" class="close" data-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <!-- Formulário acima -->
      </div>
    </div>
  </div>
</div>

<!-- Sucesso Modal -->
<div class="modal fade" id="claimSuccessModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-0">
        <button type="button" class="close" data-dismiss="modal"></button>
      </div>
      <div class="modal-body text-center">
        <h2>✅ Perfil Reivindicado com Sucesso!</h2>
        <p>Você será redirecionado para o painel em <span id="countdown">3</span>s...</p>
        <div class="spinner-border" role="status">
          <span class="sr-only">Carregando...</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

---

## 🔌 Endpoints & API

### **1. GET /api/v1/contratos/termo-adesao**

**Descrição:** Obter o termo de adesão completo para exibição e cálculo de hash

**Método:** GET  
**Autenticação:** ❌ Não requerida  
**Rate Limit:** 100 requisições/min por IP

#### **Response: 200 OK**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "versao": "1.0",
  "dataVigencia": "2026-02-01T00:00:00Z",
  "conteudoTexto": "Termos de Adesão ao Guia Noivas\n\n1. Aceitação de Termos\nAo aceitar estes termos, você concorda com todas as cláusulas e condições...\n\n2. Direitos e Responsabilidades\n...",
  "conteudoHtml": "<h1>Termos de Adesão ao Guia Noivas</h1><p>1. Aceitação de Termos...</p>"
}
```

**Campos Retornados:**
- `id` (uuid): Identificador único do termo
- `versao` (string): Versão do termo (ex: "1.0")
- `dataVigencia` (ISO 8601): Data de início da vigência
- `conteudoTexto` (string): Texto completo para cálculo de hash SHA-256
- `conteudoHtml` (string): HTML formatado para exibição

#### **Exemplo de Uso:**

```javascript
async function fetchTermo() {
  const response = await fetch('/api/v1/contratos/termo-adesao', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Erro ao carregar termo');
  }
  
  return response.json();
}
```

---

### **2. POST /api/v1/fornecedores/{id}/claim**

**Descrição:** Reivindicar um perfil e criar conta de acesso do fornecedor

**Método:** POST  
**Autenticação:** ❌ Não requerida (endpoint público)  
**Content-Type:** application/json  
**Rate Limit:** 5 requisições/min por IP (anti-brute force)  
**Path Parameters:**
- `id` (uuid, required): ID do fornecedor a reivindicar

#### **Request Body**

```json
{
  "email": "joao.silva@business.com",
  "password": "SecurePass123!",
  "fullName": "João Silva Santos",
  "phone": "11987654321",
  "termoHash": "94489d7ee250ca7d979468ec17f7bb14dd784ae0e7ec1c45daf824d32e8fb387",
  "aceitaTermos": true,
  "dataAceite": "2026-02-06T18:30:45.123Z"
}
```

**Validações de Entrada:**

| Campo | Tipo | Validação | Erro |
|-------|------|-----------|------|
| email | string | Email válido, max 255 chars | "Email inválido" |
| password | string | Min 8 chars | "Senha deve ter no mínimo 8 caracteres" |
| fullName | string | Min 3, Max 200 chars | "Nome deve ter entre 3 e 200 caracteres" |
| phone | string | Regex `^\d{10,11}$` | "Telefone deve ter 10 ou 11 dígitos" |
| termoHash | string | Exatamente 64 chars (SHA-256) | "Hash do termo inválido" |
| aceitaTermos | boolean | Deve ser `true` | "Você deve aceitar os termos" |
| dataAceite | string (ISO 8601) | Data válida, não futuro | "Data de aceite inválida" |

#### **Response: 200 OK - Sucesso**

```json
{
  "message": "Perfil reivindicado com sucesso!",
  "userId": "660e8400-e29b-41d4-a716-446655440111",
  "fornecedorId": "550e8400-e29b-41d4-a716-446655440000",
  "email": "joao.silva@business.com",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAxMTEiLCJlbWFpbCI6Impvc2FAYmlzaW5lc3MuY29tIiwicm9sZXMiOlsiRm9ybmVjZWRvciJdLCJpYXQiOjE3NDQxMjMwNDUsImV4cCI6MTc0NDEyNjY0NX0.signature",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjBlODQwMC1lMjliLTQxZDQtYTcxNi00NDY2NTU0NDAxMTEiLCJpYXQiOjE3NDQxMjMwNDUsImV4cCI6MTc0NDIwOTQ0NX0.signature",
  "termoVersao": "1.0",
  "claimedAt": "2026-02-06T18:30:45.123Z",
  "planLevel": 0,
  "leadLimit": 3
}
```

**Campos Retornados:**
- `message` (string): Mensagem de confirmação
- `userId` (uuid): ID do usuário criado
- `fornecedorId` (uuid): ID do fornecedor reivindicado
- `email` (string): Email do usuário
- `accessToken` (JWT): Token de acesso (válido por 1 hora)
- `refreshToken` (JWT): Token de refresh (válido por 24 horas)
- `termoVersao` (string): Versão do termo aceito
- `claimedAt` (ISO 8601): Timestamp da reivindicação
- `planLevel` (integer): Nível do plano (0 = Free)
- `leadLimit` (integer): Quantidade de leads inclusos (3 para Free)

#### **Response: 400 Bad Request - Dados Inválidos**

```json
{
  "error": "Email já está em uso",
  "errors": [
    {
      "field": "email",
      "message": "Este email já está cadastrado no sistema"
    }
  ]
}
```

Ou com múltiplos erros:

```json
{
  "error": "Validação falhou",
  "errors": [
    {
      "field": "password",
      "message": "Senha deve ter no mínimo 8 caracteres"
    },
    {
      "field": "phone",
      "message": "Telefone deve ter 10 ou 11 dígitos"
    },
    {
      "field": "termoHash",
      "message": "Hash do termo inválido"
    }
  ]
}
```

**Possíveis Mensagens de Erro:**
- `"Email inválido"` - Formato de email incorreto
- `"Este email já está cadastrado"` - Email duplicado
- `"Senha deve ter no mínimo 8 caracteres"` - Senha muito curta
- `"Telefone deve ter 10 ou 11 dígitos"` - Formato de telefone inválido
- `"Hash do termo inválido"` - Hash não corresponde ao termo vigente
- `"Você deve aceitar os termos"` - Campo aceitaTermos = false
- `"Data de aceite inválida"` - Data no futuro ou inválida

#### **Response: 404 Not Found**

```json
{
  "error": "Fornecedor não encontrado"
}
```

#### **Response: 409 Conflict - Conflito**

```json
{
  "error": "Este perfil já foi reivindicado"
}
```

Ou:

```json
{
  "error": "Este email já está em uso por outro fornecedor"
}
```

#### **Response: 429 Too Many Requests - Rate Limit**

```json
{
  "error": "Muitas tentativas. Aguarde alguns minutos e tente novamente.",
  "retryAfter": 60
}
```

#### **Response: 500 Internal Server Error**

```json
{
  "error": "Erro ao processar reivindicação. Tente novamente mais tarde."
}
```

#### **Exemplo de Uso Completo:**

```javascript
async function claimProfile(fornecedorId, formData, termoHash) {
  try {
    // 1. Construir payload
    const payload = {
      email: formData.email,
      password: formData.password,
      fullName: formData.fullName,
      phone: formData.phone.replace(/\D/g, ''), // Remove caracteres não numéricos
      termoHash: termoHash,
      aceitaTermos: true,
      dataAceite: new Date().toISOString()
    };

    // 2. Enviar requisição
    const response = await fetch(
      `/api/v1/fornecedores/${fornecedorId}/claim`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    // 3. Tratar resposta
    const data = await response.json();

    if (!response.ok) {
      // Erro
      if (data.errors) {
        // Múltiplos erros de validação
        data.errors.forEach(err => {
          console.error(`${err.field}: ${err.message}`);
          showFieldError(err.field, err.message);
        });
      } else {
        // Erro genérico
        console.error(data.error);
        showError(data.error);
      }
      return null;
    }

    // 4. Sucesso
    console.log('Perfil reivindicado com sucesso!');
    
    // 5. Armazenar tokens
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('userId', data.userId);
    localStorage.setItem('fornecedorId', data.fornecedorId);

    return data;

  } catch (error) {
    console.error('Erro ao reivindicar perfil:', error);
    showError('Erro ao processar solicitação. Tente novamente.');
    return null;
  }
}
```

---

### **3. GET /api/v1/fornecedores/{id}**

**Descrição:** Obter informações públicas de um fornecedor (para verificar se pode ser reivindicado)

**Método:** GET  
**Autenticação:** ❌ Não requerida  
**Rate Limit:** 200 requisições/min por IP

#### **Response: 200 OK**

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Buffet Casamentos Silva",
  "email": "contato@buffetsilva.com",
  "telefone": "11987654321",
  "planLevel": -2,
  "isClaimed": false,
  "dataCriacao": "2025-06-15T10:30:00Z",
  "descricao": "Buffet completo para casamentos",
  "fotos": [
    {
      "id": "photo1",
      "url": "https://cdn.guianoivas.com/buffet-silva-1.jpg",
      "ordem": 1
    }
  ],
  "cidade": "São Paulo",
  "estado": "SP",
  "categoriaPrincipal": "Buffet"
}
```

**Campos Públicos:**
- `id` (uuid): ID do fornecedor
- `nome` (string): Nome do negócio
- `planLevel` (integer): Nível do plano (-2 = Zombie)
- `isClaimed` (boolean): Se foi reivindicado
- `descricao` (string): Descrição do negócio
- `fotos` (array): Fotos públicas
- `cidade` (string): Localização
- `estado` (string): Estado
- `categoriaPrincipal` (string): Categoria principal

**Lógica Frontend:**
```javascript
// Ao carregar página de fornecedor
const fornecedor = await fetch(`/api/v1/fornecedores/${id}`).then(r => r.json());

if (!fornecedor.isClaimed && fornecedor.planLevel === -2) {
  // Mostrar botão de reivindicação
  showClaimButton();
} else if (fornecedor.isClaimed) {
  // Mostrar badge de reivindicado
  showClaimedBadge();
}
```

---

## 🔐 Segurança & Conformidade

### ⚠️ **IMPORTANTE: Processo 100% Burocrático - SEM PAGAMENTO**

**Este processo de reivindicação de perfil:**
- ❌ **NÃO envolve pagamento**
- ❌ **NÃO envolve integração com gateway de pagamento**
- ❌ **NÃO envolve cartão de crédito**
- ❌ **NÃO envolve dados financeiros**

É **APENAS** um processo burocrático/legal onde:
- ✅ Fornecedor prova ser o proprietário do negócio
- ✅ Fornecedor cria conta de acesso
- ✅ Fornecedor assina digitalmente os termos de adesão
- ✅ Sistema auditoria tudo para conformidade legal
- ✅ Fornecedor recebe acesso gratuito ao plano Free com 3 leads

**Se o fornecedor quiser evoluir para plano pago depois (Vitrine, Premium), aí sim há pagamento.**

---

### **Audit Trail Completo do Termo**

O processo de reivindicação gera **múltiplas entradas de auditoria** para rastreamento legal e conformidade:

#### **Entrada 1: TERMO_APRESENTADO**
```json
{
  "id": "audit-001",
  "action": "TERMO_APRESENTADO",
  "entityType": "ContratulAdesao",
  "entityId": "termo-adesao-v1.0",
  "timestamp": "2026-02-06T18:30:00Z",
  "context": {
    "fornecedorId": "550e8400-e29b-41d4-a716-446655440000",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "sessionId": "sess-abc123",
    "termoVersao": "1.0",
    "termoHash": "94489d7ee250ca7d979468ec17f7bb14dd784ae0e7ec1c45daf824d32e8fb387",
    "dataVigencia": "2026-02-01T00:00:00Z"
  },
  "status": "APRESENTADO",
  "details": "Termo de adesão v1.0 carregado para aceitação"
}
```

**Capturado:** Quando frontend carrega o termo via GET /api/v1/contratos/termo-adesao

#### **Entrada 2: TERMO_LIDO**
```json
{
  "id": "audit-002",
  "action": "TERMO_LIDO",
  "entityType": "ContratulAdesao",
  "entityId": "termo-adesao-v1.0",
  "timestamp": "2026-02-06T18:32:15Z",
  "context": {
    "fornecedorId": "550e8400-e29b-41d4-a716-446655440000",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "sessionId": "sess-abc123",
    "tempoLeitura": 135000,
    "scrollPercentage": 100,
    "fullyScrolled": true
  },
  "status": "LIDO",
  "details": "Usuário leu 100% do termo em 2m15s"
}
```

**Capturado:** Pelo frontend ao detectar leitura completa (scroll 100% ou preview button)

**Rastreamento necessário no frontend:**
```javascript
// Track quando termo é aberto
const termoOpenedAt = new Date();
let scrollPercentage = 0;

// Track scroll do termo
document.getElementById('termPreview').addEventListener('scroll', (e) => {
  const element = e.target;
  const scrollPercentage = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
  
  // Se chegou a 100%, marcar como lido
  if (scrollPercentage >= 95) {
    recordTermoRead();
  }
});

async function recordTermoRead() {
  const tempoLeitura = Date.now() - termoOpenedAt;
  
  // Log local ou enviar ao backend
  console.log('Termo lido - Tempo:', tempoLeitura);
  
  // Habilitar checkbox de aceitação
  document.getElementById('acceptTerms').disabled = false;
}
```

#### **Entrada 3: TERMO_ACEITO**
```json
{
  "id": "audit-003",
  "action": "TERMO_ACEITO",
  "entityType": "ContratulAdesao",
  "entityId": "termo-adesao-v1.0",
  "timestamp": "2026-02-06T18:33:00Z",
  "actor": {
    "tipo": "Fornecedor",
    "email": "joao.silva@business.com",
    "nome": "João Silva Santos"
  },
  "context": {
    "fornecedorId": "550e8400-e29b-41d4-a716-446655440000",
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "sessionId": "sess-abc123",
    "termoVersao": "1.0",
    "termoHash": "94489d7ee250ca7d979468ec17f7bb14dd784ae0e7ec1c45daf824d32e8fb387"
  },
  "status": "ACEITO",
  "details": "Fornecedor aceito termos de adesão",
  "dataAceite": "2026-02-06T18:33:00Z"
}
```

**Capturado:** Quando fornecedor marca checkbox de aceitação

#### **Entrada 4: PROFILE_CLAIMED (Reivindicação Completada)**
```json
{
  "id": "audit-004",
  "action": "PROFILE_CLAIMED",
  "entityType": "Fornecedor",
  "entityId": "550e8400-e29b-41d4-a716-446655440000",
  "timestamp": "2026-02-06T18:33:15Z",
  "actor": {
    "tipo": "Fornecedor",
    "email": "joao.silva@business.com",
    "userId": "660e8400-e29b-41d4-a716-446655440111"
  },
  "context": {
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "sessionId": "sess-abc123",
    "termoVersao": "1.0",
    "termoHash": "94489d7ee250ca7d979468ec17f7bb14dd784ae0e7ec1c45daf824d32e8fb387",
    "dataAceite": "2026-02-06T18:33:00Z"
  },
  "oldValues": {
    "isClaimed": false,
    "planLevel": -2,
    "leadLimit": 0,
    "proprietarioId": null,
    "dataClaim": null
  },
  "newValues": {
    "isClaimed": true,
    "planLevel": 0,
    "leadLimit": 3,
    "proprietarioId": "660e8400-e29b-41d4-a716-446655440111",
    "dataClaim": "2026-02-06T18:33:15Z"
  },
  "status": "CONCLUÍDO",
  "details": "Perfil reivindicado com sucesso - Plano Free ativado com 3 leads"
}
```

**Capturado:** Backend ao processar POST /api/v1/fornecedores/{id}/claim

#### **Entrada 5: USUARIO_CRIADO (Usuário do Sistema)**
```json
{
  "id": "audit-005",
  "action": "USUARIO_CRIADO",
  "entityType": "Usuario",
  "entityId": "660e8400-e29b-41d4-a716-446655440111",
  "timestamp": "2026-02-06T18:33:15Z",
  "actor": {
    "tipo": "Fornecedor",
    "email": "joao.silva@business.com"
  },
  "context": {
    "ipAddress": "192.168.1.100",
    "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    "fornecedorId": "550e8400-e29b-41d4-a716-446655440000"
  },
  "oldValues": null,
  "newValues": {
    "email": "joao.silva@business.com",
    "nome": "João Silva Santos",
    "telefone": "11987654321",
    "roles": ["Fornecedor"],
    "status": "ATIVO"
  },
  "status": "CRIADO",
  "details": "Novo usuário criado através de reivindicação de perfil"
}
```

**Capturado:** Backend ao criar usuário

#### **Entrada 6: PLANO_ATIVADO (Plano Free)**
```json
{
  "id": "audit-006",
  "action": "PLANO_ATIVADO",
  "entityType": "PlanSubscription",
  "entityId": "subscription-001",
  "timestamp": "2026-02-06T18:33:15Z",
  "actor": {
    "tipo": "Sistema",
    "systemAction": "CLAIM_PROCESS"
  },
  "context": {
    "fornecedorId": "550e8400-e29b-41d4-a716-446655440000",
    "plano": "Free",
    "planLevel": 0
  },
  "oldValues": {
    "plano": "Zombie",
    "planLevel": -2,
    "leads": 0,
    "dataAtivacao": null
  },
  "newValues": {
    "plano": "Free",
    "planLevel": 0,
    "leads": 3,
    "dataAtivacao": "2026-02-06T18:33:15Z",
    "dataVencimento": null,
    "valor": 0,
    "pagamento": "GRATUITO"
  },
  "status": "ATIVADO",
  "details": "Plano Free ativado automaticamente ao reclamar perfil - 3 leads vitalícios inclusos"
}
```

**Capturado:** Backend ao atualizar plano

#### **Entrada 7: EMAIL_CONFIRMACAO_ENVIADO**
```json
{
  "id": "audit-007",
  "action": "EMAIL_CONFIRMACAO_ENVIADO",
  "entityType": "Email",
  "entityId": "email-confirm-001",
  "timestamp": "2026-02-06T18:33:30Z",
  "context": {
    "usuario": "660e8400-e29b-41d4-a716-446655440111",
    "email": "joao.silva@business.com",
    "fornecedorId": "550e8400-e29b-41d4-a716-446655440000",
    "tipoEmail": "PROFILE_CLAIM_CONFIRMATION",
    "templateId": "profile-claim-v1"
  },
  "status": "ENVIADO",
  "details": "Email de confirmação de reivindicação enviado"
}
```

**Capturado:** Backend ao enviar email

---

### **Consulta de Audit Trail (Para Suporte/Legal)**

```sql
-- Query para recuperar toda a trilha de auditoria de um claim
SELECT 
  action,
  timestamp,
  context->>'ipAddress' as ip_address,
  context->>'userAgent' as user_agent,
  status,
  details
FROM auditlogs
WHERE 
  entityId = '550e8400-e29b-41d4-a716-446655440000' OR
  (context->>'fornecedorId' = '550e8400-e29b-41d4-a716-446655440000')
ORDER BY timestamp ASC;
```

---

### **LGPD Compliance & Conformidade Jurídica**

#### **Requisitos Atendidos:**

✅ **Consentimento Explícito**
- Fornecedor deve marcar checkbox
- Não há consentimento implícito
- Data e hora precisas registradas

✅ **Rastreabilidade Completa**
- Todas as 7 ações auditadas
- IP e User-Agent registrados
- Timestamp em cada etapa
- Hash do termo para integridade

✅ **Direito ao Esquecimento (LGPD Art. 17)**
- Auditoria não pode ser deletada
- Mas dados pessoais podem ser anonimizados após 2 anos
- Query específica para atender requisições de exclusão

✅ **Transparência**
- Aviso de privacidade visível no formulário
- Link para política de privacidade
- Termos legíveis e acessíveis

✅ **Segurança de Dados**
- Senhas hasheadas (bcrypt mín. 10 rounds)
- Transmissão via HTTPS obrigatória
- Tokens JWT com expiração
- Refresh token rotation

✅ **Conformidade com Lei**
- Termo pode ser apresentado em tribunal como prova
- Assinatura digital com timestamp
- IP do fornecedor registrado
- Versionamento do termo (para histórico legal)

---

## 📞 Tratamento de Erros

### **Mensagens de Erro**

| Cenário | Código HTTP | Mensagem |
|---------|------------|----------|
| Fornecedor não encontrado | 404 | "Fornecedor não encontrado" |
| Perfil já reivindicado | 409 | "Este perfil já foi reivindicado" |
| Email já em uso | 409 | "Este email já está em uso" |
| Hash do termo inválido | 400 | "Hash do termo inválido" |
| Dados inválidos | 400 | "[Campo]: [Mensagem de erro específica]" |
| Erro interno | 500 | "Erro ao processar reivindicação. Tente novamente mais tarde." |

### **Exemplo de Implementação:**

```javascript
async function handleClaimError(error) {
  const status = error.response?.status;
  const data = error.response?.data;
  
  switch (status) {
    case 404:
      showError('Fornecedor não encontrado. Verifique a URL.');
      break;
    case 409:
      showError(data.error || 'Erro ao processar solicitação.');
      break;
    case 400:
      showError(data.error || 'Dados inválidos. Verifique os campos.');
      // Destacar campos com erro
      if (data.errors) {
        data.errors.forEach(err => {
          showFieldError(err.campo, err.mensagem);
        });
      }
      break;
    default:
      showError('Erro ao reivindicar perfil. Tente novamente.');
  }
}
```

---

## 🧪 Checklist de Testes

### **Testes Funcionais**

- [ ] Botão "Reivindicar Perfil" aparece apenas se `IsClaimed = false`
- [ ] Botão abre modal/navega para página de claim
- [ ] Todos os campos são obrigatórios
- [ ] Validação de email em tempo real
- [ ] Formatação automática de telefone
- [ ] Indicador de força de senha funciona
- [ ] Termo é carregado da API e exibido
- [ ] Hash SHA-256 do termo é calculado corretamente
- [ ] Checkbox desabilita/habilita botão submit
- [ ] Formulário valida antes de enviar
- [ ] Sucesso redireciona para painel após 2s
- [ ] Tokens são armazenados em localStorage

### **Testes de Erro**

- [ ] Mensagem se fornecedor não existir
- [ ] Mensagem se perfil já foi reivindicado
- [ ] Mensagem se email já está em uso
- [ ] Mensagem de erro genérica tratada

### **Testes de Segurança**

- [ ] Senha não é exibida por padrão (toggle)
- [ ] Aviso LGPD está visível
- [ ] Link de privacidade funciona
- [ ] Dados não são logados em console
- [ ] HTTPS é obrigatório (production)

### **Testes de Acessibilidade**

- [ ] Todos os campos têm `aria-describedby`
- [ ] Mensagens de erro estão associadas aos campos
- [ ] Botão submit mostra `aria-busy` durante carregamento
- [ ] Tab order está correto
- [ ] Screen reader consegue ler todo conteúdo

---

## 📱 Responsividade

### **Mobile (< 600px)**
- Full-width buttons
- Stacked form layout
- Modal em tela cheia com scroll
- Termo com max-height + scroll

### **Tablet (600px - 1024px)**
- 2-column grid para campos se aplicável
- Buttons lado a lado ou stacked

### **Desktop (> 1024px)**
- 2-column grid para campos relacionados
- Termo preview com altura máxima
- Modal com máximo de 600px de largura

---

## 🔄 Fluxo de Usuário Completo

```
1. Usuário acessa /fornecedor/{id}
   ↓
2. Sistema verifica IsClaimed
   ↓
3. Se IsClaimed = false:
   - Mostra botão "Reivindicar Perfil"
   - Mostra benefícios do plano Free
   ↓
4. Usuário clica no botão
   ↓
5. Modal abre
   - Carrega termo da API
   - Calcula hash SHA-256
   ↓
6. Usuário preenche dados:
   - Email, Senha, Nome, Telefone
   - Lê e aceita termo
   ↓
7. Usuário clica "Reivindicar Perfil"
   ↓
8. Frontend valida todos os campos
   ↓
9. Frontend envia POST para /api/v1/fornecedores/{id}/claim
   - Payload inclui:
     * email, password, fullName, phone
     * termoHash, aceitaTermos, dataAceite
   ↓
10. Backend:
    - Valida IsClaimed = false
    - Valida email único
    - Valida hash do termo
    - Cria usuário
    - Atualiza fornecedor para Free
    - Registra na auditoria
    - Retorna tokens JWT
   ↓
11. Frontend:
    - Armazena tokens em localStorage
    - Mostra modal de sucesso
    - Conta regressiva de 3 segundos
    - Redireciona para /supplier-panel
   ↓
12. Fornecedor acessa painel com nova conta
```

---

## 🚀 Implementação - Próximos Passos

### **Phase 1: Setup (1-2 dias)**
- [ ] Criar componente React/Vue para formulário
- [ ] Criar modal/página de reivindicação
- [ ] Implementar estilos CSS base

### **Phase 2: Funcionalidade (3-4 dias)**
- [ ] Integração com API de termo
- [ ] Cálculo de hash SHA-256
- [ ] Validação de formulário
- [ ] Submissão para backend

### **Phase 3: Testes (2-3 dias)**
- [ ] Testes funcionais completos
- [ ] Testes de erro
- [ ] Testes de responsividade
- [ ] Testes de acessibilidade

### **Phase 4: Deploy & Monitoring (1 dia)**
- [ ] Deploy em produção
- [ ] Monitoramento de erros
- [ ] Feedback loop com backend

---

## 📞 Suporte & Contato

**Para dúvidas ou ajustes nesta especificação:**
- Verificar este documento na pasta `/docs/frontend/`
- Abrir issue no GitHub referenciando `PROFILE_CLAIM_SPECIFICATION.md`
- Contatar dev backend para clarificações de API

---

## 📝 Histórico de Versões

| Versão | Data | Descrição |
|--------|------|-----------|
| 1.0 | 2026-02-06 | Criação inicial - Especificação completa |

---

**Documento preparado para:** Dev Frontend Público  
**Status:** ✅ Pronto para Implementação  
**Última atualização:** 6 de fevereiro de 2026
