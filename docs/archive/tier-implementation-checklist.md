# Implementação do Modelo de Tier (Free/Vitrine) - Lista Completa de Ajustes

## 📋 OVERVIEW
- **Status atual**: Fornecedores existentes com role=supplier → migrar para PlanLevel=Vitrine
- **Novo modelo**: Free (com fricção), Vitrine (premium pago)
- **Lead counting**: Free precisa de tracking LeadCount por fornecedor

---

## 🔴 BACKEND (.NET 9) - Ajustes Prioritários

### 1. MODEL CHANGES (Database/EF Core)

#### 1.1 Estender tabela `Fornecedores`
```csharp
// Adicionar campos na migração
public class Fornecedor
{
    // ... campos existentes ...
    
    // NOVO: Modelo de Tier
    public enum PlanLevel { Free = 0, Vitrine = 1 }
    public PlanLevel PlanLevel { get; set; } = PlanLevel.Free;
    
    // NOVO: Contador de leads
    public int LeadCount { get; set; } = 0;
    
    // NOVO: Data de último reset (para controle futuro)
    public DateTime? LastLeadReset { get; set; }
    
    // NOVO: Status de pagamento (para automação)
    public string StripeSubscriptionId { get; set; }
    public DateTime? SubscriptionExpiresAt { get; set; }
}
```

**Migration SQL:**
```sql
ALTER TABLE Fornecedores ADD 
    PlanLevel INT NOT NULL DEFAULT 0,
    LeadCount INT NOT NULL DEFAULT 0,
    LastLeadReset DATETIME2 NULL,
    StripeSubscriptionId NVARCHAR(MAX) NULL,
    SubscriptionExpiresAt DATETIME2 NULL;

CREATE INDEX IX_Fornecedores_PlanLevel ON Fornecedores(PlanLevel DESC, UpdatedAt DESC);
```

#### 1.2 Nova tabela `FornecedorLeads`
```csharp
public class FornecedorLead
{
    public Guid Id { get; set; }
    public Guid FornecedorId { get; set; }
    public Guid? NoivaId { get; set; } // Null se não logada
    
    // Dados da noiva
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Telefone { get; set; }
    public string Mensagem { get; set; }
    
    // Metadados
    public DateTime DataCriacao { get; set; }
    public string IpOrigem { get; set; }
    public bool Lido { get; set; } = false;
    public DateTime? DataLeitura { get; set; }
    
    // Relacionamento
    public Fornecedor Fornecedor { get; set; }
}
```

**Migration SQL:**
```sql
CREATE TABLE FornecedorLeads (
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    FornecedorId UNIQUEIDENTIFIER NOT NULL,
    NoivaId UNIQUEIDENTIFIER NULL,
    Nome NVARCHAR(200) NOT NULL,
    Email NVARCHAR(200) NOT NULL,
    Telefone NVARCHAR(20) NOT NULL,
    Mensagem NVARCHAR(MAX),
    DataCriacao DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    IpOrigem NVARCHAR(50),
    Lido BIT NOT NULL DEFAULT 0,
    DataLeitura DATETIME2 NULL,
    FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(Id)
);

CREATE INDEX IX_FornecedorLeads_FornecedorId ON FornecedorLeads(FornecedorId, DataCriacao DESC);
CREATE INDEX IX_FornecedorLeads_Lido ON FornecedorLeads(Lido);
```

---

### 2. DTO CHANGES (API Response)

#### 2.1 Criar `VendorPublicDto` com lógica de tier

```csharp
public class VendorPublicDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string Slug { get; set; }
    public string Descricao { get; set; }
    public string Cidade { get; set; }
    
    // NOVO: Dados de contato (sanitizados conforme tier)
    public string PhoneDisplay { get; set; } // "19 99999-9999" (sempre texto)
    public string WhatsAppUrl { get; set; } // NULL se Free, ou "https://wa.me/..." se Vitrine
    public bool ShowContactForm { get; set; } // TRUE se Free com leads restantes, FALSE caso contrário
    
    // NOVO: Publicidade (injeção de concorrentes)
    public List<VendorCompetitorAdDto> AdInjection { get; set; } = new();
    
    // Dados públicos
    public string Website { get; set; }
    public string Instagram { get; set; }
    public decimal Rating { get; set; }
    public int Visitas { get; set; }
    public bool Destaque { get; set; }
    public bool SeloFornecedor { get; set; }
    
    // Imagens
    public List<MediaDto> Imagens { get; set; }
    public List<CategoriaDto> Categorias { get; set; }
}

public class VendorCompetitorAdDto
{
    public Guid Id { get; set; }
    public string Nome { get; set; }
    public string Slug { get; set; }
    public string ImageUrl { get; set; }
    public string WhatsAppUrl { get; set; }
}
```

#### 2.2 Service para gerar DTO com lógica de tier

