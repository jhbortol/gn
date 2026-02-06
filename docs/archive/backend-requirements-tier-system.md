# 🎯 Requisitos Backend - Sistema de Tier (Free vs Vitrine)

**Data**: 18 de janeiro de 2026  
**Versão**: 1.0  
**Prioridade**: CRÍTICA  
**Timeline**: 4-5 dias  
**Responsável**: Backend Team (.NET 9)  

---

## 📋 Visão Geral

Implementação de sistema de dois níveis (tiers) para fornecedores:
- **Free**: 3 leads/mês, sem WhatsApp direto, com injeção de anúncios de concorrentes após limite
- **Vitrine**: Unlimited leads, WhatsApp direto, topo de ranking, sem anúncios

---

## 🔴 PRIORITY 1 - CRÍTICO (Deve estar pronto em 2-3 dias)

### P1-1: Alterações no Modelo `Fornecedor` (Entity Framework)

**Arquivo**: `Entities/Fornecedor.cs`

**Adicionar propriedades**:

```csharp
public class Fornecedor
{
    // ... propriedades existentes ...

    /// <summary>
    /// Nível do plano: 0 = Free, 1 = Vitrine
    /// </summary>
    public PlanLevel PlanLevel { get; set; } = PlanLevel.Free;

    /// <summary>
    /// Contador de leads recebidos neste mês
    /// Reseta automaticamente todo primeiro dia do mês
    /// </summary>
    public int LeadCount { get; set; } = 0;

    /// <summary>
    /// Timestamp do último reset do contador
    /// </summary>
    public DateTime? LastLeadCountReset { get; set; }

    /// <summary>
    /// ID da assinatura no Stripe
    /// Nulo para fornecedores Free ou que nunca assinaram
    /// </summary>
    public string? StripeSubscriptionId { get; set; }

    /// <summary>
    /// Data em que a assinatura Vitrine foi ativada
    /// </summary>
    public DateTime? VitrineSinceDate { get; set; }

    // Relacionamento
    public virtual ICollection<FornecedorLead> Leads { get; set; } = new List<FornecedorLead>();
}

/// <summary>
/// Enum para níveis de plano
/// </summary>
public enum PlanLevel
{
    Free = 0,
    Vitrine = 1
}
```

**Checklist**:
- [ ] Enum `PlanLevel` criado em `Enums/PlanLevel.cs` (ou próximo ao modelo)
- [ ] Propriedades adicionadas à classe `Fornecedor`
- [ ] Relacionamento um-para-muitos com `FornecedorLead` configurado
- [ ] DbSet adicionado ao DbContext

---

### P1-2: Criar Tabela `FornecedorLeads` (Rastreamento de Leads)

**Arquivo**: Nova entity `Entities/FornecedorLead.cs`

```csharp
public class FornecedorLead
{
    public int Id { get; set; }

    public int FornecedorId { get; set; }
    public virtual Fornecedor Fornecedor { get; set; } = null!;

    /// <summary>
    /// Nome do cliente que preencheu o formulário
    /// </summary>
    public string ClienteName { get; set; } = string.Empty;

    /// <summary>
    /// Email do cliente
    /// </summary>
    public string ClienteEmail { get; set; } = string.Empty;

    /// <summary>
    /// Telefone do cliente
    /// </summary>
    public string ClientePhone { get; set; } = string.Empty;

    /// <summary>
    /// Mensagem/detalhes do cliente
    /// </summary>
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Consentimento LGPD explícito
    /// </summary>
    public bool LgpdConsent { get; set; }

    /// <summary>
    /// Data de criação do lead
    /// </summary>
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    /// <summary>
    /// Flag se foi enviado email para o fornecedor
    /// </summary>
    public bool EmailSent { get; set; }

    /// <summary>
    /// Flag se o fornecedor marcou como lido
    /// </summary>
    public bool IsRead { get; set; }
}
```

**Checklist**:
- [ ] Entity `FornecedorLead` criada
- [ ] Migration EF Core gerada: `Add-Migration AddPlanLevelAndLeadTracking`
- [ ] Migration aplicada ao banco de dados

---

### P1-3: Migration EF Core (Banco de Dados)

**Arquivo**: `Data/Migrations/[TIMESTAMP]_AddPlanLevelAndLeadTracking.cs`

