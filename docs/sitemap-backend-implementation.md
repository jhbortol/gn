# Implementação de Sitemap Dinâmico - Backend .NET 9

## Endpoint: GET /api/v1/sitemap.xml

### Controller: SitemapController.cs

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;

namespace GuiaNoivas.API.Controllers
{
    [ApiController]
    [Route("api/v1")]
    public class SitemapController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public SitemapController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// Gera sitemap.xml dinâmico com todas as URLs do site
        /// </summary>
        [HttpGet("sitemap.xml")]
        [Produces("application/xml")]
        [ResponseCache(Duration = 3600)] // Cache de 1 hora
        public async Task<IActionResult> GetSitemap()
        {
            var baseUrl = _configuration["SiteUrl"] ?? "https://guianoivas.com";
            var now = DateTime.UtcNow.ToString("yyyy-MM-dd");

            // Buscar fornecedores ativos
            var fornecedores = await _context.Fornecedores
                .Where(f => f.Ativo)
                .Select(f => new {
                    f.Slug,
                    UpdatedAt = f.UpdatedAt ?? f.CreatedAt
                })
                .ToListAsync();

            // Buscar artigos publicados do blog
            var artigos = await _context.ArtigosBlog
                .Where(a => a.Publicado && a.DataPublicacao <= DateTime.UtcNow)
                .Select(a => new {
                    a.Slug,
                    a.DataPublicacao,
                    a.DataAtualizacao
                })
                .ToListAsync();

            // Buscar categorias ativas
            var categorias = await _context.Categorias
                .Where(c => c.Ativa)
                .Select(c => new {
                    c.Slug,
                    c.UpdatedAt
                })
                .ToListAsync();

            var sitemap = new XDocument(
                new XDeclaration("1.0", "UTF-8", null),
                new XElement("urlset",
                    new XAttribute("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9"),

                    // HOME
                    CreateUrl($"{baseUrl}/", now, "daily", "1.0"),
                    CreateUrl($"{baseUrl}/piracicaba", now, "daily", "1.0"),

                    // PÁGINAS INSTITUCIONAIS
                    CreateUrl($"{baseUrl}/piracicaba/institucional/sobre-nos", now, "monthly", "0.8"),
                    CreateUrl($"{baseUrl}/piracicaba/institucional/termos", now, "monthly", "0.5"),
                    CreateUrl($"{baseUrl}/piracicaba/termos", now, "monthly", "0.5"),

                    // PÁGINAS COMERCIAIS
                    CreateUrl($"{baseUrl}/piracicaba/contato", now, "monthly", "0.7"),
                    CreateUrl($"{baseUrl}/piracicaba/anuncie", now, "monthly", "0.9"),
                    CreateUrl($"{baseUrl}/piracicaba/indicado", now, "monthly", "0.8"),
                    CreateUrl($"{baseUrl}/piracicaba/midia-kit", now, "monthly", "0.6"),

                    // GUIA DE PREÇOS E CUSTOS
                    CreateUrl($"{baseUrl}/piracicaba/guia-precos", now, "weekly", "0.9"),
                    CreateUrl($"{baseUrl}/piracicaba/guia-precos/buffet", now, "weekly", "0.8"),
                    CreateUrl($"{baseUrl}/piracicaba/guia-precos/fotografia", now, "weekly", "0.8"),
                    CreateUrl($"{baseUrl}/piracicaba/guia-precos/vestido", now, "weekly", "0.8"),
                    CreateUrl($"{baseUrl}/piracicaba/guia-precos/decoracao", now, "weekly", "0.8"),
                    CreateUrl($"{baseUrl}/piracicaba/guia-precos/bolo", now, "weekly", "0.8"),
                    CreateUrl($"{baseUrl}/piracicaba/guia-precos/convites", now, "weekly", "0.8"),
                    CreateUrl($"{baseUrl}/piracicaba/guia-custos", now, "weekly", "0.8"),

                    // CATEGORIAS (Páginas principais)
                    CreateUrl($"{baseUrl}/piracicaba/categorias", now, "weekly", "0.9"),

                    // CATEGORIAS DINÂMICAS
                    categorias.Select(c => CreateUrl(
                        $"{baseUrl}/piracicaba/categorias/{c.Slug}",
                        c.UpdatedAt?.ToString("yyyy-MM-dd") ?? now,
                        "weekly",
                        "0.9"
                    )),

                    // FORNECEDORES (Página principal)
                    CreateUrl($"{baseUrl}/piracicaba/fornecedores", now, "daily", "0.9"),

                    // FORNECEDORES DINÂMICOS
                    fornecedores.Select(f => CreateUrl(
                        $"{baseUrl}/piracicaba/fornecedores/{f.Slug}",
                        f.UpdatedAt.ToString("yyyy-MM-dd"),
                        "weekly",
                        "0.8"
                    )),

                    // BLOG (Página principal)
                    CreateUrl($"{baseUrl}/piracicaba/blog", now, "weekly", "0.8"),

                    // ARTIGOS DO BLOG DINÂMICOS
                    artigos.Select(a => CreateUrl(
                        $"{baseUrl}/piracicaba/blog/{a.Slug}",
                        (a.DataAtualizacao ?? a.DataPublicacao).ToString("yyyy-MM-dd"),
                        "monthly",
                        "0.7"
                    ))
                )
            );

            return Content(sitemap.ToString(), "application/xml");
        }

