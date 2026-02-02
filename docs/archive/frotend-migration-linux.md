# Frontend - Guia de Migração para Backend em Linux

**Data:** 22 de Janeiro de 2026  
**Status:** Backend migrando de Windows (IIS) para Linux (Azure Functions)  
**Impacto:** Mudanças em response formats e comportamentos de API

---

## 📋 Resumo Executivo

O backend foi publicado em Linux usando Azure Functions. Isso implica em mudanças que podem impactar o frontend:

✅ **Boas notícias:**
- Formato de responses padronizado
- URLs de imagem agora retornam URLs diretas do Blob Storage
- Endpoints mantêm as mesmas rotas (`/api/v1/...`)
- Autenticação JWT continua igual

⚠️ **Mudanças importantes:**
- Tratamento de case-sensitivity em slugs e IDs
- Tratamento de paths e URLs em Linux diferem do Windows
- Mensagens de erro podem variar
- Timeouts podem ser diferentes

---

## 🔑 Mudanças Principais

### 1. URLs de Imagem

#### Antes (Windows)
```
Resposta com URL construída para otimização:
{
  "imageUrl": "/api/v1/images/optimize?url=https://...&w=640&q=75&format=webp"
}
```

#### Agora (Linux)
```
Resposta com URL direta do Blob Storage:
{
  "imageUrl": "https://storageaccount.blob.core.windows.net/media/arquivo.jpg"
}
```

**Ação frontend:** Remover lógica que depende da URL `/api/v1/images/optimize`. Use a URL retornada diretamente ou implemente cache/otimização no cliente.

---

### 2. Case-Sensitivity em URLs

Linux é **case-sensitive** com URLs. Isso pode afetar:

#### Slugs de Fornecedores/Categorias/Blog
- ✅ Sempre usar lowercase: `/v1/fornecedores/meu-slug` ✓
- ❌ Não usar: `/v1/fornecedores/Meu-Slug` ✗

#### IDs (GUIDs)
- Devem ser mantidos como retornados na response (geralmente em formato padrão)
- Exemplo válido: `/v1/fornecedores/550e8400-e29b-41d4-a716-446655440000`

**Ação frontend:** Garantir que slugs sejam sempre enviados em lowercase para a API.

---

### 3. Tratamento de Erros

#### Formato padrão de erro (unchanged)
```json
{
  "error": "Descrição do erro"
}
```

Alguns endpoints podem retornar:
```json
{
  "message": "Descrição do erro",
  "statusCode": 400
}
```

**Ação frontend:** Verificar ambos os campos (`error` e `message`) ao tratar erros.

---

### 4. Status HTTP Codes

Verificar os status codes retornados:

| Status | Significado | Ação |
|--------|------------|------|
| 200 | OK - Sucesso | Processar resposta normalmente |
| 201 | Created - Recurso criado | Tipo de resposta pode variar |
| 204 | No Content - Sucesso sem corpo | Não tentar fazer parse JSON |
| 400 | Bad Request - Erro de validação | Verificar campo `error` ou `message` |
| 401 | Unauthorized - Token inválido | Fazer refresh do token ou redirecionar ao login |
| 403 | Forbidden - Sem permissão | Não tentar reclassificar como erro de servidor |
| 404 | Not Found - Recurso não existe | Mensagem de usuário apropriada |
| 500 | Internal Server Error | Aguardar e retentar com backoff exponencial |

**Ação frontend:** Implementar tratamento robusto para cada status code.

---

## 📡 Endpoints - Detalhes de Response

### Autenticação