**Script SQL de migração** (auto-gerado pelo EF Core, mas valores iniciais):

```sql
-- Adicionar coluna PlanLevel (todos existentes viram Vitrine por padrão)
ALTER TABLE Fornecedores 
ADD PlanLevel INT DEFAULT 1;

ALTER TABLE Fornecedores 
ADD LeadCount INT DEFAULT 0;

ALTER TABLE Fornecedores 
ADD LastLeadCountReset DATETIME2 NULL;

ALTER TABLE Fornecedores 
ADD StripeSubscriptionId NVARCHAR(MAX) NULL;

ALTER TABLE Fornecedores 
ADD VitrineSinceDate DATETIME2 NULL;

-- Criar tabela FornecedorLeads
CREATE TABLE FornecedorLeads (
    Id INT PRIMARY KEY IDENTITY(1,1),
    FornecedorId INT NOT NULL,
    ClienteName NVARCHAR(500) NOT NULL,
    ClienteEmail NVARCHAR(255) NOT NULL,
    ClientePhone NVARCHAR(20) NOT NULL,
    Message NVARCHAR(MAX) NOT NULL,
    LgpdConsent BIT NOT NULL,
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    EmailSent BIT NOT NULL DEFAULT 0,
    IsRead BIT NOT NULL DEFAULT 0,
    FOREIGN KEY (FornecedorId) REFERENCES Fornecedores(Id) ON DELETE CASCADE
);

-- Criar índices para performance
CREATE INDEX IX_FornecedorLeads_FornecedorId ON FornecedorLeads(FornecedorId);
CREATE INDEX IX_FornecedorLeads_CreatedAt ON FornecedorLeads(CreatedAt DESC);
CREATE INDEX IX_FornecedorLeads_IsRead ON FornecedorLeads(IsRead);
```

**Dados iniciais** (após migration):

```sql
-- Migrar fornecedores existentes para Vitrine (assumindo que todos são premium atualmente)
UPDATE Fornecedores 
SET PlanLevel = 1, VitrineSinceDate = GETUTCDATE()
WHERE PlanLevel IS NULL OR PlanLevel = 0;
```

**Checklist**:
- [ ] Migration criada com `dotnet ef migrations add AddPlanLevelAndLeadTracking`
- [ ] Migration revisada (sem erros SQL)
- [ ] Migration aplicada: `dotnet ef database update`
- [ ] Tabela `FornecedorLeads` criada corretamente
- [ ] Índices criados para performance

---

### P1-4: Criar DTO `VendorPublicDto` com Lógica Tier

**Arquivo**: `DTOs/VendorPublicDto.cs`

```csharp
public class VendorPublicDto
{
    /// <summary>
    /// Identificador do fornecedor
    /// </summary>
    public int Id { get; set; }

    /// <summary>
    /// Nome fantasia
    /// </summary>
    public string NomeFantasia { get; set; } = string.Empty;

    /// <summary>
    /// Descrição do fornecedor
    /// </summary>
    public string Descricao { get; set; } = string.Empty;

    /// <summary>
    /// URL da foto/logo (sempre visível)
    /// </summary>
    public string FotoUrl { get; set; } = string.Empty;

    /// <summary>
    /// Nível do plano (Free = 0, Vitrine = 1)
    /// </summary>
    public int PlanLevel { get; set; }

    /// <summary>
    /// Telefone em formato de texto (sempre exibível, sem link)
    /// Exemplo: "(11) 98765-4321"
    /// </summary>
    public string PhoneDisplay { get; set; } = string.Empty;

    /// <summary>
    /// URL do WhatsApp (apenas para Vitrine)
    /// Formato: "https://wa.me/5511987654321"
    /// Null para Free
    /// </summary>
    public string? WhatsAppUrl { get; set; }

    /// <summary>
    /// Deve mostrar formulário de contato
    /// True: Free com < 3 leads
    /// False: Free com >= 3 leads (zumbi state) ou Vitrine
    /// </summary>
    public bool ShowContactForm { get; set; }

    /// <summary>
    /// Lista de fornecedores concorrentes para injeção de anúncios
    /// Preenchida apenas quando Free >= 3 leads (zumbi state)
    /// Vazio para Vitrine
    /// </summary>
    public List<CompetitorAd> AdInjection { get; set; } = new List<CompetitorAd>();

    /// <summary>
    /// URLs de redes sociais (Instagram, Facebook, etc.)
    /// </summary>
    public Dictionary<string, string> SocialMedia { get; set; } = new();

    /// <summary>
    /// Ranking/posição (calculado dinamicamente)
    /// 1 = topo (Vitrine), crescente para Free
    /// </summary>
    public int Position { get; set; }

    /// <summary>
    /// Timestamp da última atualização
    /// </summary>
    public DateTime UpdatedAt { get; set; }
}

public class CompetitorAd
{
    /// <summary>
    /// Identificador do fornecedor concorrente
    /// </summary>
    public int FornecedorId { get; set; }

    /// <summary>
    /// Nome fantasia do concorrente (Vitrine)
    /// </summary>
    public string NomeFantasia { get; set; } = string.Empty;

    /// <summary>
    /// Foto/logo para exibição do anúncio
    /// </summary>
    public string FotoUrl { get; set; } = string.Empty;

    /// <summary>
    /// URL WhatsApp do concorrente (sempre Vitrine)
    /// </summary>
    public string WhatsAppUrl { get; set; } = string.Empty;

    /// <summary>
    /// Link para detalhe do fornecedor
    /// </summary>
    public string DetailUrl { get; set; } = string.Empty;
}
```

