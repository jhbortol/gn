# Painel Administrativo do Fornecedor - Especificação

**Data**: Dezembro de 2025  
**Versão**: 1.0

---

## 📋 Visão Geral

Sistema de autoadministração onde cada fornecedor pode gerenciar seus próprios dados através de um painel web separado.

### Princípios
- **Isolamento**: Cada fornecedor vê apenas seus próprios dados
- **Autenticação**: Login via email/senha com JWT
- **Autorização**: Role `Supplier` na API
- **Rotas isoladas**: `/painel` ou `/fornecedor-admin`

---

## 🎯 Funcionalidades

### 1. Autenticação
- **Login**: Email e senha
- **Logout**: Invalidar token
- **Recuperação de senha** (opcional, v2)

### 2. Dados do Fornecedor
Edição completa de todos os campos:
- Nome
- Slug (somente leitura ou validação de unicidade)
- Descrição (rich text)
- Cidade
- Telefone
- Email
- Website
- WhatsApp (se aplicável)
- Endereço completo
- Horário de funcionamento
- Redes sociais (Instagram, Facebook)
- Logo (upload)

### 3. Gerenciamento de Imagens
- **Listar imagens** do fornecedor
- **Upload de novas imagens** (múltiplos arquivos)
- **Definir imagem principal** (isPrimary)
- **Reordenar imagens** (drag & drop)
- **Deletar imagens**
- **Limites**: Máximo 20 imagens, tamanho máximo 5MB cada

### 4. Gerenciamento de Testemunhos (Depoimentos)
- **Criar novo testemunho** - Fornecedor cadastra depoimentos de clientes
- **Listar testemunhos** cadastrados
- **Editar testemunho** existente
- **Excluir testemunho**
- Campos: Nome do cliente, descrição do depoimento, rating (opcional), data

### 5. Dashboard (opcional, v1.1)
- Total de visualizações
- Testemunhos recebidos (últimos 30 dias)
- Mensagens de contato recebidas
- Posição no ranking da categoria

---

## 🎨 Estrutura de Rotas Frontend

```
/painel
  /login                    → Login do fornecedor
  /dashboard                → Dashboard inicial
  /perfil                   → Edição de dados do fornecedor
  /imagens                  → Galeria e upload de imagens
  /testemunhos              → Lista e moderação de testemunhos
  /mensagens                → Mensagens de contato recebidas (v2)
```

---

## 🔐 Modelo de Autenticação

### Tabela: Usuario (atualizada)
```sql
CREATE TABLE Usuarios (
  Id UNIQUEIDENTIFIER PRIMARY KEY,
  Email NVARCHAR(200) NOT NULL UNIQUE,
  PasswordHash NVARCHAR(500) NOT NULL,
  DisplayName NVARCHAR(200),
  Roles NVARCHAR(100) NOT NULL, -- 'Admin', 'Supplier'
  FornecedorId UNIQUEIDENTIFIER NULL, -- FK para Fornecedores
  IsActive BIT NOT NULL DEFAULT 1,
  CreatedAt DATETIMEOFFSET NOT NULL,
  UpdatedAt DATETIMEOFFSET NULL,
  FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(Id) ON DELETE SET NULL
);
```

### Fluxo de Login
1. Fornecedor envia `{ email, password }` para `POST /api/v1/auth/login`
2. API valida credenciais e retorna JWT com:
   - `userId`
   - `role: "Supplier"`
   - `fornecedorId` (claim adicional)
3. Frontend armazena token e `fornecedorId`
4. Todas as requisições incluem `Authorization: Bearer {token}`
5. API valida que `fornecedorId` na claim == `fornecedorId` no recurso acessado

---

## 📡 Requisitos da API (Novos/Faltantes)

### ✅ Já Existentes (baseado na spec atual)
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/register`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/testemunhos/fornecedor/{fornecedorId}`

### ❌ Faltantes (precisam ser implementados)

#### 1. Fornecedor - CRUD para próprio fornecedor
```http
GET /api/v1/supplier/me
```
Retorna dados completos do fornecedor autenticado.

```http
PUT /api/v1/supplier/me
```
Atualiza dados do fornecedor autenticado.
- **Body**: Todos os campos editáveis do fornecedor
- **Validação**: Fornecedor só pode editar seus próprios dados