```csharp
public class VendorPublicService
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _config;

    public async Task<VendorPublicDto> GetVendorPublicAsync(Guid vendorId, string categoriaSolicitada = null)
    {
        var vendor = await _context.Fornecedores
            .Include(v => v.Medias)
            .Include(v => v.Categorias)
            .FirstOrDefaultAsync(v => v.Id == vendorId);

        if (vendor == null) return null;

        var dto = new VendorPublicDto
        {
            Id = vendor.Id,
            Nome = vendor.Nome,
            Slug = vendor.Slug,
            Descricao = vendor.Descricao,
            Cidade = vendor.Cidade,
            Website = vendor.Website,
            Instagram = vendor.Instagram,
            Rating = vendor.Rating ?? 0,
            Visitas = vendor.Visitas,
            Destaque = vendor.Destaque,
            SeloFornecedor = vendor.SeloFornecedor,
            PhoneDisplay = FormatarTelefone(vendor.Telefone), // Sempre formatado em texto
            Imagens = vendor.Medias.Select(m => new MediaDto { Url = m.Url }).ToList(),
            Categorias = vendor.Categorias.Select(c => new CategoriaDto { Nome = c.Nome }).ToList()
        };

        // LÓGICA DE TIER
        if (vendor.PlanLevel == Fornecedor.PlanLevel.Vitrine)
        {
            // VITRINE: Tudo liberado
            dto.WhatsAppUrl = GerarWhatsAppUrl(vendor.Telefone);
            dto.ShowContactForm = false;
            dto.AdInjection = new(); // Sem publicidade
        }
        else if (vendor.PlanLevel == Fornecedor.PlanLevel.Free)
        {
            if (vendor.LeadCount < 3)
            {
                // FREE ATIVO: Formulário visível, WhatsApp oculto
                dto.WhatsAppUrl = null;
                dto.ShowContactForm = true;
                dto.AdInjection = new();
            }
            else
            {
                // FREE ESGOTADO (ZUMBI): Injetar anúncios de concorrentes Vitrine
                dto.WhatsAppUrl = null;
                dto.ShowContactForm = false;
                dto.AdInjection = await GerarPublicidadeAsync(vendor, categoriaSolicitada);
            }
        }

        return dto;
    }

    private string FormatarTelefone(string telefone)
    {
        if (string.IsNullOrEmpty(telefone)) return null;
        var apenas_digitos = System.Text.RegularExpressions.Regex.Replace(telefone, @"\D", "");
        if (apenas_digitos.Length == 11)
            return $"({apenas_digitos.Substring(0, 2)}) {apenas_digitos.Substring(2, 5)}-{apenas_digitos.Substring(7)}";
        return telefone;
    }

    private string GerarWhatsAppUrl(string telefone)
    {
        var apenas_digitos = System.Text.RegularExpressions.Regex.Replace(telefone, @"\D", "");
        return $"https://wa.me/55{apenas_digitos}?text=Olá,%20gostaria%20de%20mais%20informações!";
    }

    private async Task<List<VendorCompetitorAdDto>> GerarPublicidadeAsync(Fornecedor vendor, string categoriaSolicitada)
    {
        // 3 fornecedores Vitrine aleatórios da mesma categoria
        var concorrentes = await _context.Fornecedores
            .Where(v => v.Id != vendor.Id &&
                        v.PlanLevel == Fornecedor.PlanLevel.Vitrine &&
                        v.Categorias.Any(c => c.Nome == categoriaSolicitada))
            .OrderBy(v => Guid.NewGuid()) // Aleatório
            .Take(3)
            .Select(v => new VendorCompetitorAdDto
            {
                Id = v.Id,
                Nome = v.Nome,
                Slug = v.Slug,
                ImageUrl = v.Medias.FirstOrDefault()?.Url,
                WhatsAppUrl = GerarWhatsAppUrl(v.Telefone)
            })
            .ToListAsync();

        return concorrentes;
    }
}
```

---

### 3. ENDPOINTS CHANGES

#### 3.1 GET /api/v1/fornecedores/{id}
**Antes:**
```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetFornecedor(Guid id)
{
    var vendor = await _context.Fornecedores.FirstOrDefaultAsync(v => v.Id == id);
    return Ok(vendor);
}
```

**Depois:**
```csharp
[HttpGet("{id}")]
public async Task<IActionResult> GetFornecedor(Guid id, [FromQuery] string categoria = null)
{
    var dto = await _vendorPublicService.GetVendorPublicAsync(id, categoria);
    if (dto == null) return NotFound();
    
    return Ok(dto);
}
```

#### 3.2 GET /api/v1/fornecedores (Listagem por Categoria)
**Lógica de Ordenação:**
```csharp
[HttpGet]
public async Task<IActionResult> ListFornecedores(
    [FromQuery] string categoria,
    [FromQuery] int page = 1,
    [FromQuery] int pageSize = 12)
{
    var query = _context.Fornecedores
        .Include(v => v.Categorias)
        .Include(v => v.Medias)
        .Where(v => v.Categorias.Any(c => c.Nome == categoria));

    // Ordenação por Tier (Critical!)
    query = query
        .OrderByDescending(v => v.PlanLevel) // Vitrine (1) primeiro
        .ThenBy(v => Guid.NewGuid())           // Aleatoriedade entre Vitrines
        .ThenByDescending(v => v.Destaque)     // Destaques após Vitrines
        .ThenByDescending(v => v.Rating);      // Rating como desempate

    // Pagination
    var vendors = await query
        .Skip((page - 1) * pageSize)
        .Take(pageSize)
        .ToListAsync();

    // Converter para DTO com lógica de tier
    var dtos = vendors.Select(v => 
        _vendorPublicService.GetVendorPublicAsync(v.Id, categoria).Result
    ).ToList();

    return Ok(new { data = dtos, page, pageSize });
}
```