**Checklist**:
- [ ] DTOs criados
- [ ] CompetitorAd incluído

---

### P1-5: Serviço `VendorPublicService` com Lógica Tier

**Arquivo**: `Services/VendorPublicService.cs`

```csharp
public interface IVendorPublicService
{
    Task<VendorPublicDto> GetVendorPublicAsync(int fornecedorId);
    Task<List<VendorPublicDto>> GetVendorsByCategoriasAsync(List<int> categoriaIds, int? skip = null, int? take = null);
    Task<VendorPublicDto> GetVendorDetailAsync(int fornecedorId);
}

public class VendorPublicService : IVendorPublicService
{
    private readonly ApplicationDbContext _context;
    private readonly ILogger<VendorPublicService> _logger;

    public VendorPublicService(ApplicationDbContext context, ILogger<VendorPublicService> logger)
    {
        _context = context;
        _logger = logger;
    }

    /// <summary>
    /// Obtém dados públicos de um fornecedor com lógica de tier
    /// </summary>
    public async Task<VendorPublicDto> GetVendorPublicAsync(int fornecedorId)
    {
        var fornecedor = await _context.Fornecedores
            .AsNoTracking()
            .Include(f => f.SocialMediaLinks) // assumindo que existe
            .FirstOrDefaultAsync(f => f.Id == fornecedorId && f.Ativo);

        if (fornecedor == null)
            throw new InvalidOperationException($"Fornecedor {fornecedorId} não encontrado ou inativo");

        return await MapToVendorPublicDtoAsync(fornecedor);
    }

    /// <summary>
    /// Lista fornecedores por categoria com ordenação por tier
    /// Vitrine primeiro, depois Free (aleatório para não parecer injusto)
    /// </summary>
    public async Task<List<VendorPublicDto>> GetVendorsByCategoriasAsync(
        List<int> categoriaIds, 
        int? skip = null, 
        int? take = null)
    {
        var query = _context.Fornecedores
            .AsNoTracking()
            .Where(f => f.Ativo && f.Categorias.Any(c => categoriaIds.Contains(c.Id)))
            .OrderByDescending(f => f.PlanLevel) // Vitrine (1) antes de Free (0)
            .ThenBy(f => EF.Functions.Random()); // Aleatório dentro do tier

        if (skip.HasValue)
            query = query.Skip(skip.Value);

        if (take.HasValue)
            query = query.Take(take.Value);

        var fornecedores = await query.ToListAsync();

        var dtos = new List<VendorPublicDto>();
        foreach (var f in fornecedores)
        {
            dtos.Add(await MapToVendorPublicDtoAsync(f));
        }

        return dtos;
    }

    /// <summary>
    /// Mapeia Fornecedor → VendorPublicDto com lógica de tier
    /// </summary>
    private async Task<VendorPublicDto> MapToVendorPublicDtoAsync(Fornecedor fornecedor)
    {
        var isFree = fornecedor.PlanLevel == (int)PlanLevel.Free;
        var isZumbiState = isFree && fornecedor.LeadCount >= 3;

        var dto = new VendorPublicDto
        {
            Id = fornecedor.Id,
            NomeFantasia = fornecedor.NomeFantasia,
            Descricao = fornecedor.Descricao,
            FotoUrl = fornecedor.FotoUrl ?? string.Empty,
            PlanLevel = fornecedor.PlanLevel,
            PhoneDisplay = FormatarTelefone(fornecedor.Telefone),
            WhatsAppUrl = !isFree ? GerarWhatsAppUrl(fornecedor.Telefone) : null,
            ShowContactForm = isFree && !isZumbiState,
            UpdatedAt = fornecedor.UpdatedAt
        };

        // Se está em zumbi state, injeta anúncios de concorrentes Vitrine
        if (isZumbiState)
        {
            dto.AdInjection = await GetCompetitorAdsAsync(fornecedor.Id);
        }

        return dto;
    }

    /// <summary>
    /// Obtém 3 fornecedores Vitrine aleatórios para injetar como anúncios
    /// </summary>
    private async Task<List<CompetitorAd>> GetCompetitorAdsAsync(int fornecedorId)
    {
        var competitors = await _context.Fornecedores
            .AsNoTracking()
            .Where(f => f.Id != fornecedorId && 
                        f.Ativo && 
                        f.PlanLevel == (int)PlanLevel.Vitrine)
            .OrderBy(f => EF.Functions.Random())
            .Take(3)
            .Select(f => new CompetitorAd
            {
                FornecedorId = f.Id,
                NomeFantasia = f.NomeFantasia,
                FotoUrl = f.FotoUrl ?? string.Empty,
                WhatsAppUrl = GerarWhatsAppUrl(f.Telefone),
                DetailUrl = $"/fornecedores/{f.Id}"
            })
            .ToListAsync();

        return competitors;
    }

    private string FormatarTelefone(string? telefone)
    {
        if (string.IsNullOrEmpty(telefone))
            return "Não informado";

        // Remove caracteres especiais
        var cleaned = System.Text.RegularExpressions.Regex.Replace(telefone, @"\D", "");

        // Formata como (XX) XXXXX-XXXX
        if (cleaned.Length >= 10)
        {
            var areaCode = cleaned.Substring(cleaned.Length - 10, 2);
            var number = cleaned.Substring(cleaned.Length - 8, 5);
            var lastPart = cleaned.Substring(cleaned.Length - 3);
            return $"({areaCode}) {number}-{lastPart}";
        }

        return telefone;
    }

    private string GerarWhatsAppUrl(string? telefone)
    {
        if (string.IsNullOrEmpty(telefone))
            return string.Empty;

        // Remove caracteres especiais, mantém apenas dígitos
        var cleaned = System.Text.RegularExpressions.Regex.Replace(telefone, @"\D", "");

        // Garante que começa com 55 (Brasil)
        if (!cleaned.StartsWith("55"))
            cleaned = "55" + cleaned;

        return $"https://wa.me/{cleaned}";
    }
}
```

