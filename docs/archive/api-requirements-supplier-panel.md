# Requisitos da API - Painel Administrativo do Fornecedor

**Data**: Dezembro de 2025  
**Versão**: 1.0  
**Projeto**: Guia de Noivas Piracicaba

---

## 📋 Visão Geral

Implementar endpoints da API para permitir que fornecedores façam autoadministração de seus dados através de um painel web dedicado.

### Princípios de Segurança
- **Isolamento**: Fornecedor só acessa seus próprios dados
- **Autenticação**: JWT com claim `fornecedorId`
- **Autorização**: Role `Supplier`
- **Validação**: Sempre verificar ownership dos recursos

---

## 🗄️ Alterações no Banco de Dados

### 1. Tabela `Usuarios` - Adicionar FK para Fornecedores

```sql
-- Se a tabela Usuarios não existir, criar:
CREATE TABLE Usuarios (
  Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
  Email NVARCHAR(200) NOT NULL UNIQUE,
  PasswordHash NVARCHAR(500) NOT NULL,
  DisplayName NVARCHAR(200),
  Roles NVARCHAR(100) NOT NULL, -- 'Admin', 'Supplier'
  FornecedorId UNIQUEIDENTIFIER NULL,
  IsActive BIT NOT NULL DEFAULT 1,
  CreatedAt DATETIMEOFFSET NOT NULL DEFAULT SYSUTCDATETIME(),
  UpdatedAt DATETIMEOFFSET NULL,
  CONSTRAINT FK_Usuarios_Fornecedores FOREIGN KEY (FornecedorId) 
    REFERENCES Fornecedores(Id) ON DELETE SET NULL
);

CREATE INDEX IX_Usuarios_Email ON Usuarios(Email);
CREATE INDEX IX_Usuarios_FornecedorId ON Usuarios(FornecedorId);
```

**Se a tabela já existir:**
```sql
ALTER TABLE Usuarios ADD FornecedorId UNIQUEIDENTIFIER NULL;

ALTER TABLE Usuarios ADD CONSTRAINT FK_Usuarios_Fornecedores 
  FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(Id) ON DELETE SET NULL;

CREATE INDEX IX_Usuarios_FornecedorId ON Usuarios(FornecedorId);
```

---

### 2. Tabela `Fornecedores` - Campos Adicionais

```sql
ALTER TABLE Fornecedores ADD
  WhatsApp NVARCHAR(50) NULL,
  Endereco NVARCHAR(300) NULL,
  HorarioFuncionamento NVARCHAR(500) NULL,
  Instagram NVARCHAR(200) NULL,
  Facebook NVARCHAR(200) NULL,
  LogoUrl NVARCHAR(500) NULL,
  Publicado BIT NOT NULL DEFAULT 0;
```

---

### 3. Tabela `Media` - Campos para Ordenação e Tipo

```sql
ALTER TABLE Media ADD
  FornecedorId UNIQUEIDENTIFIER NULL,
  IsPrimary BIT NOT NULL DEFAULT 0,
  OrderIndex INT NOT NULL DEFAULT 0,
  ImageType NVARCHAR(50) NULL, -- 'gallery', 'logo', 'banner'
  UpdatedAt DATETIMEOFFSET NULL;

ALTER TABLE Media ADD CONSTRAINT FK_Media_Fornecedores 
  FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(Id) ON DELETE CASCADE;

-- Índice para performance em queries ordenadas
CREATE INDEX IX_Media_FornecedorId_OrderIndex 
  ON Media (FornecedorId, OrderIndex);

-- Apenas uma imagem primary por fornecedor
CREATE UNIQUE INDEX IX_Media_Fornecedor_Primary 
  ON Media (FornecedorId) 
  WHERE IsPrimary = 1;
```

---

### 4. Tabela `Testemunhos` - Campos Adicionais

```sql
-- Se a tabela não existir, criar conforme CHANGELOG-TESTEMUNHOS.md

-- Adicionar campos opcionais:
ALTER TABLE Testemunhos ADD
  Rating DECIMAL(3,2) NULL,
  Data DATETIMEOFFSET NULL,
  UpdatedAt DATETIMEOFFSET NULL;
```

---

## 🔐 Autenticação e Autorização

### JWT - Adicionar Claim `fornecedorId`

Ao fazer login de um usuário com role `Supplier`, incluir claim adicional:

```csharp
var claims = new List<Claim>
{
    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
    new Claim(ClaimTypes.Email, user.Email),
    new Claim(ClaimTypes.Role, user.Roles),
    new Claim("fornecedorId", user.FornecedorId.ToString()) // <-- ADICIONAR
};
```

