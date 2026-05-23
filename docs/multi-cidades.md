# Multi-cidade — Documentação Frontend (App Noivas / Portal Público)

> Última atualização backend: **21/05/2026**
>  
> Status backend multi-cidades no App/Portal público: **concluído** (rotas por cidade, filtro obrigatório e sitemap dinâmico).

## Objetivo
Implementar experiência 100% dinâmica por cidade no app/portal público das noivas, usando os novos endpoints e contratos multi-cidade do backend.

## Ajustes de Backend já implementados
- Novo domínio de cidades (`Cidade`) e vínculo N:N fornecedor↔cidade (`FornecedorCidade`)
- Cidade principal por fornecedor (`cidadePrincipalId`)
- Endpoints públicos:
  - `GET /v1/public/cidades`
  - `GET /v1/public/cidades/{slug}`
  - `GET /v1/public/{cidadeSlug}/fornecedores?categorias={ids}&skip=&take=`
  - `GET /v1/public/{cidadeSlug}/fornecedores/{fornecedorSlug}`
- Endpoint legado com filtro obrigatório:
  - `GET /v1/public/fornecedores?categorias={ids}&cidadeSlug={slug}`
- Busca pública com filtro de cidade obrigatório:
  - `GET /v1/search/fornecedores?...&cidadeSlug={slug}`
- Sitemap dinâmico por cidade
- Endpoints de cidades públicas:
  - `GET /v1/public/cidades`
  - `GET /v1/public/cidades/{slug}`

## Contrato esperado no frontend (Fornecedor público)
`VendorPublicDto` agora expõe:
- `cidadePrincipal: { id, nome, slug, estado }`
- `cidades: [{ id, nome, slug, estado }]`
- `cidade` (campo legado para compatibilidade)

## Fluxo recomendado no App Noivas
1. Resolver cidade ativa pelo slug da URL (`/piracicaba`, `/limeira`, etc.)
2. Carregar catálogo por cidade e categorias
3. Navegar para detalhe com rota canônica por cidade:
   - `/{cidadeSlug}/fornecedores/{fornecedorSlug}`
4. Em fallback (link antigo), redirecionar para rota canônica usando `cidadePrincipal.slug`

## Regras para o time frontend
- `cidadeSlug` é obrigatório em listagem e busca
- Nunca montar URL com cidade hardcoded
- Sempre usar slug da cidade selecionada/URL
- Em SSR/SEO:
  - título e descrição devem incluir cidade
  - canonical deve apontar para `cidadePrincipal`

## Checklist de implementação frontend
- [ ] Criar estado global de cidade (slug + dados da cidade)
- [ ] Trocar chamadas antigas por endpoints com `{cidadeSlug}`
- [ ] Ajustar rotas públicas para `/{cidadeSlug}/fornecedores/{slug}`
- [ ] Adicionar fallback/redirect para links antigos
- [ ] Atualizar metadata SEO por cidade
- [ ] Validar navegação cruzada entre cidades

## Checklist de validação rápida (frontend app/portal)
- [ ] Carregar cidades via `GET /v1/public/cidades`
- [ ] Validar listagem com `GET /v1/public/{cidadeSlug}/fornecedores`
- [ ] Validar detalhe com `GET /v1/public/{cidadeSlug}/fornecedores/{fornecedorSlug}`
- [ ] Validar busca com `cidadeSlug` obrigatório
- [ ] Validar canonical/meta por cidade