**Checklist**:
- [ ] Interface `IVendorPublicService` criada
- [ ] Implementação `VendorPublicService` criada
- [ ] Lógica de tier testada (Free vs Vitrine)
- [ ] Lógica de zumbi state testada (ad injection em >=3 leads)
- [ ] Serviço registrado no DI container: `services.AddScoped<IVendorPublicService, VendorPublicService>();`

---

### P1-6: Refatorar Endpoint GET `/api/v1/fornecedores/{id}`

**Arquivo**: `Controllers/FornecedoresController.cs`

```csharp
/// <summary>
/// Obtém detalhes públicos de um fornecedor (com lógica de tier)
/// GET /api/v1/fornecedores/123
/// </summary>
[HttpGet("{id}")]
[AllowAnonymous]
[ProducesResponseType(typeof(VendorPublicDto), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
public async Task<IActionResult> GetFornecedorPublic(int id)
{
    try
    {
        var vendor = await _vendorPublicService.GetVendorPublicAsync(id);
        return Ok(vendor);
    }
    catch (InvalidOperationException)
    {
        return NotFound(new { message = "Fornecedor não encontrado" });
    }
}
```

**Checklist**:
- [ ] Endpoint atualizado para usar `VendorPublicService`
- [ ] Retorna `VendorPublicDto` com lógica tier
- [ ] Testado com Free < 3 leads
- [ ] Testado com Free >= 3 leads (ad injection)
- [ ] Testado com Vitrine (WhatsApp URL, sem ads)