### Helper para Obter FornecedorId Autenticado

```csharp
private Guid GetAuthenticatedFornecedorId()
{
    var claim = User.FindFirst("fornecedorId");
    if (claim == null)
        throw new UnauthorizedAccessException("Fornecedor não identificado");
    
    return Guid.Parse(claim.Value);
}
```

---

## 📡 Endpoints a Implementar

### Namespace: `/api/v1/supplier`
**Autenticação**: Obrigatória (JWT Bearer)  
**Autorização**: Role `Supplier` ou `Admin`

---

## 1️⃣ Fornecedor - Dados Próprios

### `GET /api/v1/supplier/me`
Retorna dados completos do fornecedor autenticado.

**Headers:**
```
Authorization: Bearer {token}
```

**Response 200:**
```json
{
  "id": "guid",
  "nome": "Doce Sonho Bolos",
  "slug": "doce-sonho-bolos",
  "descricao": "Bolos artísticos...",
  "cidade": "Piracicaba",
  "telefone": "19 99999-9999",
  "email": "contato@docesonho.com",
  "website": "https://docesonho.com",
  "whatsApp": "5519999999999",
  "endereco": "Rua das Flores, 123",
  "horarioFuncionamento": "Seg-Sex: 9h-18h",
  "instagram": "@docesonho",
  "facebook": "facebook.com/docesonho",
  "logoUrl": "https://...",
  "destaque": true,
  "seloFornecedor": true,
  "rating": 4.8,
  "visitas": 1520,
  "publicado": true,
  "categorias": [
    { "id": "guid", "nome": "Confeitaria", "slug": "confeitaria" }
  ]
}
```

**Response 404:** Fornecedor não encontrado ou usuário não vinculado a fornecedor

---

### `PUT /api/v1/supplier/me`
Atualiza dados do fornecedor autenticado.

**Body:**
```json
{
  "nome": "Doce Sonho Bolos Artísticos",
  "descricao": "Bolos personalizados...",
  "cidade": "Piracicaba",
  "telefone": "19 99999-9999",
  "email": "contato@docesonho.com",
  "website": "https://docesonho.com",
  "whatsApp": "5519999999999",
  "endereco": "Rua das Flores, 123",
  "horarioFuncionamento": "Seg-Sex: 9h-18h, Sáb: 9h-13h",
  "instagram": "@docesonho",
  "facebook": "facebook.com/docesonho"
}
```

**Validações:**
- Nome: obrigatório, max 200 caracteres
- Email: formato válido
- WhatsApp: apenas números
- URLs: formato válido

**Response 200:**
```json
{
  "id": "guid",
  "nome": "Doce Sonho Bolos Artísticos",
  ...
}
```

**Response 400:** Validação falhou  
**Response 404:** Fornecedor não encontrado

**Notas:**
- Campos `destaque`, `seloFornecedor`, `rating`, `visitas`, `publicado` **NÃO** devem ser editáveis pelo fornecedor
- Slug não deve ser editável (ou validar unicidade)

---

### `GET /api/v1/supplier/me/stats`
Retorna estatísticas do fornecedor autenticado.

**Response 200:**
```json
{
  "totalVisualizacoes": 1520,
  "testemunhos": 12,
  "rating": 4.8,
  "imagens": 8,
  "ultimasVisualizacoes": [
    { "data": "2025-12-06", "quantidade": 15 },
    { "data": "2025-12-05", "quantidade": 22 }
  ]
}
```

---

## 2️⃣ Imagens - Gerenciamento

### `GET /api/v1/supplier/me/images`
Lista todas as imagens do fornecedor autenticado, ordenadas por `OrderIndex`.

**Query Parameters:**
- Nenhum (retorna todas)

**Response 200:**
```json
{
  "data": [
    {
      "id": "guid",
      "url": "https://...",
      "filename": "bolo-casamento.jpg",
      "contentType": "image/jpeg",
      "width": 1920,
      "height": 1080,
      "isPrimary": true,
      "orderIndex": 0,
      "imageType": "gallery",
      "createdAt": "2025-11-20T10:30:00Z"
    }
  ]
}
```

---

### `POST /api/v1/supplier/me/images`
Upload de nova imagem (multipart/form-data).

**Body (multipart/form-data):**
```
file: [binary]
isPrimary: false
imageType: "gallery"
```