```http
GET /api/v1/supplier/me/stats
```
Retorna estatísticas do fornecedor (visualizações, testemunhos, etc.)

---

#### 2. Imagens - CRUD para próprio fornecedor
```http
GET /api/v1/supplier/me/images
```
Lista todas as imagens do fornecedor autenticado.

```http
POST /api/v1/supplier/me/images
```
Upload de nova imagem (multipart/form-data ou presigned URL).
- **Body**: `{ file, isPrimary?, order? }`
- **Validações**:
  - Máximo 20 imagens por fornecedor
  - Tamanho máximo: 5MB
  - Formatos aceitos: jpg, jpeg, png, webp

```http
PATCH /api/v1/supplier/me/images/{imageId}/primary
```
Define imagem como principal.

```http
PATCH /api/v1/supplier/me/images/{imageId}/order
```
Atualiza a ordem de uma imagem.
- **Body**: `{ order: number }`
- **Comportamento**: Ao definir order=3, move a imagem para posição 3 e reorganiza as demais

```http
PATCH /api/v1/supplier/me/images/reorder
```
Reordena múltiplas imagens de uma vez (mais eficiente para drag & drop).
- **Body**: `{ imageIds: ["guid1", "guid2", "guid3"] }` (ordem desejada)
- **Comportamento**: Aplica OrderIndex sequencial (0, 1, 2...) baseado na ordem do array

```http
DELETE /api/v1/supplier/me/images/{imageId}
```
Deleta imagem do fornecedor autenticado.
- **Comportamento**: Reorganiza OrderIndex das imagens restantes

---

#### 3. Testemunhos - CRUD completo pelo fornecedor
```http
GET /api/v1/supplier/me/testemunhos
```
Lista testemunhos do fornecedor autenticado.
- **Query**: `page, pageSize`

```http
GET /api/v1/supplier/me/testemunhos/{id}
```
Detalhes de um testemunho específico.

```http
POST /api/v1/supplier/me/testemunhos
```
Cria novo testemunho.
- **Body**: `{ nome, descricao, rating?, data? }`
- **Nota**: Fornecedor cadastra depoimentos de clientes que recebeu

```http
PUT /api/v1/supplier/me/testemunhos/{id}
```
Atualiza testemunho existente.
- **Body**: `{ nome, descricao, rating?, data? }`

```http
DELETE /api/v1/supplier/me/testemunhos/{id}
```
Deleta testemunho.

---

#### 4. Contatos - Mensagens recebidas (v2)
```http
GET /api/v1/supplier/me/contacts
```
Lista mensagens de contato recebidas pelo fornecedor.
- **Query**: `page, pageSize, read` (true/false)

```http
PATCH /api/v1/supplier/me/contacts/{id}/read
```
Marca mensagem como lida.

---

#### 5. Upload de Mídia - Presigned URL
```http
POST /api/v1/supplier/me/media/presign
```
Gera presigned URL para upload direto ao storage.
- **Body**: `{ filename, contentType, imageType: 'gallery' | 'logo' }`
- **Response**: `{ uploadUrl, publicUrl, blobName, mediaId }`

```http
POST /api/v1/supplier/me/media/complete
```
Confirma upload concluído e associa ao fornecedor.
- **Body**: `{ mediaId, blobName }`

---

## 🔒 Autorização e Segurança

### Middleware de Autorização
```csharp
[Authorize(Roles = "Supplier")]
public class SupplierController : ControllerBase
{
    private Guid GetAuthenticatedFornecedorId()
    {
        var claim = User.FindFirst("fornecedorId");
        return Guid.Parse(claim.Value);
    }

    [HttpGet("me")]
    public async Task<IActionResult> GetMe()
    {
        var fornecedorId = GetAuthenticatedFornecedorId();
        var fornecedor = await _context.Fornecedores.FindAsync(fornecedorId);
        return Ok(fornecedor);
    }
}
```

### Validações Críticas
1. **Resource Ownership**: Sempre validar que `fornecedorId` no token == `fornecedorId` do recurso
2. **Role Check**: Apenas `Supplier` ou `Admin` podem acessar `/api/v1/supplier/*`
3. **Rate Limiting**: Limitar uploads de imagens (ex: 10 por hora)
4. **File Validation**: Validar tipo MIME, tamanho, dimensões de imagens

---

## 📊 Modelo de Dados Atualizado