#### POST `/api/v1/auth/login`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "senha123"
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "email": "user@example.com",
    "displayName": "João Silva",
    "roles": ["Supplier"]
  }
}
```

**Response (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

#### POST `/api/v1/auth/register`
**Request:**
```json
{
  "email": "novo@example.com",
  "password": "senha123",
  "confirmPassword": "senha123"
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "email": "novo@example.com",
  "displayName": null
}
```

---

#### POST `/api/v1/auth/refresh`
**Request:**
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response (200):**
```json
{
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

**Response (401):**
```json
{
  "error": "Invalid or expired refresh token"
}
```

---

#### POST `/api/v1/auth/logout`
**Request:** (apenas headers com Bearer token)

**Response (200):**
```json
{
  "message": "Logged out successfully"
}
```

---

#### POST `/api/v1/auth/forgot-password`
**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (200):**
```json
{
  "message": "Password reset email sent"
}
```

---

#### POST `/api/v1/auth/reset-password`
**Request:**
```json
{
  "token": "reset_token_from_email",
  "newPassword": "novaSenha123",
  "confirmPassword": "novaSenha123"
}
```

**Response (200):**
```json
{
  "message": "Password reset successfully"
}
```

---

### Categorias

#### GET `/api/v1/categorias`
**Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Decoração",
    "slug": "decoracao",
    "descricao": "Decoração para casamentos",
    "imageId": "550e8400-e29b-41d4-a716-446655440001",
    "imageUrl": "https://storageaccount.blob.core.windows.net/media/cat-decoracao.jpg"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440002",
    "nome": "Fotografia",
    "slug": "fotografia",
    "descricao": "Serviços de fotografia",
    "imageId": null,
    "imageUrl": null
  }
]
```

**Mudança importante:** `imageUrl` agora é uma URL direta (não construída como antes).

---

#### GET `/api/v1/categorias/{id}`
**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Decoração",
  "slug": "decoracao",
  "descricao": "Decoração para casamentos",
  "imageId": "550e8400-e29b-41d4-a716-446655440001",
  "imageUrl": "https://storageaccount.blob.core.windows.net/media/cat-decoracao.jpg"
}
```

---

#### POST `/api/v1/admin/categorias` (Admin)
**Request:**
```json
{
  "nome": "Nova Categoria",
  "slug": "nova-categoria",
  "descricao": "Descrição da categoria"
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440003",
  "nome": "Nova Categoria",
  "slug": "nova-categoria",
  "descricao": "Descrição da categoria",
  "order": 0,
  "createdAt": "2026-01-22T10:00:00Z"
}
```

---

#### PUT `/api/v1/admin/categorias/{id}` (Admin)
**Request:**
```json
{
  "nome": "Categoria Atualizada",
  "slug": "categoria-atualizada",
  "descricao": "Descrição atualizada"
}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "nome": "Categoria Atualizada",
  "slug": "categoria-atualizada",
  "descricao": "Descrição atualizada",
  "order": 0,
  "updatedAt": "2026-01-22T11:00:00Z"
}
```

---

#### DELETE `/api/v1/admin/categorias/{id}` (Admin)
**Response (204):** Sem corpo de resposta

---

### Fornecedores

#### GET `/api/v1/fornecedores`
**Query parameters:**
```
?page=1&pageSize=20&categoria=categoria-slug&cidade=Piracicaba&destaque=true
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440100",
      "nome": "Florista Maria",
      "slug": "florista-maria",
      "descricao": "Flores para casamentos",
      "cidade": "Piracicaba",
      "rating": 4.5,
      "destaque": true,
      "seloFornecedor": false,
      "imageUrl": "https://storageaccount.blob.core.windows.net/media/florista.jpg",
      "imageId": "550e8400-e29b-41d4-a716-446655440101"
    }
  ],
  "meta": {
    "total": 45,
    "page": 1,
    "pageSize": 20,
    "totalPages": 3
  }
}
```

**Mudança importante:** 
- Resposta com structure `{ data: [], meta: {...} }` (não mais `pagination`)
- `meta` contém `totalPages` (não mais `pages`)

---