        private static XElement CreateUrl(string loc, string lastmod, string changefreq, string priority)
        {
            return new XElement("url",
                new XElement("loc", loc),
                new XElement("lastmod", lastmod),
                new XElement("changefreq", changefreq),
                new XElement("priority", priority)
            );
        }
    }
}
```

## Configuração no appsettings.json

```json
{
  "SiteUrl": "https://guianoivas.com",
  "ConnectionStrings": {
    "DefaultConnection": "Server=.\\SQLEXPRESS;Database=GuiaNoivas;..."
  }
}
```

## Models Necessários (se não existirem)

### ArtigosBlog.cs
```csharp
public class ArtigosBlog
{
    public Guid Id { get; set; }
    public string Titulo { get; set; }
    public string Slug { get; set; }
    public string Conteudo { get; set; }
    public bool Publicado { get; set; }
    public DateTime DataPublicacao { get; set; }
    public DateTime? DataAtualizacao { get; set; }
}
```

## Configuração de CORS

No `Program.cs`, certifique-se de que o CORS permite o domínio:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:4200",
            "https://guianoivas.com",
            "https://www.guianoivas.com"
        )
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});

// Antes de UseRouting
app.UseCors("AllowFrontend");
```

## Configuração no Frontend

### 1. Atualizar public/_redirects

Adicione no arquivo `public/_redirects`:

```
/sitemap.xml https://guia-noivas.somee.com/api/v1/sitemap.xml 200
```

### 2. Ou criar proxy reverso no Netlify

Em `netlify.toml`:

```toml
[[redirects]]
  from = "/sitemap.xml"
  to = "https://guia-noivas.somee.com/api/v1/sitemap.xml"
  status = 200
  force = true
```

## Testar o Endpoint

```bash
curl https://guia-noivas.somee.com/api/v1/sitemap.xml
```

Ou acesse direto no navegador:
```
https://guia-noivas.somee.com/api/v1/sitemap.xml
```

## Registro no Google Search Console

Depois de implementado:

1. Acesse https://search.google.com/search-console
2. Adicione a propriedade `guianoivas.com`
3. Vá em **Sitemaps** → Adicionar sitemap
4. Insira: `https://guianoivas.com/sitemap.xml`

## Cache e Performance

O endpoint tem cache de 1 hora (`ResponseCache(Duration = 3600)`). Para invalidar o cache manualmente quando houver mudanças críticas:

```csharp
[HttpPost("api/v1/sitemap/invalidate")]
[Authorize(Roles = "Admin")]
public IActionResult InvalidateSitemapCache()
{
    Response.Headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
    return Ok(new { message = "Cache invalidado" });
}
```

## Verificação

Após deploy, teste:
1. `https://guianoivas.com/sitemap.xml` deve retornar o XML
2. Validar em https://www.xml-sitemaps.com/validate-xml-sitemap.html
3. Verificar se todos os fornecedores e artigos aparecem
