# CORS Configuration Required

## Issue
Frontend está bloqueado por CORS ao acessar:
- `GET https://guia-noivas.somee.com/api/v1/contratos/termo-adesao?tipo=ADESAO`

## Error
```
Access to XMLHttpRequest at 'https://guia-noivas.somee.com/api/v1/contratos/termo-adesao?tipo=ADESAO' 
from origin 'http://localhost:4200' has been blocked by CORS policy: 
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solution (Backend)

### .NET 9 Configuration

**Program.cs** (ou Startup.cs):

```csharp
var builder = WebApplication.CreateBuilder(args);

// Adicionar CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:4200",           // Angular Dev Server
                "https://guia-noivas-piracicaba.netlify.app", // Produção
                "https://www.guianoivaspiracicaba.com.br"     // Domínio customizado
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials();
    });
});

var app = builder.Build();

// Usar CORS (ANTES de UseRouting/UseEndpoints)
app.UseCors("AllowFrontend");

app.UseRouting();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### Alternative (Allow All - Dev Only)

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

app.UseCors("AllowAll");
```

## Endpoints That Need CORS

1. `GET /api/v1/contratos/termo-adesao?tipo={tipo}`
2. `POST /api/v1/fornecedores/aceitar-termo`
3. `POST /api/v1/fornecedores/adesao-express`
4. `GET /api/v1/fornecedores/{id}/comprovante-aceite/{protocolo}`

## Testing

After backend changes:
```bash
curl -i -X OPTIONS https://guia-noivas.somee.com/api/v1/contratos/termo-adesao \
  -H "Origin: http://localhost:4200" \
  -H "Access-Control-Request-Method: GET"
```

Should return:
```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: http://localhost:4200
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
```

## Temporary Frontend Mock

Frontend está usando mock temporário até CORS ser configurado (ver `comecar-page.ts:108`).

**Remover mock** após backend configurar CORS corretamente.