---

### P1-7: Refatorar Endpoint GET `/api/v1/fornecedores?categoria`

**Arquivo**: `Controllers/FornecedoresController.cs`

```csharp
/// <summary>
/// Lista fornecedores por categoria (ordenado por tier)
/// GET /api/v1/fornecedores?categoria=1,2,3&skip=0&take=20
/// Vitrine aparece primeiro, depois Free (aleatório)
/// </summary>
[HttpGet]
[AllowAnonymous]
[ProducesResponseType(typeof(List<VendorPublicDto>), StatusCodes.Status200OK)]
public async Task<IActionResult> GetFornecedoresByCategorias(
    [FromQuery] string? categoria,
    [FromQuery] int skip = 0,
    [FromQuery] int take = 20)
{
    if (string.IsNullOrEmpty(categoria))
        return BadRequest(new { message = "Parâmetro 'categoria' é obrigatório" });

    var categoriaIds = categoria
        .Split(',')
        .Where(c => int.TryParse(c, out _))
        .Select(int.Parse)
        .ToList();

    if (!categoriaIds.Any())
        return BadRequest(new { message = "IDs de categorias inválidos" });

    var vendors = await _vendorPublicService.GetVendorsByCategoriasAsync(categoriaIds, skip, take);
    return Ok(vendors);
}
```

**Checklist**:
- [ ] Endpoint atualizado
- [ ] Ordenação por `PlanLevel DESC` + aleatório
- [ ] Pagination funcionando (skip/take)
- [ ] Cada item retorna com `VendorPublicDto` (tier logic aplicada)

---

### P1-8: Criar Endpoint POST `/api/v1/fornecedores/{id}/contact` (Lead Form)

**Arquivo**: `Controllers/FornecedoresController.cs`

```csharp
public class SubmitLeadRequest
{
    /// <summary>
    /// Nome do cliente que está preenchendo o formulário
    /// </summary>
    [Required(ErrorMessage = "Nome é obrigatório")]
    [StringLength(500)]
    public string ClienteName { get; set; } = string.Empty;

    /// <summary>
    /// Email do cliente
    /// </summary>
    [Required(ErrorMessage = "Email é obrigatório")]
    [EmailAddress(ErrorMessage = "Email inválido")]
    public string ClienteEmail { get; set; } = string.Empty;

    /// <summary>
    /// Telefone do cliente
    /// </summary>
    [Required(ErrorMessage = "Telefone é obrigatório")]
    [Phone(ErrorMessage = "Telefone inválido")]
    public string ClientePhone { get; set; } = string.Empty;

    /// <summary>
    /// Mensagem/detalhes do cliente
    /// </summary>
    [Required(ErrorMessage = "Mensagem é obrigatória")]
    [StringLength(5000)]
    public string Message { get; set; } = string.Empty;

    /// <summary>
    /// Consentimento LGPD (deve ser true para aceitar)
    /// </summary>
    [Range(typeof(bool), "true", "true", ErrorMessage = "Consentimento LGPD é obrigatório")]
    public bool LgpdConsent { get; set; }
}

/// <summary>
/// Envia um lead/contato para um fornecedor
/// POST /api/v1/fornecedores/123/contact
/// 
/// Regras:
/// - Free tier: pode receber até 3 leads/mês
/// - Vitrine: unlimited leads
/// - Ao atingir 3 leads, envia email "ultimato"
/// - Incrementa LeadCount automaticamente
/// </summary>
[HttpPost("{id}/contact")]
[AllowAnonymous]
[ProducesResponseType(typeof(LeadSubmitResponse), StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status404NotFound)]
[ProducesResponseType(StatusCodes.Status429TooManyRequests)]
public async Task<IActionResult> SubmitLead(int id, [FromBody] SubmitLeadRequest request)
{
    try
    {
        // Validar fornecedor
        var fornecedor = await _context.Fornecedores
            .FirstOrDefaultAsync(f => f.Id == id && f.Ativo);

        if (fornecedor == null)
            return NotFound(new { message = "Fornecedor não encontrado" });

        // Verificar se é Free tier e já atingiu limite de 3 leads
        var isFree = fornecedor.PlanLevel == (int)PlanLevel.Free;
        if (isFree && fornecedor.LeadCount >= 3)
        {
            return StatusCode(StatusCodes.Status429TooManyRequested,
                new { message = "Este fornecedor atingiu o limite de leads para este mês" });
        }

        // Criar registro de lead
        var lead = new FornecedorLead
        {
            FornecedorId = id,
            ClienteName = request.ClienteName,
            ClienteEmail = request.ClienteEmail,
            ClientePhone = request.ClientePhone,
            Message = request.Message,
            LgpdConsent = request.LgpdConsent,
            CreatedAt = DateTime.UtcNow,
            EmailSent = false,
            IsRead = false
        };

        _context.FornecedorLeads.Add(lead);

        // Incrementar LeadCount
        fornecedor.LeadCount++;

        // Enviar email ao fornecedor (background job)
        await _emailService.SendLeadNotificationAsync(fornecedor, lead);

        // Se atingiu 3 leads, enviar email "ultimato" para upgrade
        if (isFree && fornecedor.LeadCount == 3)
        {
            await _emailService.SendUltimateEmailAsync(fornecedor);
        }

        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFornecedorPublic), new { id },
            new LeadSubmitResponse
            {
                Success = true,
                Message = "Lead recebido com sucesso. O fornecedor entrará em contato em breve.",
                LeadId = lead.Id
            });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, $"Erro ao enviar lead para fornecedor {id}");
        return StatusCode(StatusCodes.Status500InternalServerError,
            new { message = "Erro ao processar lead" });
    }
}

public class LeadSubmitResponse
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public int LeadId { get; set; }
}
```