#### GET `/api/v1/fornecedores/{id}`
**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440100",
  "nome": "Florista Maria",
  "slug": "florista-maria",
  "descricao": "Flores para casamentos",
  "cidade": "Piracicaba",
  "telefone": "(19) 99999-9999",
  "email": "florista@example.com",
  "website": "https://florista.com",
  "rating": 4.5,
  "destaque": true,
  "seloFornecedor": false,
  "categorias": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "nome": "Flores",
      "slug": "flores"
    }
  ],
  "testemunhos": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440200",
      "nome": "Noiva Feliz",
      "descricao": "Serviço excelente!"
    }
  ],
  "media": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440101",
      "url": "https://storageaccount.blob.core.windows.net/media/foto1.jpg",
      "isPrimary": true
    }
  ]
}
```

**Nota:** Retorno direto do DTO (não wrapped em `{ data: ... }`)

---

#### GET `/api/v1/fornecedores/ativos`
**Query parameters:**
```
?page=1&pageSize=20
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440100",
      "nome": "Florista Maria",
      "slug": "florista-maria",
      "descricao": "Flores para casamentos",
      "cidade": "Piracicaba",
      "rating": 4.5,
      "destaque": true,
      "seloFornecedor": false,
      "imageUrl": "https://storageaccount.blob.core.windows.net/media/florista.jpg",
      "imageId": "550e8400-e29b-41d4-a716-446655440101"
    }
  ],
  "meta": {
    "total": 25,
    "page": 1,
    "pageSize": 20,
    "totalPages": 2
  }
}
```

---

#### GET `/api/v1/fornecedores/ativos/categoria/{categoriaId}`
**Response (200):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440100",
      "nome": "Florista Maria",
      "slug": "florista-maria",
      "descricao": "Flores para casamentos",
      "cidade": "Piracicaba",
      "rating": 4.5,
      "destaque": true,
      "seloFornecedor": false,
      "imageUrl": "https://storageaccount.blob.core.windows.net/media/florista.jpg",
      "imageId": "550e8400-e29b-41d4-a716-446655440101"
    }
  ],
  "meta": {
    "total": 8,
    "page": 1,
    "pageSize": 20,
    "totalPages": 1
  }
}
```

---

### Blog

#### GET `/api/v1/blog`
**Query parameters:**
```
?page=1&pageSize=10
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440300",
      "titulo": "5 Tendências de Casamento",
      "slug": "5-tendencias-casamento",
      "conteudo": "Lorem ipsum dolor sit amet...",
      "autora": "Maria Silva",
      "featuredImage": "https://storageaccount.blob.core.windows.net/media/blog-post.jpg",
      "createdAt": "2026-01-15T10:00:00Z"
    }
  ],
  "meta": {
    "total": 12,
    "page": 1,
    "pageSize": 10,
    "totalPages": 2
  }
}
```

---

#### GET `/api/v1/blog/{slug}`
**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440300",
  "titulo": "5 Tendências de Casamento",
  "slug": "5-tendencias-casamento",
  "conteudo": "Lorem ipsum dolor sit amet...",
  "autora": "Maria Silva",
  "featuredImage": "https://storageaccount.blob.core.windows.net/media/blog-post.jpg",
  "createdAt": "2026-01-15T10:00:00Z",
  "updatedAt": "2026-01-20T15:30:00Z"
}
```

**Nota:** Retorno direto do DTO (não wrapped em `{ data: ... }`)

---

#### GET `/api/v1/blog/latest`
**Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440300",
    "titulo": "5 Tendências de Casamento",
    "slug": "5-tendencias-casamento",
    "conteudo": "Lorem ipsum dolor sit amet...",
    "autora": "Maria Silva",
    "featuredImage": "https://storageaccount.blob.core.windows.net/media/blog-post.jpg",
    "createdAt": "2026-01-15T10:00:00Z"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440301",
    "titulo": "Como escolher o melhor fotógrafo",
    "slug": "escolher-fotografo",
    "conteudo": "Lorem ipsum dolor sit amet...",
    "autora": "João Santos",
    "featuredImage": "https://storageaccount.blob.core.windows.net/media/blog-post-2.jpg",
    "createdAt": "2026-01-18T10:00:00Z"
  }
]
```

**Nota:** Retorno como array direto (não wrapped)

---

### Conta Fornecedor (Autenticado)

