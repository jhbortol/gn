# Especificação Técnica Backend: Autenticação de Noivas e Integração de Leads

**Status:** Pronto para Desenvolvimento
**Contexto:** Implementar login social (Google e Apple) para Noivas e substituir a referência baseada em GUID no envio de leads.
**Regra de Ouro:** 🚫 **O ecossistema de Fornecedores (Tabela `Usuarios` e `AuthController`) NÃO DEVE SER ALTERADO.** O domínio das Noivas deve ser 100% isolado.

## 1. Banco de Dados (Entity Framework)

Criar uma nova entidade completamente isolada para gerenciar as noivas e atualizar a entidade de Leads/Contatos.

### Nova Tabela: `Noivas`
Representa a noiva autenticada no sistema.
*   `Id` (UNIQUEIDENTIFIER, PK) - Gerado via `Guid.NewGuid()`
*   `Nome` (NVARCHAR 200, Required)
*   `Email` (NVARCHAR 200, Required, UNIQUE Index)
*   `Telefone` (NVARCHAR 20, Nullable)
*   `GoogleId` (NVARCHAR 255, Nullable, UNIQUE Index) - ID único retornado pelo Google
*   `AppleId` (NVARCHAR 255, Nullable, UNIQUE Index) - ID único retornado pela Apple (`sub` no JWT da Apple)
*   `DataCasamento` (DATETIME2, Nullable)
*   `CreatedAt` (DATETIMEOFFSET, Default: UTC Now)
*   `UpdatedAt` (DATETIMEOFFSET, Nullable)

### Alteração na Tabela Atual: `ContatoSubmissions` (ou `Leads`)
Adicionar o vínculo com a noiva autenticada.
*   Adicionar coluna `NoivaId` (UNIQUEIDENTIFIER, Nullable, FK para `Noivas(Id)`).
*   *Nota de Retrocompatibilidade:* Manter a coluna do antigo `Guid` (VisitorId) temporariamente para não quebrar leads antigos, mas a nova lógica priorizará o `NoivaId`.

---

## 2. Configurações de Autenticação (JWT)

Os tokens gerados para as Noivas usarão a mesma chave secreta (`Jwt:Key`), mas **devem obrigatoriamente conter roles específicas** para evitar escalonamento de privilégios.

**Claims obrigatórias no JWT da Noiva:**
*   `ClaimTypes.NameIdentifier`: `{NoivaId}`
*   `ClaimTypes.Email`: `{Email}`
*   `ClaimTypes.Role`: `"Bride"` (Isso garante que rotas de fornecedor `[Authorize(Roles = "Supplier")]` rejeitem a noiva sumariamente).

---

## 3. Endpoints e Contratos da API

Criar um novo controller: `NoivaAuthController`.

### 3.1. Login com Google
**Endpoint:** `POST /api/v1/auth/noiva/google`
**Autenticação:** Nenhuma (Público)

**Descrição:** Recebe o `idToken` gerado pelo SDK do Google no frontend. O backend deve validar a assinatura do token usando a biblioteca oficial `Google.Apis.Auth`. Se o email não existir na tabela `Noivas`, criar um novo registro (Signup automático). Se existir, atualizar o `GoogleId` e fazer login.

**Payload Request:**
```json
{
  "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjUy..."
}
**Response:**
{
  "accessToken": "eyJhbGciOiJIUzI1...",
  "expiresIn": 3600,
  "noiva": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "nome": "Maria Silva",
    "email": "maria@gmail.com"
  }
}
3.2. Login com Apple
Endpoint: POST /api/v1/auth/noiva/apple Autenticação: Nenhuma (Público)

Descrição: Valida o id_token da Apple usando as chaves públicas da Apple (<https://appleid.apple.com/auth/keys>). Regra de negócio: A Apple só envia o nome do usuário no primeiro login. O frontend enviará o nome junto com o token se estiver disponível. Se for login subsequente, o backend usa apenas o AppleId extraído do token para buscar no banco.

Payload Request:

{
  "idToken": "eyJhbGciOiJSUzI1NiIs...",
  "firstName": "Maria", // Opcional, enviado pelo front apenas no 1º login
  "lastName": "Silva"   // Opcional, enviado pelo front apenas no 1º login
}
**Response:**
{
  "accessToken": "eyJhbGciOiJIUzI1...",
  "expiresIn": 3600,
  "noiva": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "nome": "Maria Silva",
    "email": "maria@gmail.com"
  }
}
3.3. Obter Perfil da Noiva
Endpoint: GET /api/v1/noiva/me Autenticação: Requerida [Authorize(Roles = "Bride")]

Descrição: Retorna os dados da noiva logada com base no Token JWT. Response (200 OK):

{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "nome": "Maria Silva",
  "email": "maria@gmail.com",
  "telefone": "(11) 98765-4321",
  "dataCasamento": "2027-10-15T00:00:00Z"
}

. Alteração no Endpoint de Contato (Leads)
O endpoint de submissão de orçamentos (já existente) deve ser ajustado para identificar a Noiva pelo JWT.

Endpoint: POST /v1/public/fornecedores/{fornecedorId}/contact Autenticação: Opcional (Permite tanto Anônimo quanto JWT com Role Bride).

Lógica de Negócio:

O backend verifica se há um cabeçalho Authorization: Bearer <token>.
Se existir e for válido, extrai o ClaimTypes.NameIdentifier (NoivaId).
Lê o corpo da requisição (Payload atual de Contato).
Grava na tabela ContatoSubmissions:
NoivaId = {NoivaId extraído} (Se logada)
NoivaId = NULL (Se anônima - Soft Login permitido, mas front-end incentivará o login).
O resto do fluxo de lead (envio de e-mail ao fornecedor) permanece inalterado.