**Checklist**:
- [ ] Endpoint criado
- [ ] Validações implementadas
- [ ] LeadCount incrementado
- [ ] Email enviado ao fornecedor (async/background)
- [ ] Email "ultimato" enviado ao atingir 3 leads
- [ ] Limite de 3 leads enforcement (429 Too Many Requests)
- [ ] Testado com Free tier
- [ ] Testado com Vitrine tier (sem limite)

---

### P1-9: Criar Endpoint GET `/api/v1/fornecedores/me/leads` (Painel)

**Arquivo**: `Controllers/FornecedoresController.cs`

```csharp
public class LeadDto
{
    public int Id { get; set; }
    public string ClienteName { get; set; } = string.Empty;
    public string ClienteEmail { get; set; } = string.Empty;
    public string ClientePhone { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; }
    public bool IsRead { get; set; }
}

public class FornecedorLeadsResponse
{
    public int TotalLeads { get; set; }
    public int UnreadLeads { get; set; }
    public int LeadCountThisMonth { get; set; }
    public int LeadLimit { get; set; } // 3 para Free, 999999 para Vitrine
    public List<LeadDto> Leads { get; set; } = new();
}

/// <summary>
/// Lista leads recebidos pelo fornecedor autenticado
/// GET /api/v1/fornecedores/me/leads
/// Requer autenticação (JWT do fornecedor)
/// </summary>
[HttpGet("me/leads")]
[Authorize]
[ProducesResponseType(typeof(FornecedorLeadsResponse), StatusCodes.Status200OK)]
[ProducesResponseType(StatusCodes.Status401Unauthorized)]
public async Task<IActionResult> GetMyLeads(
    [FromQuery] int skip = 0,
    [FromQuery] int take = 50)
{
    try
    {
        // Obter ID do fornecedor do JWT
        var fornecedorId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

        if (fornecedorId == 0)
            return Unauthorized();

        var fornecedor = await _context.Fornecedores
            .FirstOrDefaultAsync(f => f.Id == fornecedorId);

        if (fornecedor == null)
            return Unauthorized();

        var leads = await _context.FornecedorLeads
            .AsNoTracking()
            .Where(l => l.FornecedorId == fornecedorId)
            .OrderByDescending(l => l.CreatedAt)
            .Skip(skip)
            .Take(take)
            .Select(l => new LeadDto
            {
                Id = l.Id,
                ClienteName = l.ClienteName,
                ClienteEmail = l.ClienteEmail,
                ClientePhone = l.ClientePhone,
                Message = l.Message,
                CreatedAt = l.CreatedAt,
                IsRead = l.IsRead
            })
            .ToListAsync();

        var unreadCount = await _context.FornecedorLeads
            .Where(l => l.FornecedorId == fornecedorId && !l.IsRead)
            .CountAsync();

        var leadLimit = fornecedor.PlanLevel == (int)PlanLevel.Free ? 3 : 999999;

        return Ok(new FornecedorLeadsResponse
        {
            TotalLeads = await _context.FornecedorLeads
                .Where(l => l.FornecedorId == fornecedorId)
                .CountAsync(),
            UnreadLeads = unreadCount,
            LeadCountThisMonth = fornecedor.LeadCount,
            LeadLimit = leadLimit,
            Leads = leads
        });
    }
    catch (Exception ex)
    {
        _logger.LogError(ex, "Erro ao obter leads do fornecedor");
        return StatusCode(StatusCodes.Status500InternalServerError);
    }
}
```

