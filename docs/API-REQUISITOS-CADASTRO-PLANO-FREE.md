# API - Requisitos de Ajuste Backend: Cadastro de Fornecedor (Plano Free)

## 📌 Contexto

A rota pública `/:cidade/anuncie` foi migrada de formulário de contato (Formspree) para **cadastro real de fornecedor** com aceite de termos.

O frontend agora envia dados completos para criação de fornecedor no **nível Free** e precisa de contrato backend estável para operação e mensageria de erro.

---

## 🎯 Objetivo

Disponibilizar endpoint de cadastro gratuito com:
- validação de dados cadastrais;
- validação jurídica de aceite (`aceitaTermos`, `termoHash`, `dataAceite`);
- prevenção de duplicidade (e-mail e CPF/CNPJ);
- retorno padronizado para estados de UX (sucesso, pendência, erro por campo).

---

## 📡 Endpoints necessários

### 1) Cadastro Free (obrigatório)

**POST** `/api/v1/fornecedores/cadastro-free`

### 2) Termo vigente (já utilizado pelo frontend)

**GET** `/api/v1/contratos/termo-adesao?tipo=ADESAO`

> Observação: o frontend utiliza o hash retornado neste endpoint para validar e reenviar o aceite no cadastro.

---

## 📥 Contrato de Request - Cadastro Free

### Headers
```http
Content-Type: application/json
Accept: application/json
```

### Request Body (contrato esperado)

```json
{
  "empresa": {
    "nomeFantasia": "Studio Bella Noiva",
    "cnpjCpf": "12345678000190"
  },
  "responsavel": {
    "nome": "Maria Silva"
  },
  "contato": {
    "email": "contato@studio.com.br",
    "telefone": "19999999999"
  },
  "credenciais": {
    "senha": "Senha123!"
  },
  "nomeFantasia": "Studio Bella Noiva",
  "nomeResponsavel": "Maria Silva",
  "cnpjCpf": "12345678000190",
  "email": "contato@studio.com.br",
  "telefone": "19999999999",
  "aceitaTermos": true,
  "termoHash": "sha256_hex_do_termo_vigente",
  "dataAceite": "2026-05-13T11:53:16.814Z",
  "planLevel": "Free"
}
```

### Observações de compatibilidade
- O frontend envia campos estruturados (`empresa`, `responsavel`, `contato`, `credenciais`) e também campos flat para compatibilidade.
- `credenciais.senha` é opcional (enviar somente quando preenchida).
- `planLevel` deve ser forçado para Free no backend (não confiar apenas no cliente).

---

## ✅ Regras de validação obrigatórias

| Campo | Regra |
|---|---|
| `nomeFantasia` | obrigatório, mínimo 3 caracteres |
| `nomeResponsavel` / `responsavel.nome` | obrigatório, mínimo 3 caracteres |
| `email` / `contato.email` | obrigatório, formato válido, normalizar para lowercase |
| `telefone` / `contato.telefone` | obrigatório, 10-11 dígitos numéricos |
| `cnpjCpf` / `empresa.cnpjCpf` | obrigatório, 11 ou 14 dígitos numéricos |
| `aceitaTermos` | obrigatório e deve ser `true` |
| `termoHash` | obrigatório, deve corresponder ao termo vigente ativo |
| `dataAceite` | obrigatório, formato ISO-8601 |
| `planLevel` | backend deve persistir como `Free` |

---

## 🧠 Regras de negócio obrigatórias

1. **Criação no nível Free**
   - todo cadastro vindo deste endpoint deve nascer no tier Free.

2. **Duplicidade**
   - bloquear por e-mail e por CPF/CNPJ.
   - retornar erro de negócio sem stacktrace.

3. **Pendência de aprovação**
   - caso exista cadastro pendente para os mesmos dados, retornar status de pendência ao invés de criar duplicado.

4. **Aceite jurídico**
   - persistir: `aceitaTermos`, `termoHash`, `dataAceite`, IP de origem e User-Agent.
   - rejeitar hash inválido.

5. **Segurança**
   - sanitizar entradas textuais;
   - mascarar/evitar log de dados sensíveis em claro;
   - aplicar rate limit para evitar spam.

---

## 📤 Contrato de Response

### Sucesso de criação (201)
```json
{
  "success": true,
  "message": "Cadastro Free recebido com sucesso.",
  "fornecedorId": "uuid",
  "status": "CRIADO",
  "planLevel": "Free",
  "redirectUrl": "https://painel.guianoivas.com/onboarding"
}
```

### Sucesso com pendência (200 ou 202)
```json
{
  "success": true,
  "message": "Cadastro já existente em análise.",
  "fornecedorId": "uuid",
  "status": "PENDENTE_APROVACAO",
  "planLevel": "Free"
}
```

### Erros de negócio esperados

#### 409 - E-mail duplicado
```json
{
  "success": false,
  "codigo": "EMAIL_JA_CADASTRADO",
  "message": "Este e-mail já está cadastrado."
}
```

#### 409 - CPF/CNPJ duplicado
```json
{
  "success": false,
  "codigo": "CNPJ_CPF_DUPLICADO",
  "message": "Este CPF/CNPJ já está cadastrado."
}
```

#### 400 - Termos obrigatórios
```json
{
  "success": false,
  "codigo": "TERMO_OBRIGATORIO",
  "message": "O aceite dos termos é obrigatório."
}
```

#### 400 - Hash inválido
```json
{
  "success": false,
  "codigo": "HASH_INVALIDO",
  "message": "Hash do termo inválido para o termo vigente."
}
```

#### 422 - Erro de validação por campo
```json
{
  "success": false,
  "codigo": "VALIDACAO",
  "message": "Erro de validação",
  "errors": [
    { "campo": "email", "mensagem": "E-mail inválido" },
    { "campo": "telefone", "mensagem": "Telefone inválido" }
  ]
}
```

---

## 🧪 Critérios de aceite (Backend)

- [ ] `POST /fornecedores/cadastro-free` cria fornecedor com `planLevel=Free`.
- [ ] Persiste evidências de aceite (`aceitaTermos`, `termoHash`, `dataAceite`, IP, User-Agent).
- [ ] Bloqueia duplicidade de e-mail com `codigo=EMAIL_JA_CADASTRADO`.
- [ ] Bloqueia duplicidade de CPF/CNPJ com `codigo=CNPJ_CPF_DUPLICADO`.
- [ ] Retorna pendência com `status=PENDENTE_APROVACAO` quando aplicável.
- [ ] Retorna erros de validação com payload estruturado por campo.
- [ ] Mantém compatibilidade com campos estruturados e flat enviados pelo frontend.
- [ ] Endpoint de termo vigente retorna conteúdo e hash válidos para cálculo no cliente.

---

## 🔗 Dependências de integração frontend

- Página: `/:cidade/anuncie`
- Tracking esperado:
  - `event=form_submit` (`form_type=anuncio`) no sucesso;
  - `event=free_signup_funnel` com `funnel_stage=inicio|falha|sucesso`.

---

**Data:** 13/05/2026  
**Versão:** 1.0  
**Origem:** Equipe Frontend - Guia Noivas
