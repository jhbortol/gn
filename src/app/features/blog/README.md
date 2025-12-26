# Módulo de Blog - Guia Noivas

## 📝 Descrição

Módulo completo de blog otimizado para SEO, com listagem de artigos, página de detalhe, busca, filtros por categoria e compartilhamento social.

## ✨ Features

### SEO Otimizado
- ✅ Meta tags dinâmicas (title, description)
- ✅ Open Graph tags (Facebook)
- ✅ Twitter Cards
- ✅ Structured Data (Schema.org - BlogPosting)
- ✅ URLs amigáveis (slugs)
- ✅ Breadcrumbs
- ✅ Imagens otimizadas (NgOptimizedImage)
- ✅ Lazy loading

### Funcionalidades
- ✅ Listagem de artigos com paginação
- ✅ Busca de artigos
- ✅ Filtros por categoria (Dicas, Inspiração, Guias)
- ✅ Página de detalhe com conteúdo HTML
- ✅ Artigos relacionados
- ✅ Contador de visualizações
- ✅ Compartilhamento (Facebook, WhatsApp)
- ✅ Tags
- ✅ Autor e data de publicação
- ✅ Imagem destacada

### Tracking
- ✅ Meta Pixel (ViewContent em visualização de artigo)
- ✅ Google Analytics (eventos personalizados)

## 🗂️ Estrutura de Arquivos

```
src/app/features/blog/
├── blog-module.ts                    # Módulo principal
├── blog-routing-module.ts            # Rotas do blog
├── services/
│   └── blog-data.ts                  # Service para consumir API
├── blog-list/
│   ├── blog-list-page.ts             # Componente listagem
│   ├── blog-list-page.html           # Template listagem
│   └── blog-list-page.css            # Estilos listagem
└── blog-detail/
    ├── blog-detail-page.ts           # Componente detalhe
    ├── blog-detail-page.html         # Template detalhe
    └── blog-detail-page.css          # Estilos detalhe
```

## 🔌 Endpoints de API Esperados

### GET `/api/v1/blog/posts`
Lista todos os artigos.

**Query params:**
- `page` (default: 1)
- `pageSize` (default: 12)
- `category` (opcional: 'dicas', 'inspiracao', 'guias')

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Como escolher o vestido perfeito",
      "slug": "como-escolher-vestido-perfeito",
      "excerpt": "Resumo do artigo...",
      "featuredImage": "https://...",
      "author": "Maria Silva",
      "publishedAt": "2025-12-21T10:00:00Z",
      "category": "dicas",
      "tags": ["vestido", "noiva"],
      "views": 150
    }
  ],
  "meta": {
    "total": 42,
    "page": 1,
    "pageSize": 12
  }
}
```

### GET `/api/v1/blog/posts/slug/:slug`
Busca artigo por slug.

**Response:**
```json
{
  "id": "uuid",
  "title": "Como escolher o vestido perfeito",
  "slug": "como-escolher-vestido-perfeito",
  "excerpt": "Resumo do artigo...",
  "content": "<p>Conteúdo HTML completo...</p>",
  "featuredImage": "https://...",
  "author": "Maria Silva",
  "publishedAt": "2025-12-21T10:00:00Z",
  "updatedAt": "2025-12-22T15:00:00Z",
  "category": "dicas",
  "tags": ["vestido", "noiva"],
  "metaTitle": "Como escolher o vestido perfeito | Blog",
  "metaDescription": "Dicas completas...",
  "views": 150
}
```

### GET `/api/v1/blog/posts/:id/related`
Busca artigos relacionados.

**Query params:**
- `limit` (default: 3)

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Acessórios para noivas",
      "slug": "acessorios-para-noivas",
      "excerpt": "...",
      "featuredImage": "...",
      "publishedAt": "..."
    }
  ]
}
```

### POST `/api/v1/blog/posts/:id/view`
Incrementa contador de visualizações.

**Response:** `204 No Content`

### GET `/api/v1/blog/posts/search`
Busca artigos por termo.

**Query params:**
- `q` (termo de busca)
- `page` (default: 1)
- `pageSize` (default: 12)

**Response:** Mesmo formato do GET `/posts`

## 🚀 Como Usar

### Acessar o Blog
- **Listagem:** `https://guianoivas.com/piracicaba/blog`
- **Detalhe:** `https://guianoivas.com/piracicaba/blog/:slug`

### Filtros
- `?categoria=dicas` - Filtra por categoria

### Links no Menu
O blog já está adicionado no navbar principal (desktop e mobile).

## 🎨 Customização

### Categorias
Para adicionar novas categorias, edite:
- `blog-list-page.html` (botões de filtro)
- Backend (validação de categorias permitidas)

### Estilos de Conteúdo
Os estilos do conteúdo HTML estão em `blog-detail-page.css` na classe `.prose`.

### Structured Data
O JSON-LD é gerado automaticamente no método `addStructuredData()` em `blog-detail-page.ts`.

## 📊 SEO Best Practices Implementadas

1. **Title Tags:** Únicos para cada artigo
2. **Meta Description:** Extraído do excerpt ou metaDescription
3. **URLs:** Slugs amigáveis (kebab-case)
4. **Imagens:** Alt text, lazy loading, responsive
5. **Structured Data:** Schema.org BlogPosting
6. **Internal Linking:** Artigos relacionados
7. **Social Sharing:** OG tags + compartilhamento fácil
8. **Mobile Friendly:** Design responsivo
9. **Fast Loading:** Lazy loading, otimização de imagens

## 📈 Próximos Passos (Opcional)

- [ ] Sitemap XML dinâmico para artigos
- [ ] RSS Feed
- [ ] Comentários (Disqus ou similar)
- [ ] Newsletter signup no final dos artigos
- [ ] Breadcrumbs dinâmicos
- [ ] Canonical URLs
- [ ] AMP (Accelerated Mobile Pages)
- [ ] Infinite scroll ou paginação avançada
- [ ] Filtros avançados (por data, autor, múltiplas tags)

## 🧪 Testando

1. Acesse `http://localhost:4200/piracicaba/blog`
2. Teste a busca
3. Clique em um artigo
4. Verifique meta tags com:
   - View Page Source
   - Meta Pixel Helper (Chrome extension)
   - Facebook Sharing Debugger
   - Google Rich Results Test

---

**Nota:** O backend precisa implementar os endpoints listados acima para o blog funcionar completamente.