**Checklist**:
- [ ] Endpoint criado (autenticado)
- [ ] Retorna lista de leads com status de leitura
- [ ] Contadores: totalLeads, unreadLeads, leadCountThisMonth
- [ ] LeadLimit exibido (3 para Free, unlimited para Vitrine)
- [ ] Pagination funcionando

---

## 🟡 PRIORITY 2 - IMPORTANTE (Fazer após P1 estar pronto)

### P2-1: Integração Stripe Webhook

**Arquivo**: `Controllers/WebhookController.cs`

```csharp
[HttpPost("stripe/webhook")]
[AllowAnonymous]
[ProducesResponseType(StatusCodes.Status200OK)]
public async Task<IActionResult> HandleStripeWebhook()
{
    // Quando `checkout.session.completed` for disparado:
    // 1. Extrair StripeSubscriptionId do evento
    // 2. Encontrar fornecedor pelo email
    // 3. Atualizar: PlanLevel = 1 (Vitrine), StripeSubscriptionId, VitrineSinceDate = now, LeadCount = 0

    // Quando `customer.subscription.deleted` for disparado:
    // 1. Encontrar fornecedor pelo StripeSubscriptionId
    // 2. Downgrade: PlanLevel = 0 (Free), StripeSubscriptionId = null
}
```

---

### P2-2: Sistema de Email

**Arquivo**: `Services/IEmailService.cs` + implementação

Três templates obrigatórios:

1. **New Lead Notification** (quando recebe lead)
2. **Ultimato Email** (quando atingir 3 leads)
3. **Welcome Vitrine** (quando fazer upgrade)

---

## 📝 Resumo de Alterações

| Componente | Ação | Priority |
|-----------|------|----------|
| Fornecedor entity | Adicionar PlanLevel, LeadCount, StripeSubscriptionId | P1 |
| FornecedorLead entity | Criar nova tabela de rastreamento | P1 |
| EF Core Migration | Gerar migration com novas colunas | P1 |
| VendorPublicDto | Criar DTO com lógica tier | P1 |
| VendorPublicService | Implementar serviço com condicionalidades | P1 |
| GET /fornecedores/{id} | Refatorar para retornar VendorPublicDto | P1 |
| GET /fornecedores | Refatorar para ordenar por tier | P1 |
| POST /fornecedores/{id}/contact | Criar endpoint de lead form | P1 |
| GET /fornecedores/me/leads | Criar painel (autenticado) | P1 |
| Stripe Webhook | Integrar pagamento → upgrade tier | P2 |
| Email Service | Configurar templates (3 obrigatórios) | P2 |

---

## 🎯 Checklist de Entrega

- [ ] Todas as entities criadas/atualizadas
- [ ] Migration aplicada ao banco de dados
- [ ] VendorPublicService implementado e registrado no DI
- [ ] 4 endpoints testados (GET detail, GET list, POST contact, GET leads)
- [ ] Lead form incrementa LeadCount corretamente
- [ ] Email "ultimato" dispara ao 3º lead
- [ ] Free tier bloqueia leads após limite (429)
- [ ] Vitrine tier permite unlimited leads
- [ ] Ad injection mostra 3 concorrentes em zumbi state
- [ ] Testes de integração passando
- [ ] Documentação Swagger atualizada

---

## 📞 Contato & Dúvidas

Se tiver dúvidas sobre os requisitos, abra uma issue no repositório com tag `[backend-tier-system]`.