#### 3.3 POST /api/v1/fornecedores/{id}/contact (Novo Endpoint de Lead)
```csharp
[HttpPost("{id}/contact")]
public async Task<IActionResult> SubmitContactForm(
    Guid id,
    [FromBody] SubmitLeadRequest request)
{
    var vendor = await _context.Fornecedores.FirstOrDefaultAsync(v => v.Id == id);
    if (vendor == null) return NotFound();

    // Validação: Apenas Free pode receber leads via formulário
    if (vendor.PlanLevel != Fornecedor.PlanLevel.Free || vendor.LeadCount >= 3)
        return BadRequest(new { error = "Este fornecedor não está aceitando leads" });

    // Criar lead
    var lead = new FornecedorLead
    {
        Id = Guid.NewGuid(),
        FornecedorId = id,
        Nome = request.Nome,
        Email = request.Email,
        Telefone = request.Telefone,
        Mensagem = request.Mensagem,
        DataCriacao = DateTime.UtcNow,
        IpOrigem = HttpContext.Connection.RemoteIpAddress?.ToString()
    };

    _context.FornecedorLeads.Add(lead);

    // Incrementar LeadCount
    vendor.LeadCount++;
    _context.Fornecedores.Update(vendor);

    await _context.SaveChangesAsync();

    // Enviar e-mail
    await _emailService.EnviarNovoLeadAsync(vendor, lead);

    // Se atingiu limite, enviar ultimato
    if (vendor.LeadCount == 3)
    {
        await _emailService.EnviarUltamatoAsync(vendor);
    }

    return Ok(new { message = "Lead registrado com sucesso", leadId = lead.Id });
}

public class SubmitLeadRequest
{
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Telefone { get; set; }
    public string Mensagem { get; set; }
}
```

#### 3.4 GET /api/v1/fornecedores/{id}/leads (Para Painel do Fornecedor)
```csharp
[HttpGet("{id}/leads")]
[Authorize]
public async Task<IActionResult> GetLeads(Guid id)
{
    var currentUser = User.FindFirst("sub")?.Value;
    
    var vendor = await _context.Fornecedores.FirstOrDefaultAsync(v => v.Id == id);
    if (vendor == null || vendor.UserId.ToString() != currentUser)
        return Unauthorized();

    var leads = await _context.FornecedorLeads
        .Where(l => l.FornecedorId == id)
        .OrderByDescending(l => l.DataCriacao)
        .ToListAsync();

    return Ok(new
    {
        totalLeads = leads.Count,
        naoLidos = leads.Count(l => !l.Lido),
        leads = leads.Select(l => new
        {
            l.Id,
            l.Nome,
            l.Email,
            l.Telefone,
            l.Mensagem,
            l.DataCriacao,
            l.Lido
        }).ToList()
    });
}
```

---

### 4. PAYMENT INTEGRATION (Stripe)

#### 4.1 Webhook para Confirmação de Pagamento
```csharp
[HttpPost("api/v1/webhooks/stripe")]
[AllowAnonymous]
public async Task<IActionResult> HandleStripeWebhook()
{
    var json = await new StreamReader(HttpContext.Request.Body).ReadToEndAsync();
    var stripeEvent = EventUtility.ConstructEvent(
        json,
        Request.Headers["Stripe-Signature"],
        _stripeSigSecret
    );

    if (stripeEvent.Type == Events.CheckoutSessionCompleted)
    {
        var session = stripeEvent.Data.Object as Session;
        var vendorId = Guid.Parse(session.ClientReferenceId);

        var vendor = await _context.Fornecedores.FirstOrDefaultAsync(v => v.Id == vendorId);
        if (vendor != null)
        {
            vendor.PlanLevel = Fornecedor.PlanLevel.Vitrine;
            vendor.StripeSubscriptionId = session.SubscriptionId;
            vendor.SubscriptionExpiresAt = DateTime.UtcNow.AddMonths(12); // 1 ano
            vendor.LeadCount = 0; // Reset leads ao ativar Vitrine

            _context.Fornecedores.Update(vendor);
            await _context.SaveChangesAsync();

            // Enviar e-mail de boas-vindas
            await _emailService.EnviarBoasVindasVitrinneAsync(vendor);
        }
    }

    return Ok();
}
```

#### 4.2 Endpoint para Downgrade/Cancelamento
```csharp
[HttpPost("{id}/cancel-subscription")]
[Authorize]
public async Task<IActionResult> CancelSubscription(Guid id)
{
    var vendor = await _context.Fornecedores.FirstOrDefaultAsync(v => v.Id == id);
    if (vendor == null) return NotFound();

    // Validar permissão
    var currentUser = User.FindFirst("sub")?.Value;
    if (vendor.UserId.ToString() != currentUser)
        return Unauthorized();

    // Cancelar no Stripe
    if (!string.IsNullOrEmpty(vendor.StripeSubscriptionId))
    {
        var service = new SubscriptionService();
        await service.CancelAsync(vendor.StripeSubscriptionId);
    }

    // Converter para Free
    vendor.PlanLevel = Fornecedor.PlanLevel.Free;
    vendor.LeadCount = 0;
    vendor.SubscriptionExpiresAt = null;

    _context.Fornecedores.Update(vendor);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Subscription cancelada" });
}
```