### Fornecedor (campos adicionais recomendados)
```sql
ALTER TABLE Fornecedores ADD
  WhatsApp NVARCHAR(50) NULL,
  Endereco NVARCHAR(300) NULL,
  HorarioFuncionamento NVARCHAR(500) NULL, -- JSON ou texto livre
  Instagram NVARCHAR(200) NULL,
  Facebook NVARCHAR(200) NULL,
  LogoUrl NVARCHAR(500) NULL,
  Publicado BIT NOT NULL DEFAULT 0; -- Controle de visibilidade
```

### Media (campos adicionais)
```sql
ALTER TABLE Media ADD
  FornecedorId UNIQUEIDENTIFIER NULL,
  IsPrimary BIT NOT NULL DEFAULT 0,
  OrderIndex INT NOT NULL DEFAULT 0,
  ImageType NVARCHAR(50) NULL, -- 'gallery', 'logo', 'banner'
  FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(Id) ON DELETE CASCADE;

-- Índice para ordenação e query por fornecedor
CREATE INDEX IX_Media_FornecedorId_OrderIndex 
  ON Media (FornecedorId, OrderIndex);

-- Constraint: apenas uma imagem primary por fornecedor
CREATE UNIQUE INDEX IX_Media_Fornecedor_Primary 
  ON Media (FornecedorId) 
  WHERE IsPrimary = 1;
```

**Lógica de Ordenação:**
1. Ao listar imagens: `ORDER BY OrderIndex ASC, CreatedAt ASC`
2. Ao inserir nova imagem: `OrderIndex = MAX(OrderIndex) + 1`
3. Ao deletar imagem: Reorganizar OrderIndex das imagens com índice maior
4. Ao reordenar (drag & drop): Atualizar OrderIndex de todas as imagens afetadas

### Testemunhos (campos recomendados)
```sql
-- Campos existentes (baseado em CHANGELOG-TESTEMUNHOS.md):
-- Id, FornecedorId, Nome, Descricao, CreatedAt

-- Campos adicionais recomendados:
ALTER TABLE Testemunhos ADD
  Rating DECIMAL(3,2) NULL, -- Avaliação (0-5)
  Data DATETIMEOFFSET NULL, -- Data do serviço/evento
  UpdatedAt DATETIMEOFFSET NULL;
```

**Nota:** Não há sistema de aprovação - fornecedor cria e gerencia diretamente seus testemunhos.

### ContatoSubmission (adicionar isRead)
```sql
ALTER TABLE ContatoSubmissions ADD
  IsRead BIT NOT NULL DEFAULT 0,
  ReadAt DATETIMEOFFSET NULL;
```

---

## 🎨 Componentes Frontend

### 1. Login Page (`/painel/login`)
- Form com email + senha
- Link para recuperação de senha (v2)
- Erro handling (credenciais inválidas)

### 2. Dashboard (`/painel/dashboard`)
- Cards com métricas:
  - Total de visualizações
  - Testemunhos pendentes
  - Rating médio
  - Mensagens não lidas
- Gráfico de visualizações (opcional)

### 3. Perfil (`/painel/perfil`)
- Form com todos os campos do fornecedor
- Upload de logo
- Preview do perfil público
- Botão "Salvar alterações"

### 4. Galeria de Imagens (`/painel/imagens`)
- Grid de imagens ordenadas por `OrderIndex`
- Botão "Upload de imagens" (múltiplos arquivos)
- **Drag & drop para reordenar**:
  - Biblioteca recomendada: `@angular/cdk/drag-drop` ou `ngx-sortable`
  - Ao soltar, chama `PATCH /api/v1/supplier/me/images/reorder`
  - Visual feedback durante drag (placeholder, ghost image)
- Badge "Principal" na imagem primary
- Botão "Definir como principal"
- Botão "Excluir" (reorganiza automaticamente)
- Indicador visual da ordem (números 1, 2, 3...)

### 5. Testemunhos (`/painel/testemunhos`)
- Botão "Novo Testemunho"
- Lista de testemunhos cadastrados:
  - Nome do cliente, descrição, rating, data
  - Botões "Editar" / "Excluir"
- Paginação
- Modal/Form para criar/editar:
  - Campo: Nome do cliente (obrigatório)
  - Campo: Depoimento (textarea, obrigatório)
  - Campo: Rating (0-5 estrelas, opcional)
  - Campo: Data do serviço (date picker, opcional)