**Validações:**
- Tamanho máximo: 5MB
- Formatos aceitos: jpg, jpeg, png, webp
- Máximo 20 imagens por fornecedor
- Se `isPrimary=true`, desmarcar outras imagens como primary

**Comportamento:**
- `OrderIndex` = MAX(OrderIndex) + 1
- Fazer resize/otimização (opcional)

**Response 201:**
```json
{
  "id": "guid",
  "url": "https://...",
  "orderIndex": 7,
  "isPrimary": false
}
```

**Response 400:** Validação falhou (tamanho, formato, limite)

---

### `PATCH /api/v1/supplier/me/images/{imageId}/primary`
Define imagem como principal.

**Body:** `{}` (vazio)

**Comportamento:**
- Marcar `isPrimary=true` na imagem especificada
- Desmarcar `isPrimary=false` em todas as outras imagens do fornecedor

**Response 204:** No Content  
**Response 404:** Imagem não encontrada ou não pertence ao fornecedor

---

### `PATCH /api/v1/supplier/me/images/{imageId}/order`
Atualiza ordem de uma imagem específica.

**Body:**
```json
{
  "order": 2
}
```

**Comportamento:**
- Move imagem para posição especificada
- Reorganiza OrderIndex das outras imagens

**Response 204:** No Content  
**Response 400:** Order inválido  
**Response 404:** Imagem não encontrada

---

### `PATCH /api/v1/supplier/me/images/reorder`
Reordena múltiplas imagens de uma vez (mais eficiente para drag & drop).

**Body:**
```json
{
  "imageIds": [
    "guid-3",
    "guid-1",
    "guid-5",
    "guid-2"
  ]
}
```

**Comportamento:**
- Aplica `OrderIndex` sequencial (0, 1, 2, 3...) baseado na ordem do array
- Valida que todos os IDs pertencem ao fornecedor

**Response 204:** No Content  
**Response 400:** IDs inválidos ou não pertencem ao fornecedor

---

### `DELETE /api/v1/supplier/me/images/{imageId}`
Deleta imagem do fornecedor autenticado.

**Comportamento:**
- Remove imagem do storage (Blob ou filesystem)
- Remove registro do banco
- Reorganiza `OrderIndex` das imagens restantes (decrementa índices maiores)

**Response 204:** No Content  
**Response 404:** Imagem não encontrada ou não pertence ao fornecedor

---

## 3️⃣ Testemunhos - CRUD Completo

### `GET /api/v1/supplier/me/testemunhos`
Lista testemunhos do fornecedor autenticado.

**Query Parameters:**
- `page` (default: 1)
- `pageSize` (default: 10)