---

### 5. EMAIL TEMPLATES (Transactional)

#### 5.1 Template A: Novo Lead (Free)
```
Assunto: Nova solicitação de orçamento: [Nome da Noiva]

Conteúdo:
---
Olá [NomeFornecedor],

Você recebeu um novo lead:

📋 Dados da Noiva:
- Nome: [Nome]
- Email: [Email]
- Telefone: [Telefone]
- Mensagem: [Mensagem]

⏳ Status: Lead [LeadCount]/3

🚨 ATENÇÃO: Você tem apenas [3 - LeadCount] leads gratuitos restantes. 
Após atingir 3 leads, seu perfil entrará em estado "Zumbi" e:
- Seus leads não mais serão encaminhados automaticamente
- Suas concorrentes aparecerão em seu lugar
- O telefone ficará em texto puro (sem link)

👉 Assine agora o Plano Vitrine e tenha:
- WhatsApp direto na sua página
- Leads ilimitados
- Destaque premium
- Acesso ao painel de leads

[Botão: Assinar Vitrine]

---
```

#### 5.2 Template B: Ultimato (Free Esgotado)
```
Assunto: 🚨 Seus leads gratuitos acabaram - Ação Necessária

Conteúdo:
---
Olá [NomeFornecedor],

Seu limite de 3 leads gratuitos foi atingido.

❌ Seu perfil agora:
- Não recebe mais leads automaticamente
- Mostra apenas telefone em texto (sem link)
- Exibe concorrentes premium no lugar

✅ Para reativar:
Assine o Plano Vitrine e ganhe:
- ✓ Leads ilimitados
- ✓ WhatsApp direto
- ✓ Topo da busca
- ✓ Painel de análise

⏰ Aproveite: 20% OFF agora!

[Botão: Reativar Vitrine]

---
```

#### 5.3 Template C: Boas-vindas (Vitrine)
```
Assunto: Seu perfil agora é Premium! 🏆

Conteúdo:
---
Parabéns [NomeFornecedor]!

Sua assinatura Vitrine foi ativada com sucesso! 🎉

Agora você tem acesso a:
✓ WhatsApp direto no seu perfil
✓ Leads ilimitados
✓ Posição de destaque
✓ Painel de análise em tempo real
✓ Suporte prioritário

📊 Dicas para maximizar:
- Atualize suas fotos regularmente
- Mantenha o perfil completo
- Responda rápido aos leads

Acesso ao Painel: [Link]

Dúvidas? Suporte: [Email/Chat]

---
```

---

### 6. MIGRATION DE DADOS (Initial)

#### 6.1 Script SQL para Migrar Fornecedores Existentes

```sql
-- Todos os fornecedores com role=supplier viram Vitrine
UPDATE Fornecedores
SET PlanLevel = 1, -- Vitrine
    LeadCount = 0
WHERE 1=1; -- Todos os fornecedores existentes

-- (Opcional) Se houver coluna 'Role', podemos usar:
-- WHERE Role = 'supplier'
```

#### 6.2 EF Core Migration
```csharp
public partial class AddTierSystem : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<int>(
            name: "PlanLevel",
            table: "Fornecedores",
            type: "int",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<int>(
            name: "LeadCount",
            table: "Fornecedores",
            type: "int",
            nullable: false,
            defaultValue: 0);

        migrationBuilder.AddColumn<DateTime>(
            name: "LastLeadReset",
            table: "Fornecedores",
            type: "datetime2",
            nullable: true);

        migrationBuilder.AddColumn<string>(
            name: "StripeSubscriptionId",
            table: "Fornecedores",
            type: "nvarchar(max)",
            nullable: true);

        migrationBuilder.AddColumn<DateTime>(
            name: "SubscriptionExpiresAt",
            table: "Fornecedores",
            type: "datetime2",
            nullable: true);

        // Atualizar para Vitrine
        migrationBuilder.UpdateData(
            table: "Fornecedores",
            column: "PlanLevel",
            value: 1);

        // Criar tabela FornecedorLeads
        migrationBuilder.CreateTable(
            name: "FornecedorLeads",
            columns: table => new
            {
                Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                FornecedorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                NoivaId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                Nome = table.Column<string>(type: "nvarchar(200)", nullable: false),
                Email = table.Column<string>(type: "nvarchar(200)", nullable: false),
                Telefone = table.Column<string>(type: "nvarchar(20)", nullable: false),
                Mensagem = table.Column<string>(type: "nvarchar(max)", nullable: true),
                DataCriacao = table.Column<DateTime>(type: "datetime2", nullable: false),
                IpOrigem = table.Column<string>(type: "nvarchar(50)", nullable: true),
                Lido = table.Column<bool>(type: "bit", nullable: false),
                DataLeitura = table.Column<DateTime>(type: "datetime2", nullable: true)
            },
            constraints: table =>
            {
                table.PrimaryKey("PK_FornecedorLeads", x => x.Id);
                table.ForeignKey(
                    name: "FK_FornecedorLeads_Fornecedores_FornecedorId",
                    column: x => x.FornecedorId,
                    principalTable: "Fornecedores",
                    principalColumn: "Id",
                    onDelete: ReferentialAction.Cascade);
            });

        migrationBuilder.CreateIndex(
            name: "IX_Fornecedores_PlanLevel",
            table: "Fornecedores",
            columns: new[] { "PlanLevel", "UpdatedAt" },
            descending: new[] { true, true });

        migrationBuilder.CreateIndex(
            name: "IX_FornecedorLeads_FornecedorId",
            table: "FornecedorLeads",
            column: "FornecedorId");

        migrationBuilder.CreateIndex(
            name: "IX_FornecedorLeads_Lido",
            table: "FornecedorLeads",
            column: "Lido");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        // ... down migrations
    }
}
```