---

## 🔄 Implementação da Ordenação de Imagens

### Backend (C# / .NET)

#### Exemplo: Reordenar múltiplas imagens
```csharp
[HttpPatch("me/images/reorder")]
[Authorize(Roles = "Supplier")]
public async Task<IActionResult> ReorderImages([FromBody] ReorderImagesRequest request)
{
    var fornecedorId = GetAuthenticatedFornecedorId();
    
    var images = await _context.Media
        .Where(m => m.FornecedorId == fornecedorId && request.ImageIds.Contains(m.Id))
        .ToListAsync();
    
    // Validar que todas as imagens pertencem ao fornecedor
    if (images.Count != request.ImageIds.Count)
        return BadRequest("Algumas imagens não foram encontradas");
    
    // Aplicar nova ordem
    for (int i = 0; i < request.ImageIds.Count; i++)
    {
        var image = images.First(img => img.Id == request.ImageIds[i]);
        image.OrderIndex = i;
        image.UpdatedAt = DateTimeOffset.UtcNow;
    }
    
    await _context.SaveChangesAsync();
    return NoContent();
}
```

#### Exemplo: Reorganizar após deletar
```csharp
[HttpDelete("me/images/{imageId}")]
[Authorize(Roles = "Supplier")]
public async Task<IActionResult> DeleteImage(Guid imageId)
{
    var fornecedorId = GetAuthenticatedFornecedorId();
    var image = await _context.Media.FirstOrDefaultAsync(m => 
        m.Id == imageId && m.FornecedorId == fornecedorId);
    
    if (image == null) return NotFound();
    
    var deletedOrder = image.OrderIndex;
    _context.Media.Remove(image);
    
    // Reorganizar imagens com OrderIndex maior
    var imagesToReorder = await _context.Media
        .Where(m => m.FornecedorId == fornecedorId && m.OrderIndex > deletedOrder)
        .ToListAsync();
    
    foreach (var img in imagesToReorder)
    {
        img.OrderIndex--;
    }
    
    await _context.SaveChangesAsync();
    return NoContent();
}
```

### Frontend (Angular)

#### Exemplo: Componente de galeria com drag & drop
```typescript
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-galeria-fornecedor',
  template: `
    <div cdkDropList (cdkDropListDropped)="onDrop($event)" class="image-grid">
      <div *ngFor="let img of images; let i = index" 
           cdkDrag 
           class="image-item">
        <span class="order-badge">{{ i + 1 }}</span>
        <img [src]="img.url" [alt]="img.filename">
        <span *ngIf="img.isPrimary" class="primary-badge">Principal</span>
        <button (click)="setPrimary(img.id)">Definir como principal</button>
        <button (click)="deleteImage(img.id)">Excluir</button>
      </div>
    </div>
  `
})
export class GaleriaFornecedorComponent {
  images: MediaDto[] = [];
  
  async onDrop(event: CdkDragDrop<MediaDto[]>) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
    
    // Enviar nova ordem para API
    const imageIds = this.images.map(img => img.id);
    await this.supplierService.reorderImages(imageIds).toPromise();
  }
  
  async deleteImage(imageId: string) {
    await this.supplierService.deleteImage(imageId).toPromise();
    // Recarregar lista
    this.loadImages();
  }
  
  async setPrimary(imageId: string) {
    await this.supplierService.setPrimaryImage(imageId).toPromise();
    this.loadImages();
  }
}
```