**Response 200:**
```json
{
  "data": [
    {
      "id": "guid",
      "nome": "Maria Silva",
      "descricao": "Serviço excelente! O bolo estava perfeito.",
      "rating": 5.0,
      "data": "2025-10-15T00:00:00Z",
      "createdAt": "2025-11-20T10:30:00Z",
      "updatedAt": null
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

### `GET /api/v1/supplier/me/testemunhos/{id}`
Detalhes de um testemunho específico.

**Response 200:**
```json
{
  "id": "guid",
  "nome": "Maria Silva",
  "descricao": "Serviço excelente!",
  "rating": 5.0,
  "data": "2025-10-15T00:00:00Z",
  "createdAt": "2025-11-20T10:30:00Z"
}
```

**Response 404:** Testemunho não encontrado ou não pertence ao fornecedor

---

### `POST /api/v1/supplier/me/testemunhos`
Cria novo testemunho (fornecedor cadastra depoimento de cliente).

**Body:**
```json
{
  "nome": "João Santos",
  "descricao": "Ótimo atendimento, super recomendo!",
  "rating": 4.5,
  "data": "2025-11-01T00:00:00Z"
}
```

**Validações:**
- `nome`: obrigatório, max 200 caracteres
- `descricao`: obrigatório, max 2000 caracteres
- `rating`: opcional, entre 0 e 5
- `data`: opcional

**Response 201:**
```json
{
  "id": "guid",
  "nome": "João Santos",
  "descricao": "Ótimo atendimento...",
  "rating": 4.5,
  "data": "2025-11-01T00:00:00Z",
  "createdAt": "2025-12-06T14:20:00Z"
}
```

**Response 400:** Validação falhou

---

### `PUT /api/v1/supplier/me/testemunhos/{id}`
Atualiza testemunho existente.

**Body:**
```json
{
  "nome": "João Pedro Santos",
  "descricao": "Excelente atendimento e produto de qualidade!",
  "rating": 5.0,
  "data": "2025-11-01T00:00:00Z"
}
```

**Response 200:**
```json
{
  "id": "guid",
  "nome": "João Pedro Santos",
  ...
  "updatedAt": "2025-12-06T15:00:00Z"
}
```

**Response 400:** Validação falhou  
**Response 404:** Testemunho não encontrado ou não pertence ao fornecedor

---

### `DELETE /api/v1/supplier/me/testemunhos/{id}`
Deleta testemunho.

**Response 204:** No Content  
**Response 404:** Testemunho não encontrado ou não pertence ao fornecedor

---

## 4️⃣ Upload de Mídia (Presigned URL) - Opcional/Recomendado

### `POST /api/v1/supplier/me/media/presign`
Gera presigned URL para upload direto ao storage (Azure Blob ou S3).

**Body:**
```json
{
  "filename": "bolo-chocolate.jpg",
  "contentType": "image/jpeg",
  "imageType": "gallery"
}
```

**Response 200:**
```json
{
  "uploadUrl": "https://storage.azure.com/...?sas-token",
  "publicUrl": "https://cdn.guianoivas.com/...",
  "blobName": "fornecedores/guid/bolo-chocolate-uuid.jpg",
  "mediaId": "guid"
}
```

**Fluxo:**
1. Frontend chama `/presign` e obtém `uploadUrl` e `mediaId`
2. Frontend faz PUT direto ao `uploadUrl` com o arquivo
3. Frontend chama `/complete` para confirmar upload

---

### `POST /api/v1/supplier/me/media/complete`
Confirma que upload foi concluído e associa ao fornecedor.

**Body:**
```json
{
  "mediaId": "guid",
  "blobName": "fornecedores/guid/bolo-chocolate-uuid.jpg"
}
```

**Response 201:**
```json
{
  "id": "guid",
  "url": "https://cdn.guianoivas.com/...",
  "orderIndex": 8
}
```

---

## 5️⃣ Endpoints Existentes (Já Implementados)

### Autenticação (já existe)
- ✅ `POST /api/v1/auth/login`
- ✅ `POST /api/v1/auth/register`
- ✅ `POST /api/v1/auth/refresh`
- ✅ `POST /api/v1/auth/logout`

**Ajuste necessário**: Adicionar claim `fornecedorId` no JWT para usuários com role `Supplier`

### Testemunhos Público (já existe)
- ✅ `GET /api/v1/testemunhos/fornecedor/{fornecedorId}` (público)

---

## 🔒 Validações de Segurança Críticas

### 1. Resource Ownership
```csharp
// SEMPRE validar antes de qualquer operação
var fornecedorId = GetAuthenticatedFornecedorId();
var image = await _context.Media.FirstOrDefaultAsync(m => 
    m.Id == imageId && m.FornecedorId == fornecedorId);

if (image == null)
    return NotFound(); // Retorna 404 mesmo se existir, para não vazar informação