---

## 🔵 FRONTEND (Angular) - Ajustes Prioritários

### 1. MODELS/TYPES

#### 1.1 Criar tipos TypeScript

```typescript
// src/app/core/models/vendor.model.ts

export enum PlanLevel {
  Free = 0,
  Vitrine = 1
}

export interface VendorPublic {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  cidade: string;
  
  // Tier logic
  phoneDisplay: string; // "19 99999-9999" (sempre texto)
  whatsAppUrl?: string; // null se Free, "https://wa.me/..." se Vitrine
  showContactForm: boolean; // true se Free com leads restantes
  
  // Publicidade
  adInjection: VendorCompetitorAd[];
  
  // Dados públicos
  website?: string;
  instagram?: string;
  rating: number;
  visitas: number;
  destaque: boolean;
  seloFornecedor: boolean;
  imagens: Media[];
  categorias: Categoria[];
}

export interface VendorCompetitorAd {
  id: string;
  nome: string;
  slug: string;
  imageUrl?: string;
  whatsAppUrl: string;
}

export interface Media {
  id: string;
  url: string;
  filename?: string;
}

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
}

export interface FornecedorLead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  dataCriacao: Date;
  ipOrigem?: string;
  lido: boolean;
}
```

### 2. COMPONENTS CHANGES

#### 2.1 Fornecedor Detail Page
**Novo arquivo: `src/app/features/fornecedores/fornecedor-detail/fornecedor-detail-page.ts`**

```typescript
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { VendorPublic, PlanLevel } from '../../../core/models/vendor.model';

@Component({
  selector: 'app-fornecedor-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fornecedor-detail-page.html',
  styleUrls: ['./fornecedor-detail-page.css']
})
export class FornecedorDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  vendor = signal<VendorPublic | null>(null);
  loading = signal(true);
  error = signal('');
  showContactForm = signal(false);
  showCompetitorAds = signal(false);

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.loadVendor(params['slug']);
    });
  }

  private loadVendor(slug: string) {
    const categoria = this.route.snapshot.queryParams['categoria'];
    
    this.api.get<VendorPublic>(`/fornecedores/${slug}`, {
      categoria: categoria
    }).subscribe({
      next: (vendor) => {
        this.vendor.set(vendor);
        this.showContactForm.set(vendor.showContactForm);
        this.showCompetitorAds.set(vendor.adInjection?.length > 0);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Fornecedor não encontrado');
        this.loading.set(false);
      }
    });
  }

  abrirWhatsApp(url: string) {
    window.open(url, '_blank');
  }

  enviarFormularioContato(dados: any) {
    // Será implementado abaixo
  }
}
```

**Template: `fornecedor-detail-page.html`**