#### GET `/api/v1/account/me` (Requer Bearer token)
**Headers:**
```
Authorization: Bearer eyJhbGc...
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440100",
  "nome": "Florista Maria",
  "slug": "florista-maria",
  "descricao": "Flores para casamentos",
  "cidade": "Piracicaba",
  "telefone": "(19) 99999-9999",
  "email": "florista@example.com",
  "website": "https://florista.com",
  "rating": 4.5,
  "destaque": true,
  "seloFornecedor": false,
  "categorias": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "nome": "Flores",
      "slug": "flores",
      "descricao": "Flores para casamentos",
      "imageId": "550e8400-e29b-41d4-a716-446655440001",
      "imageUrl": "https://storageaccount.blob.core.windows.net/media/flores-cat.jpg"
    }
  ],
  "media": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440101",
      "url": "https://storageaccount.blob.core.windows.net/media/foto1.jpg",
      "isPrimary": true
    }
  ]
}
```

**Response (401):**
```json
{
  "error": "Unauthorized"
}
```

---

#### POST `/api/v1/account/change-password` (Requer Bearer token)
**Request:**
```json
{
  "currentPassword": "senhaAtual123",
  "newPassword": "novaSenha123",
  "confirmPassword": "novaSenha123"
}
```

**Response (200):**
```json
{
  "message": "Password changed successfully"
}
```

**Response (400):**
```json
{
  "error": "Current password is incorrect"
}
```

---

### Testemunhos

#### GET `/api/v1/fornecedores/{fornecedorId}/testemunhos`
**Query parameters:**
```
?page=1&pageSize=10
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440200",
      "fornecedorId": "550e8400-e29b-41d4-a716-446655440100",
      "nome": "Noiva Feliz",
      "descricao": "Serviço excelente! Muito satisfeita!",
      "createdAt": "2026-01-10T14:00:00Z"
    }
  ],
  "meta": {
    "total": 5,
    "page": 1,
    "pageSize": 10,
    "totalPages": 1
  }
}
```

---

### Admin - Fornecedores

#### GET `/api/v1/admin/fornecedores` (Admin)
**Query parameters:**
```
?page=1&pageSize=20&search=Maria&cidade=Piracicaba
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440100",
      "nome": "Florista Maria",
      "slug": "florista-maria",
      "email": "florista@example.com",
      "cidade": "Piracicaba",
      "telefone": "(19) 99999-9999",
      "destaque": true,
      "ativo": true,
      "tier": "vitrine"
    }
  ],
  "meta": {
    "total": 1,
    "page": 1,
    "pageSize": 20,
    "totalPages": 1
  }
}
```

---

#### POST `/api/v1/admin/fornecedores` (Admin)
**Request:**
```json
{
  "nome": "Novo Fornecedor",
  "slug": "novo-fornecedor",
  "email": "novo@example.com",
  "descricao": "Descrição",
  "cidade": "Piracicaba",
  "telefone": "(19) 99999-9999",
  "website": "https://novo.com"
}
```

**Response (201):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440500",
  "nome": "Novo Fornecedor",
  "slug": "novo-fornecedor",
  "email": "novo@example.com",
  "createdAt": "2026-01-22T10:00:00Z"
}
```

---

#### PUT `/api/v1/admin/fornecedores/{id}` (Admin)
**Request:**
```json
{
  "nome": "Fornecedor Atualizado",
  "descricao": "Descrição atualizada",
  "website": "https://atualizado.com"
}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440100",
  "nome": "Fornecedor Atualizado",
  "slug": "florista-maria",
  "updatedAt": "2026-01-22T11:00:00Z"
}
```

---

#### DELETE `/api/v1/admin/fornecedores/{id}` (Admin)
**Response (204):** Sem corpo de resposta

---

#### PATCH `/api/v1/admin/fornecedores/{id}/destaque` (Admin)
**Request:**
```json
{
  "destaque": true
}
```

**Response (200):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440100",
  "destaque": true,
  "updatedAt": "2026-01-22T11:00:00Z"
}
```

---

### Admin - Adesões