```

### 2. Role Check
```csharp
[Authorize(Roles = "Supplier,Admin")]
public class SupplierController : ControllerBase
{
    // ...
}
```

### 3. Rate Limiting
- Uploads de imagens: máximo 10 por hora
- Criação de testemunhos: máximo 20 por dia

### 4. File Validation
- Validar MIME type no servidor (não confiar no Content-Type do request)
- Validar magic bytes do arquivo
- Limitar tamanho: 5MB por imagem
- Sanitizar filename
- Gerar nome único (UUID) para evitar conflitos

---

## 📊 Tabela Resumo de Endpoints

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| **Fornecedor** |
| GET | `/api/v1/supplier/me` | Dados do fornecedor autenticado |
| PUT | `/api/v1/supplier/me` | Atualizar dados |
| GET | `/api/v1/supplier/me/stats` | Estatísticas |
| **Imagens** |
| GET | `/api/v1/supplier/me/images` | Listar imagens |
| POST | `/api/v1/supplier/me/images` | Upload de imagem |
| PATCH | `/api/v1/supplier/me/images/{id}/primary` | Definir como principal |
| PATCH | `/api/v1/supplier/me/images/{id}/order` | Atualizar ordem |
| PATCH | `/api/v1/supplier/me/images/reorder` | Reordenar múltiplas |
| DELETE | `/api/v1/supplier/me/images/{id}` | Deletar imagem |
| **Testemunhos** |
| GET | `/api/v1/supplier/me/testemunhos` | Listar testemunhos |
| GET | `/api/v1/supplier/me/testemunhos/{id}` | Detalhes |
| POST | `/api/v1/supplier/me/testemunhos` | Criar testemunho |
| PUT | `/api/v1/supplier/me/testemunhos/{id}` | Atualizar |
| DELETE | `/api/v1/supplier/me/testemunhos/{id}` | Deletar |
| **Media (Presigned)** |
| POST | `/api/v1/supplier/me/media/presign` | Gerar URL de upload |
| POST | `/api/v1/supplier/me/media/complete` | Confirmar upload |

---

## 🧪 Casos de Teste Importantes

### Teste 1: Isolamento de Dados
- Fornecedor A não pode acessar/editar dados do Fornecedor B
- Retornar 404 (não 403) para não vazar existência do recurso

### Teste 2: Ordenação de Imagens
- Ao inserir nova imagem, OrderIndex = MAX + 1
- Ao deletar imagem no meio, reorganizar índices
- Ao reordenar, validar que todos os IDs pertencem ao fornecedor

### Teste 3: Imagem Primary
- Apenas uma imagem primary por fornecedor
- Ao definir nova primary, desmarcar a anterior

### Teste 4: Limite de Imagens
- Não permitir mais de 20 imagens por fornecedor
- Retornar erro 400 com mensagem clara

### Teste 5: Validação de Arquivos
- Rejeitar arquivos > 5MB
- Rejeitar formatos não permitidos
- Validar magic bytes (não apenas extensão)

---

## 📋 Checklist de Implementação

### Database
- [ ] Criar/alterar tabela `Usuarios` com FK `FornecedorId`
- [ ] Adicionar campos em `Fornecedores`: WhatsApp, Endereco, etc.
- [ ] Adicionar campos em `Media`: FornecedorId, IsPrimary, OrderIndex
- [ ] Adicionar campos em `Testemunhos`: Rating, Data, UpdatedAt
- [ ] Criar índices recomendados
- [ ] Criar constraint de imagem primary única

### Authentication
- [ ] Adicionar claim `fornecedorId` no JWT para role Supplier
- [ ] Criar seed para usuários Supplier de teste

### Endpoints - Fornecedor
- [ ] GET /api/v1/supplier/me
- [ ] PUT /api/v1/supplier/me
- [ ] GET /api/v1/supplier/me/stats

### Endpoints - Imagens
- [ ] GET /api/v1/supplier/me/images
- [ ] POST /api/v1/supplier/me/images
- [ ] PATCH /api/v1/supplier/me/images/{id}/primary
- [ ] PATCH /api/v1/supplier/me/images/reorder
- [ ] DELETE /api/v1/supplier/me/images/{id}
- [ ] Implementar lógica de reorganização de OrderIndex

### Endpoints - Testemunhos
- [ ] GET /api/v1/supplier/me/testemunhos
- [ ] GET /api/v1/supplier/me/testemunhos/{id}
- [ ] POST /api/v1/supplier/me/testemunhos
- [ ] PUT /api/v1/supplier/me/testemunhos/{id}
- [ ] DELETE /api/v1/supplier/me/testemunhos/{id}

### Validations & Security
- [ ] Validar resource ownership em todos os endpoints
- [ ] Implementar rate limiting
- [ ] Validar uploads (tamanho, tipo, magic bytes)
- [ ] Sanitizar filenames
- [ ] Testes de isolamento de dados

### Documentation
- [ ] Atualizar Swagger com novos endpoints
- [ ] Documentar exemplos de requests/responses
- [ ] Documentar códigos de erro

---

## 🚀 Priorização Sugerida

### Fase 1 (MVP) - 2 semanas
1. Alterações de banco de dados
2. Claim `fornecedorId` no JWT
3. Endpoints de fornecedor (GET/PUT me)
4. CRUD de imagens (sem presigned URL, upload direto)
5. CRUD de testemunhos

### Fase 2 - 1 semana
1. Reordenação de imagens (drag & drop)
2. Set primary image
3. Estatísticas (GET me/stats)
4. Presigned URLs para upload

### Fase 3 - 1 semana
1. Rate limiting
2. Testes de integração
3. Documentação Swagger completa

---

## 📞 Dúvidas?

Entre em contato caso haja dúvidas sobre:
- Estrutura das tabelas existentes
- Fluxo de autenticação atual
- Storage de mídia (Blob ou filesystem)
- Qualquer outro detalhe de implementação

---

**Documento gerado para**: Time de Backend  
**Data**: 06/12/2025  
**Contato**: [Seu contato]