```html
<div class="container py-12">
  <div *ngIf="loading()" class="text-center">
    <p>Carregando...</p>
  </div>

  <div *ngIf="!loading() && vendor()" class="grid md:grid-cols-3 gap-8">
    <!-- COLUNA 1: Info Fornecedor -->
    <div class="md:col-span-2">
      <h1 class="text-4xl font-bold mb-4">{{ vendor().nome }}</h1>
      <p class="text-gray-600 mb-6">{{ vendor().descricao }}</p>

      <!-- Rating -->
      <div class="flex items-center gap-2 mb-6">
        <span class="text-yellow-500">⭐ {{ vendor().rating }}</span>
        <span class="text-gray-500">({{ vendor().visitas }} visitas)</span>
      </div>

      <!-- Telefone (sempre em texto) -->
      <div class="mb-6">
        <p class="text-gray-700">
          📞 <span class="font-mono">{{ vendor().phoneDisplay }}</span>
        </p>
      </div>

      <!-- CONDICIONAL 1: WhatsApp (apenas Vitrine) -->
      <div *ngIf="vendor().whatsAppUrl" class="mb-6">
        <button 
          (click)="abrirWhatsApp(vendor().whatsAppUrl)"
          class="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg w-full"
        >
          💬 Chamar no WhatsApp
        </button>
      </div>

      <!-- CONDICIONAL 2: Formulário de Contato (Free com leads restantes) -->
      <div *ngIf="showContactForm()" class="mb-6">
        <app-lead-form [fornecedorId]="vendor().id"></app-lead-form>
      </div>

      <!-- Imagens -->
      <div class="grid grid-cols-3 gap-4 mt-8">
        <img *ngFor="let img of vendor().imagens" 
             [src]="img.url" 
             class="rounded-lg w-full h-48 object-cover">
      </div>
    </div>

    <!-- COLUNA 2: Sidebar -->
    <div>
      <!-- Selos/Badges -->
      <div *ngIf="vendor().seloFornecedor" class="mb-4 p-4 bg-blue-50 rounded-lg">
        <p class="text-sm font-bold text-blue-900">✓ Fornecedor Verificado</p>
      </div>

      <!-- Website/Instagram -->
      <div class="mb-4">
        <a *ngIf="vendor().website" 
           [href]="vendor().website" 
           target="_blank"
           class="block text-blue-600 hover:underline mb-2">
          🌐 Visite nosso site
        </a>
        <a *ngIf="vendor().instagram" 
           [href]="'https://instagram.com/' + vendor().instagram.replace('@', '')" 
           target="_blank"
           class="block text-pink-600 hover:underline">
          📸 {{ vendor().instagram }}
        </a>
      </div>

      <!-- CONDICIONAL 3: Anúncios de Concorrentes (Free Esgotado) -->
      <div *ngIf="showCompetitorAds()" class="mt-8 p-4 bg-yellow-50 rounded-lg">
        <p class="text-sm font-bold text-yellow-900 mb-4">
          👥 Fornecedores com atendimento imediato:
        </p>
        
        <div *ngFor="let competitor of vendor().adInjection" class="mb-4">
          <div class="bg-white p-3 rounded border border-yellow-200">
            <p class="font-semibold">{{ competitor.nome }}</p>
            <img *ngIf="competitor.imageUrl" 
                 [src]="competitor.imageUrl" 
                 class="w-full h-32 object-cover rounded my-2">
            <button 
              (click)="abrirWhatsApp(competitor.whatsAppUrl)"
              class="w-full bg-green-500 text-white text-sm py-2 rounded hover:bg-green-600">
              Chamar no WhatsApp
            </button>
          </div>
        </div>
      </div>

      <!-- Categorias -->
      <div class="mt-8">
        <p class="font-bold mb-2">Categorias:</p>
        <div class="flex flex-wrap gap-2">
          <span *ngFor="let cat of vendor().categorias" 
                class="bg-gray-200 px-3 py-1 rounded-full text-sm">
            {{ cat.nome }}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
```

#### 2.2 Lead Form Component
**Novo arquivo: `src/app/features/fornecedores/lead-form/lead-form.component.ts`**

```typescript
import { Component, Input, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-lead-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-blue-50 p-6 rounded-lg">
      <h3 class="text-xl font-bold mb-4">Solicitar Orçamento</h3>
      
      <form [formGroup]="leadForm" (ngSubmit)="enviar()">
        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Seu Nome *</label>
          <input 
            type="text" 
            formControlName="nome"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Maria Silva"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Email *</label>
          <input 
            type="email" 
            formControlName="email"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">WhatsApp *</label>
          <input 
            type="tel" 
            formControlName="telefone"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="(11) 99999-9999"
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-bold mb-2">Mensagem</label>
          <textarea 
            formControlName="mensagem"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Conteme mais sobre o que você procura..."
          ></textarea>
        </div>

        <!-- Checkbox LGPD -->
        <div class="mb-4">
          <label class="flex items-start gap-2">
            <input 
              type="checkbox" 
              formControlName="concordaCompartilhamento"
              class="mt-1"
            />
            <span class="text-sm text-gray-700">
              Concordo em compartilhar meus dados com este fornecedor para receber o orçamento.
            </span>
          </label>
        </div>

        <button 
          type="submit"
          [disabled]="leadForm.invalid || loading()"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg disabled:opacity-50"
        >
          {{ loading() ? 'Enviando...' : 'Enviar Solicitação' }}
        </button>

        <p *ngIf="success()" class="mt-4 text-green-600 text-sm">
          ✓ Solicitação enviada com sucesso! O fornecedor entrará em contato.
        </p>

        <p *ngIf="error()" class="mt-4 text-red-600 text-sm">
          ✗ {{ error() }}
        </p>
      </form>
    </div>
  `
})
export class LeadFormComponent implements OnInit {
  @Input() fornecedorId: string;

  private api = inject(ApiService);
  private fb = inject(FormBuilder);

  leadForm: FormGroup;
  loading = signal(false);
  success = signal(false);
  error = signal('');