#### GET `/api/v1/admin/fornecedores/adesoes` (Admin)
**Query parameters:**
```
?page=1&pageSize=20&status=pending
```

**Response (200):**
```json
{
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440600",
      "fornecedorId": "550e8400-e29b-41d4-a716-446655440100",
      "fornecedorNome": "Florista Maria",
      "tipoAdesao": "vitrine",
      "status": "pending",
      "valor": 150.00,
      "createdAt": "2026-01-20T10:00:00Z"
    }
  ],
  "meta": {
    "total": 3,
    "page": 1,
    "pageSize": 20,
    "totalPages": 1
  }
}
```

---

#### GET `/api/v1/admin/fornecedores/adesoes/{id}/audit-trail` (Admin)
**Response (200):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440700",
    "adesaoId": "550e8400-e29b-41d4-a716-446655440600",
    "acao": "created",
    "descricao": "Adesão criada",
    "timestamp": "2026-01-20T10:00:00Z",
    "usuarioId": "550e8400-e29b-41d4-a716-446655440800"
  },
  {
    "id": "550e8400-e29b-41d4-a716-446655440701",
    "adesaoId": "550e8400-e29b-41d4-a716-446655440600",
    "acao": "confirmed",
    "descricao": "Pagamento confirmado",
    "timestamp": "2026-01-20T15:30:00Z",
    "usuarioId": "550e8400-e29b-41d4-a716-446655440800"
  }
]
```

**Nota:** Retorno como array direto (não wrapped em `{ success: true, data: ... }`)

---

### Admin - Dashboard

#### GET `/api/v1/admin/dashboard` (Admin)
**Response (200):**
```json
{
  "totalFornecedores": 45,
  "fornecedoresAtivos": 38,
  "fornecedoresMesPassado": 2,
  "totalAdesoes": 120,
  "adesoesPendentes": 5,
  "adesoesMesPassado": 8,
  "totalVisitas": 15000,
  "visitasMesPassado": 2500,
  "fornecedoresDestaque": 12,
  "fornecedoresVitrine": 28,
  "fornecedoresGratuito": 5
}
```

---

## 🛠️ Checklist para Frontend

- [ ] **URLs de Imagem:** Remover lógica de construção da URL `/api/v1/images/optimize`. Usar URL retornada diretamente.
- [ ] **Case-Sensitivity:** Garantir que slugs sejam sempre lowercase
- [ ] **Paginação:** Atualizar parsing de `meta.totalPages` (não mais `pagination.pages`)
- [ ] **Tratamento de Erros:** Verificar ambos `error` e `message` nas respostas
- [ ] **Status Codes:** Implementar tratamento robusto para 204 (No Content)
- [ ] **Response Wrapping:** Não esperar `{ success: true, data: ... }` - agora é `{ data: [], meta: {...} }` ou direto DTO
- [ ] **Autenticação:** Tokens JWT não mudaram, continue com Bearer token
- [ ] **CORS:** CORS deve ser configurado no backend para seus domínios
- [ ] **Timeouts:** Aumentar timeouts se necessário (podem ser maiores em Linux)
- [ ] **Logs:** Monitorar console para warnings sobre estruturas antigas de resposta

---

## 📌 Exemplos de Código (Frontend)

### Antes (Esperando URL construída)
```javascript
// ❌ Não funciona mais
fetch('/api/v1/categorias')
  .then(r => r.json())
  .then(categorias => {
    categorias.forEach(cat => {
      // Esperava ter que processar /api/v1/images/optimize?...
      const imageUrl = cat.imageUrl; // /api/v1/images/optimize?...
    });
  });
```

### Depois (Usando URL direta)
```javascript
// ✅ Novo padrão
fetch('/api/v1/categorias')
  .then(r => r.json())
  .then(categorias => {
    categorias.forEach(cat => {
      // Agora é URL direta do Blob Storage
      const imageUrl = cat.imageUrl; // https://storage.blob.core.windows.net/...
      // Usar a URL diretamente ou implementar cache no cliente
      image.src = imageUrl;
    });
  });