#### Service
```typescript
@Injectable({ providedIn: 'root' })
export class SupplierService {
  constructor(private http: HttpClient) {}
  
  reorderImages(imageIds: string[]): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/supplier/me/images/reorder`,
      { imageIds }
    );
  }
  
  deleteImage(imageId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/supplier/me/images/${imageId}`
    );
  }
  
  setPrimaryImage(imageId: string): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/supplier/me/images/${imageId}/primary`,
      {}
    );
  }
}
```

---

## 🚀 Implementação Recomendada

### Fase 1 (MVP)
1. Criar tabela `Usuarios` com FK para `Fornecedores`
2. Implementar endpoints `/api/v1/supplier/me/*`
3. Criar painel de login (`/painel/login`)
4. Criar página de perfil com edição de dados básicos
5. Implementar upload de imagens (presigned URL)
6. Criar galeria de imagens com delete e set primary

### Fase 2
1. Dashboard com estatísticas
2. CRUD de testemunhos (criar/editar/excluir)
3. Reordenação de imagens (drag & drop)
4. Preview do perfil público

### Fase 3 (Melhorias)
1. Recuperação de senha
2. Mensagens de contato recebidas
3. Notificações por email (novo testemunho, nova mensagem)
4. Upload de múltiplas imagens simultâneas
5. Crop/resize de imagens no frontend

---

## 📋 Checklist de Requisitos da API

### Autenticação
- [x] `POST /api/v1/auth/login` (já existe)
- [x] `POST /api/v1/auth/register` (já existe)
- [ ] Adicionar claim `fornecedorId` no JWT para role `Supplier`
- [ ] Criar usuários tipo `Supplier` vinculados a fornecedores

### Fornecedor
- [ ] `GET /api/v1/supplier/me` - Retorna dados do fornecedor autenticado
- [ ] `PUT /api/v1/supplier/me` - Atualiza dados do fornecedor autenticado
- [ ] `GET /api/v1/supplier/me/stats` - Estatísticas do fornecedor

### Imagens
- [ ] `GET /api/v1/supplier/me/images` - Lista imagens
- [ ] `POST /api/v1/supplier/me/images` - Upload de imagem
- [ ] `PATCH /api/v1/supplier/me/images/{id}/primary` - Define imagem principal
- [ ] `PATCH /api/v1/supplier/me/images/{id}/order` - Reordena imagens
- [ ] `DELETE /api/v1/supplier/me/images/{id}` - Deleta imagem
- [ ] Validação: máximo 20 imagens por fornecedor
- [ ] Validação: tamanho máximo 5MB por imagem

### Testemunhos
- [x] `GET /api/v1/testemunhos/fornecedor/{id}` (já existe, público)
- [ ] `GET /api/v1/supplier/me/testemunhos` - Lista testemunhos do fornecedor
- [ ] `GET /api/v1/supplier/me/testemunhos/{id}` - Detalhes de um testemunho
- [ ] `POST /api/v1/supplier/me/testemunhos` - Cria novo testemunho
- [ ] `PUT /api/v1/supplier/me/testemunhos/{id}` - Atualiza testemunho
- [ ] `DELETE /api/v1/supplier/me/testemunhos/{id}` - Deleta testemunho
- [ ] Adicionar campos opcionais: Rating, Data, UpdatedAt

### Upload de Mídia
- [ ] `POST /api/v1/supplier/me/media/presign` - Gera presigned URL
- [ ] `POST /api/v1/supplier/me/media/complete` - Confirma upload

### Contatos (v2)
- [ ] `GET /api/v1/supplier/me/contacts` - Lista mensagens recebidas
- [ ] `PATCH /api/v1/supplier/me/contacts/{id}/read` - Marca como lida

### Banco de Dados
- [ ] Adicionar FK `FornecedorId` na tabela `Usuarios`
- [ ] Adicionar campos adicionais em `Fornecedores`: WhatsApp, Endereco, HorarioFuncionamento, Instagram, Facebook, LogoUrl, Publicado
- [ ] Adicionar campos em `Media`: FornecedorId (FK), IsPrimary, OrderIndex, ImageType
- [ ] Adicionar campos em `Testemunhos`: Status, ReviewedAt, ReviewedBy
- [ ] Adicionar campos em `ContatoSubmissions`: IsRead, ReadAt

---

## 🎯 Próximos Passos

1. **Backend**: Implementar endpoints listados acima
2. **Frontend**: Criar módulo `/painel` com:
   - Roteamento separado
   - Guards de autenticação (verificar role `Supplier`)
   - Componentes de formulário para edição
   - Upload de imagens com preview
3. **Testes**: Garantir que fornecedor A não acessa dados de fornecedor B

---

## 📌 Notas Importantes

- **Isolamento de dados**: Sempre validar `fornecedorId` no backend
- **Publicação**: Adicionar campo `Publicado` para controlar se fornecedor aparece no site público
- **Aprovação de testemunhos**: Testemunhos só aparecem no site após aprovação do fornecedor
- **Ordem de imagens**: Manter `OrderIndex` para controlar ordem de exibição