  constructor() {
    this.leadForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      mensagem: [''],
      concordaCompartilhamento: [false, Validators.requiredTrue]
    });
  }

  ngOnInit() {}

  enviar() {
    if (this.leadForm.invalid) return;

    this.loading.set(true);
    this.error.set('');
    this.success.set(false);

    this.api.post(`/fornecedores/${this.fornecedorId}/contact`, this.leadForm.value)
      .subscribe({
        next: (response) => {
          this.success.set(true);
          this.leadForm.reset();
          this.loading.set(false);
        },
        error: (err) => {
          this.error.set(err.error?.message || 'Erro ao enviar solicitação');
          this.loading.set(false);
        }
      });
  }
}
```

#### 2.3 Fornecedores List (Categoria Page)
**Update: `src/app/features/fornecedores/fornecedores-page.ts`**

```typescript
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../core/api.service';
import { VendorPublic } from '../../../core/models/vendor.model';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-12">
      <h1 class="text-4xl font-bold mb-8">Fornecedores de {{ categoria }}</h1>

      <div *ngIf="loading()" class="text-center">Carregando...</div>

      <!-- Grid de Fornecedores -->
      <div class="grid md:grid-cols-3 gap-6">
        <div *ngFor="let vendor of vendors()" 
             class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
          
          <!-- Imagem -->
          <img *ngIf="vendor.imagens?.[0]" 
               [src]="vendor.imagens[0].url" 
               class="w-full h-48 object-cover">

          <!-- Conteúdo -->
          <div class="p-4">
            <h3 class="font-bold text-lg mb-2">{{ vendor.nome }}</h3>
            
            <!-- Rating -->
            <div class="flex items-center gap-2 mb-3">
              <span class="text-yellow-500">⭐ {{ vendor.rating }}</span>
            </div>

            <!-- Telefone em Texto -->
            <p class="text-gray-600 text-sm mb-4">{{ vendor.phoneDisplay }}</p>

            <!-- CONDICIONAL: WhatsApp (Vitrine) OU Form (Free) -->
            <div class="flex gap-2">
              <a *ngIf="vendor.whatsAppUrl" 
                 [href]="vendor.whatsAppUrl" 
                 target="_blank"
                 class="flex-1 bg-green-500 text-white py-2 rounded text-center text-sm font-bold hover:bg-green-600">
                💬 WhatsApp
              </a>
              
              <a *ngIf="!vendor.whatsAppUrl && vendor.showContactForm" 
                 [routerLink]="['/piracicaba/fornecedores/', vendor.slug]"
                 class="flex-1 bg-blue-500 text-white py-2 rounded text-center text-sm font-bold hover:bg-blue-600">
                📝 Orçamento
              </a>

              <a *ngIf="!vendor.whatsAppUrl && !vendor.showContactForm" 
                 [routerLink]="['/piracicaba/fornecedores/', vendor.slug]"
                 class="flex-1 bg-gray-400 text-white py-2 rounded text-center text-sm font-bold">
                Ver Perfil
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Sem resultados -->
      <div *ngIf="!loading() && vendors().length === 0" class="text-center py-12">
        <p class="text-gray-600">Nenhum fornecedor encontrado nesta categoria.</p>
      </div>
    </div>
  `
})
export class FornecedoresPage implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);

  categoria = signal('');
  vendors = signal<VendorPublic[]>([]);
  loading = signal(true);
  page = signal(1);
  pageSize = signal(12);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoria = params['categoria'];
      this.categoria.set(categoria);
      this.carregarFornecedores();
    });
  }

  private carregarFornecedores() {
    this.api.get<{ data: VendorPublic[] }>('/fornecedores', {
      categoria: this.categoria(),
      page: this.page(),
      pageSize: this.pageSize()
    }).subscribe({
      next: (response) => {
        this.vendors.set(response.data);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      }
    });
  }
}
```

### 3. PAINEL DO FORNECEDOR

#### 3.1 Dashboard de Leads
**Novo arquivo: `src/app/features/painel/leads/leads-page.ts`**

```typescript
import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/api.service';
import { FornecedorLead } from '../../../core/models/vendor.model';

@Component({
  selector: 'app-leads-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-12">
      <h1 class="text-3xl font-bold mb-8">Meus Leads</h1>

      <!-- Resumo -->
      <div class="grid md:grid-cols-3 gap-4 mb-8">
        <div class="bg-blue-50 p-6 rounded-lg">
          <p class="text-gray-600">Total de Leads</p>
          <p class="text-3xl font-bold">{{ totalLeads() }}</p>
        </div>
        <div class="bg-yellow-50 p-6 rounded-lg">
          <p class="text-gray-600">Não Lidos</p>
          <p class="text-3xl font-bold">{{ naoLidos() }}</p>
        </div>
        <div class="bg-green-50 p-6 rounded-lg">
          <p class="text-gray-600">Plano</p>
          <p class="text-3xl font-bold">{{ plano() }}</p>
        </div>
      </div>

      <!-- Tabela de Leads -->
      <div class="bg-white rounded-lg shadow overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-6 py-3 text-left text-sm font-bold">Nome</th>
              <th class="px-6 py-3 text-left text-sm font-bold">Email</th>
              <th class="px-6 py-3 text-left text-sm font-bold">Telefone</th>
              <th class="px-6 py-3 text-left text-sm font-bold">Data</th>
              <th class="px-6 py-3 text-left text-sm font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let lead of leads()" class="border-t hover:bg-gray-50">
              <td class="px-6 py-3">{{ lead.nome }}</td>
              <td class="px-6 py-3">{{ lead.email }}</td>
              <td class="px-6 py-3">{{ lead.telefone }}</td>
              <td class="px-6 py-3">{{ lead.dataCriacao | date: 'dd/MM/yyyy' }}</td>
              <td class="px-6 py-3">
                <span *ngIf="lead.lido" class="text-green-600 text-sm">✓ Lido</span>
                <span *ngIf="!lead.lido" class="text-yellow-600 text-sm font-bold">● Novo</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class LeatsDashboardPage implements OnInit {
  private api = inject(ApiService);

  leads = signal<FornecedorLead[]>([]);
  totalLeads = signal(0);
  naoLidos = signal(0);
  plano = signal('Vitrine'); // ou 'Free'

  ngOnInit() {
    this.carregarLeads();
  }

  private carregarLeads() {
    // Obter ID do fornecedor do contexto autenticado
    this.api.get('/fornecedores/me/leads').subscribe({
      next: (response: any) => {
        this.leads.set(response.leads);
        this.totalLeads.set(response.totalLeads);
        this.naoLidos.set(response.naoLidos);
      }
    });
  }
}
```

