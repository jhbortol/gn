# Preview Mode - Visualização de Perfil do Fornecedor

## Descrição

Feature que permite fornecedores visualizarem seus perfis públicos **antes** de serem aprovados/publicados (quando `publicado = false`).

## Funcionalidades

### 1. Botão de Preview no Painel
- **Localização:** Página de Perfil (`/painel/perfil`)
- **Comportamento:** Abre o perfil público em uma nova aba com parâmetro `?preview=true`
- **Visual:** 
  - Botão roxo com ícone de olho
  - Aviso amarelo quando perfil não está publicado
  - Status "Publicado" colorido (verde = sim, laranja = não)

### 2. Banner de Preview
- **Localização:** Topo da página do fornecedor quando `?preview=true`
- **Visual:** Banner roxo fixo com ícone e mensagem informativa
- **Mensagem:** "Esta é uma visualização do seu perfil. Esta página não está visível publicamente ainda."

### 3. Backend Integration
- **Query Parameter:** `preview=true`
- **Endpoint:** `/api/v1/fornecedores/{id}` ou `/api/v1/fornecedores/slug/{slug}`
- **Comportamento Esperado:** Backend deve **ignorar** o filtro `publicado = true` quando `preview=true` estiver presente

## Fluxo do Usuário

1. Fornecedor faz login no painel (`/painel/login`)
2. Acessa "Meu Perfil" (`/painel/perfil`)
3. Vê status de publicação (Sim/Não)
4. Clica em "Visualizar Perfil Público"
5. Nova aba abre com URL: `/{cidade}/fornecedores/{slug}?preview=true`
6. Vê banner de preview no topo
7. Navega pelo perfil completo (galeria, descrição, contatos, depoimentos)

## Implementação Técnica

### Variável de Ambiente

O controle de exibição de fornecedores é feito via variável de ambiente:

```typescript
// environment.ts
export const environment = {
  FORNECEDOR_PUBLICADO: null as boolean | null
};
```

- **`null`** (dev/staging): Backend retorna **todos** os fornecedores
- **`true`** (produção): Backend retorna **apenas** fornecedores com `publicado = true`
- **Preview mode**: Parâmetro `?preview=true` faz backend ignorar filtro mesmo em produção

### Frontend

#### Validação de Publicação
A validação é feita **exclusivamente no backend**. O frontend:
- ✅ Envia `preview=true` quando necessário
- ✅ Exibe 404 se backend retornar erro (404)
- ❌ **NÃO** valida campo `publicado` localmente (evita duplicação de lógica)

```typescript
// fornecedor-page.ts
ngOnInit(): void {
  this.fornecedores.getById(identifier, this.isPreviewMode).subscribe({
    next: (f) => this.fornecedor = f,
    error: (err) => this.notFound = true // Backend já aplicou regras
  });
}
```

#### Perfil Page (`painel/perfil`)
```typescript
openPreview(): void {
  const cidade = this.fornecedor.cidade || 'piracicaba';
  const url = this.cidadeService.buildUrl(`fornecedores/${this.fornecedor.slug}?preview=true`);
  window.open(url, '_blank');
}
```

#### Fornecedor Service
```typescript
getById(identifier: string, preview = false): Observable<Fornecedor> {
  const params: any = {};
  if (preview) params.preview = 'true';
  return this.api.get<FornecedorDetailDto>(endpoint, params);
}
```

#### Fornecedor Page
```typescript
ngOnInit(): void {
  this.isPreviewMode = this.route.snapshot.queryParams['preview'] === 'true';
  this.fornecedores.getById(identifier, this.isPreviewMode).subscribe(...);
}
```

### Backend (Esperado)

```csharp
[HttpGet("{id}")]
public async Task<ActionResult<FornecedorDetailDto>> GetById(Guid id, [FromQuery] bool preview = false)
{
    var query = _context.Fornecedores.AsQueryable();
    
    // Se não for preview, aplicar filtro de publicado
    if (!preview)
    {
        query = query.Where(f => f.Publicado == true);
    }
    
    var fornecedor = await query.FirstOrDefaultAsync(f => f.Id == id);
    // ...
}
```

## Segurança

### ✅ Considerações
- Preview mode **não** bypassa autenticação
- Qualquer pessoa com o link `?preview=true` pode visualizar perfis não publicados
- **Recomendação:** Backend deve validar que apenas o **próprio fornecedor** ou **admin** pode usar preview mode

### 🔒 Implementação Sugerida (Backend)
```csharp
if (preview)
{
    // Verificar se usuário autenticado é o dono do perfil ou admin
    var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
    var fornecedor = await _context.Fornecedores.FindAsync(id);
    
    if (fornecedor.UserId != userId && !User.IsInRole("Admin"))
    {
        return Forbid();
    }
}
```

## Benefícios

1. **Fornecedor:** Visualiza como ficará o perfil antes da aprovação
2. **Administrador:** Pode aprovar perfis com mais confiança (fornecedor já revisou)
3. **UX:** Reduz retrabalho e iterações de correção

## Testes

### Cenário 1: Perfil Publicado
- [ ] Botão de preview funciona
- [ ] Abre em nova aba
- [ ] Banner de preview **não** aparece se acessar sem `?preview=true`
- [ ] Perfil é acessível normalmente na URL pública

### Cenário 2: Perfil Não Publicado
- [ ] Aviso amarelo aparece no painel
- [ ] Botão de preview funciona
- [ ] Banner de preview aparece
- [ ] Perfil **não** é acessível sem `?preview=true` (retorna 404)
- [ ] Perfil **é** acessível com `?preview=true`

### Cenário 3: Segurança
- [ ] Preview sem autenticação retorna erro (se backend implementar validação)
- [ ] Preview de outro fornecedor retorna erro (se backend implementar validação)
- [ ] Admin pode fazer preview de qualquer perfil

## Arquivos Modificados

- `src/app/features/painel/perfil/perfil-page.ts`
- `src/app/features/painel/perfil/perfil-page.html`
- `src/app/features/painel/perfil/perfil-page.css`
- `src/app/features/fornecedores/fornecedor-page.ts`
- `src/app/features/fornecedores/fornecedor-page.html`
- `src/app/features/fornecedores/fornecedor-page.css`
- `src/app/features/fornecedores/services/fornecedores-data.ts`

## TODO Backend

- [ ] Adicionar suporte a `preview=true` no endpoint de fornecedores
- [ ] Ignorar filtro `publicado = true` quando preview está ativo
- [ ] Implementar validação de segurança (opcional mas recomendado)
- [ ] Atualizar documentação da API

---

**Nota:** Esta feature depende do backend implementar o suporte ao parâmetro `preview`. Sem isso, a visualização continuará retornando 404 para perfis não publicados.