```

### Antes (Paginação)
```javascript
// ❌ Estrutura antiga
fetch('/api/v1/fornecedores')
  .then(r => r.json())
  .then(response => {
    const items = response.data;
    const totalPages = response.pagination.pages; // ❌ pagination.pages
  });
```

### Depois (Paginação)
```javascript
// ✅ Nova estrutura
fetch('/api/v1/fornecedores')
  .then(r => r.json())
  .then(response => {
    const items = response.data;
    const totalPages = response.meta.totalPages; // ✅ meta.totalPages
    const total = response.meta.total;
    const page = response.meta.page;
    const pageSize = response.meta.pageSize;
  });
```

### Tratamento de Erro Robusto
```javascript
async function apiCall(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData.error || errorData.message || 'Unknown error';
      throw new Error(errorMessage);
    }

    // Retorna null para 204 No Content
    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}
```

---

## 🔗 Endpoints Completos (Referência Rápida)

### Públicos
- `GET /api/v1/categorias` - Listar categorias
- `GET /api/v1/categorias/{id}` - Detalhe categoria
- `GET /api/v1/fornecedores` - Listar fornecedores
- `GET /api/v1/fornecedores/{id}` - Detalhe fornecedor
- `GET /api/v1/fornecedores/ativos` - Fornecedores ativos
- `GET /api/v1/fornecedores/ativos/categoria/{categoriaId}` - Fornecedores por categoria
- `GET /api/v1/blog` - Listar posts
- `GET /api/v1/blog/{slug}` - Detalhe post
- `GET /api/v1/blog/latest` - Posts recentes
- `GET /api/v1/fornecedores/{fornecedorId}/testemunhos` - Testemunhos
- `POST /api/v1/contato` - Enviar contato
- `POST /api/v1/auth/login` - Login
- `POST /api/v1/auth/register` - Registrar
- `POST /api/v1/auth/refresh` - Renovar token
- `POST /api/v1/auth/forgot-password` - Solicitar reset
- `POST /api/v1/auth/reset-password` - Resetar senha

### Autenticados (Fornecedor)
- `GET /api/v1/account/me` - Perfil próprio
- `POST /api/v1/account/change-password` - Mudar senha
- `PUT /api/v1/supplier/profile` - Atualizar perfil
- `POST /api/v1/supplier/media/upload` - Upload de imagem
- `PUT /api/v1/supplier/media/reorder` - Reordenar imagens

### Admin
- `GET /api/v1/admin/fornecedores` - Listar fornecedores
- `POST /api/v1/admin/fornecedores` - Criar fornecedor
- `PUT /api/v1/admin/fornecedores/{id}` - Atualizar fornecedor
- `DELETE /api/v1/admin/fornecedores/{id}` - Deletar fornecedor
- `GET /api/v1/admin/categorias` - Listar categorias
- `POST /api/v1/admin/categorias` - Criar categoria
- `PUT /api/v1/admin/categorias/{id}` - Atualizar categoria
- `DELETE /api/v1/admin/categorias/{id}` - Deletar categoria
- `GET /api/v1/admin/fornecedores/adesoes` - Listar adesões
- `GET /api/v1/admin/fornecedores/adesoes/{id}/audit-trail` - Auditoria de adesão
- `GET /api/v1/admin/dashboard` - Dashboard stats
- `GET /api/v1/admin/testemunhos` - Listar testemunhos
- `PUT /api/v1/admin/testemunhos/{id}` - Editar testemunho
- `DELETE /api/v1/admin/testemunhos/{id}` - Deletar testemunho

---

## 📞 Suporte

Caso encontre problemas:

1. **Verificar console do browser** para mensagens de erro
2. **Inspecionar network tab** das DevTools para ver requests/responses reais
3. **Confirmar que slugs estão lowercase** (importante em Linux)
4. **Testar com Postman** para isolar problemas de frontend
5. **Verificar headers Authorization** estão sendo enviados corretamente

---

**Versão do Documento:** 1.0  
**Compatível com:** Backend em Linux (Azure Functions) - 22/01/2026

n