### 4. PÁGINAS ADICIONAIS

#### 4.1 Plano Free (Marketing/Upgrade)
**Novo arquivo: `src/app/features/planos/upgrade-page.ts`**

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upgrade-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container py-20">
      <h1 class="text-4xl font-bold text-center mb-4">Evolua para Vitrine</h1>
      <p class="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        Deixe de receber apenas 3 leads. Tenha WhatsApp direto, leads ilimitados e posição de destaque.
      </p>

      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <!-- Plano Free -->
        <div class="border-2 border-gray-200 rounded-lg p-8">
          <h2 class="text-2xl font-bold mb-6">Plano Free</h2>
          <p class="text-3xl font-bold mb-4">Grátis</p>
          <ul class="space-y-3 mb-6">
            <li>✗ 3 leads por mês</li>
            <li>✗ Telefone em texto puro</li>
            <li>✗ Sem WhatsApp direto</li>
            <li>✗ Posição baixa em busca</li>
          </ul>
          <button class="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed">
            Seu Plano Atual
          </button>
        </div>

        <!-- Plano Vitrine -->
        <div class="border-4 border-green-500 rounded-lg p-8 bg-green-50 relative">
          <div class="absolute -top-4 right-8 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">
            🏆 Popular
          </div>
          <h2 class="text-2xl font-bold mb-6">Vitrine Premium</h2>
          <p class="text-3xl font-bold mb-2">R$ 397</p>
          <p class="text-gray-600 mb-6">/ano</p>
          <ul class="space-y-3 mb-6">
            <li>✓ Leads ilimitados</li>
            <li>✓ WhatsApp direto</li>
            <li>✓ Topo em buscas</li>
            <li>✓ Painel de análise</li>
            <li>✓ Suporte prioritário</li>
          </ul>
          <button class="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-bold">
            Assinar Agora
          </button>
        </div>
      </div>
    </div>
  `
})
export class UpgradePage {}
```

---

## 📊 CHECKLIST DE IMPLEMENTAÇÃO

### Backend Priority 1 (Crítico)
- [ ] Adicionar coluna `PlanLevel` em Fornecedores
- [ ] Adicionar coluna `LeadCount` em Fornecedores
- [ ] Criar tabela `FornecedorLeads`
- [ ] Criar migration EF Core
- [ ] Criar `VendorPublicDto` com lógica de tier
- [ ] Criar `VendorPublicService`
- [ ] Implementar GET `/fornecedores/{id}` com DTO
- [ ] Implementar GET `/fornecedores?categoria=` com ordenação tier
- [ ] Implementar POST `/fornecedores/{id}/contact` (lead submission)

### Backend Priority 2 (Alto)
- [ ] Configurar Stripe webhook para confirmação de pagamento
- [ ] Implementar `cancelarSubscription`
- [ ] Configurar templates de e-mail (SendGrid/Resend)
- [ ] Implementar envio de e-mails transacionais
- [ ] GET `/fornecedores/me/leads` (painel)
- [ ] CORS revisado para domínios

### Backend Priority 3 (Médio)
- [ ] Endpoint de relativizar de Free → Vitrine
- [ ] Cron job para reset mensal de LeadCount (opcional)
- [ ] Logs de auditoria para tier changes

### Frontend Priority 1 (Crítico)
- [ ] Criar tipos TypeScript (PlanLevel, VendorPublic)
- [ ] Update fornecedor detail page com lógica tier
- [ ] Criar Lead Form Component
- [ ] Update categoria/fornecedores list com ordenação visual

### Frontend Priority 2 (Alto)
- [ ] Painel de leads para fornecedor logado
- [ ] Página de upgrade/planos
- [ ] Integração Stripe Checkout
- [ ] Suporte a assinatura/cancelamento no painel

### Frontend Priority 3 (Médio)
- [ ] Indicadores visuais de tier (badges, cores)
- [ ] Analytics de conversão
- [ ] Roteamento protegido para painel

---

## 🚀 PRÓXIMAS ETAPAS

1. **Backend**: Implementar Priority 1 (4-5 dias)
2. **Frontend**: Implementar Priority 1 em paralelo (3-4 dias)
3. **Testing**: E2E com ambiente de staging (2 dias)
4. **Deploy**: Backend → Prod, então Frontend (1 dia)
5. **Migration**: Rodar SQL para converter fornecedores existentes (30 min)
6. **Stripe**: Setup de produtos e webhooks (1 dia)

---

## ⚠️ CUIDADOS IMPORTANTES

1. **LGPD Compliance**: Sempre pedir consentimento para compartilhar dados
2. **Telefone**: Nunca expor como link clicável no Free (apenas texto)
3. **Cache**: Cuidado ao cachear VendorPublicDto (pode ficar desatualizado com tier changes)
4. **Ordenação**: Sempre aplicar PlanLevel DESC antes de outros critérios
5. **Email**: Testar templates de e-mail com dados reais
6. **Stripe**: Testar cancelamento e reativação de subscriptions
