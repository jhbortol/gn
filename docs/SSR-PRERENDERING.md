# Angular SSR/Prerendering Implementation

## Problema Resolvido

### Antes
- O site retornava apenas um HTML vazio com `<app-root></app-root>`
- Todo conteúdo era carregado via JavaScript no navegador
- Google não conseguia indexar o conteúdo dos posts e páginas
- 76 páginas apareciam como duplicadas para o Google

### Depois  
- HTML contém todo o conteúdo renderizado no build
- Google vê títulos, textos, imagens diretamente no HTML
- Cada página tem seu conteúdo único pré-renderizado
- SEO drasticamente melhorado

## O Que Foi Implementado

### 1. Configuração do Prerendering
- Adicionado builder `@angular-devkit/build-angular:prerender` no `angular.json`
- Configuradas rotas estáticas para pré-renderização
- Desabilitado output hashing para o servidor

### 2. Servidor SSR
- Atualizado `src/server.ts` para usar `CommonEngine` do Angular
- Implementado fallback para SSR quando página não está pré-renderizada
- Mantido suporte ao sitemap.xml dinâmico

### 3. Rotas Dinâmicas
- Adicionado `getPrerenderParams()` no blog para buscar posts da API
- Configurado `app.routes.server.ts` para incluir blog posts
- Suporte para categorias e fornecedores (quando implementado)

### 4. Correções SSR
- Adicionados guards `isPlatformBrowser()` para código específico do navegador
- Protegido acesso a `document`, `window`, `localStorage`
- Corrigido tracking e analytics para não executar no servidor

## Como Usar

### Build de Produção com Prerendering

```bash
npm run prerender
```

Este comando:
1. Compila a aplicação Angular (browser bundle)
2. Compila o código do servidor (server bundle)
3. Executa o prerender de todas as rotas configuradas
4. Gera arquivos HTML estáticos na pasta `dist/guia-noivas/browser/`

### Estrutura de Saída

```
dist/guia-noivas/
├── browser/           # Arquivos para servir
│   ├── index.html    # Root
│   ├── piracicaba/
│   │   ├── index.html                    # Home
│   │   ├── blog/
│   │   │   ├── index.html                # Lista de posts
│   │   │   └── [slug]/index.html         # Post individual
│   │   ├── categorias/index.html
│   │   ├── anuncie/index.html
│   │   ├── contato/index.html
│   │   └── guia-precos/index.html
│   └── assets/
└── server/            # Código do servidor SSR
    └── main.js
```

### Deployment

#### Opção 1: Apenas Arquivos Estáticos (Recomendado para Performance)
Se você não precisa de SSR em runtime, pode servir apenas a pasta `browser`:

```bash
# Upload da pasta dist/guia-noivas/browser/ para:
# - Azure Static Web Apps
# - Netlify
# - Vercel
# - GitHub Pages
# - Qualquer CDN
```

Configurar rewrite rules para SPA:
```json
{
  "routes": [
    {
      "route": "/*",
      "rewrite": "/index.html"
    }
  ]
}
```

#### Opção 2: Com SSR Completo (Para Rotas Dinâmicas)
Para servir com Node.js e SSR:

```bash
# 1. Build com prerender
npm run prerender

# 2. Iniciar servidor Node
node dist/guia-noivas/server/main.js
```

Ou usar `npm run serve:ssr:guia-noivas`

O servidor:
- Serve arquivos pré-renderizados primeiro (se existirem)
- Cai para SSR se a página não foi pré-renderizada
- Requer Node.js 18+ no ambiente de produção

## Rotas Configuradas para Prerendering

### Rotas Estáticas (sempre pré-renderizadas):
- `/piracicaba` - Home
- `/piracicaba/categorias` - Lista de categorias
- `/piracicaba/blog` - Lista de posts
- `/piracicaba/anuncie` - Página de anúncio
- `/piracicaba/contato` - Contato
- `/piracicaba/guia-precos` - Guia de preços
- `/piracicaba/institucional/termos` - Termos
- `/piracicaba/institucional/privacidade` - Privacidade
- `/piracicaba/institucional/sobre` - Sobre

### Rotas Dinâmicas (fetch da API durante build):
- `/piracicaba/blog/[slug]` - Posts do blog (busca slugs da API)
- `/piracicaba/categorias/[id]` - Categorias (quando implementado)
- `/piracicaba/fornecedores/[id]` - Fornecedores (quando implementado)

## Adicionando Novas Rotas

### Para Rotas Estáticas
Adicione no `angular.json` na seção `prerender.options.routes`:

```json
"routes": [
  "/piracicaba",
  "/piracicaba/nova-rota"
]
```

### Para Rotas Dinâmicas
1. Crie função `getPrerenderParams()` no routing module:

```typescript
// src/app/features/meu-modulo/meu-routing-module.ts
export async function getPrerenderParams(): Promise<{ id: string }[]> {
  try {
    const apiUrl = process.env['API_BASE_URL'] || 'https://...';
    const response = await fetch(`${apiUrl}/items`);
    const data = await response.json();
    
    return data.map((item: any) => ({
      id: item.id
    }));
  } catch (error) {
    console.warn('Error fetching params:', error);
    return [];
  }
}
```

2. Adicione em `app.routes.server.ts`:

```typescript
import { getPrerenderParams as getMeuModuloPrerenderParams } from './features/meu-modulo/meu-routing-module';

export const serverRoutes: ServerRoute[] = [
  {
    path: ':cidade/meu-modulo/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      const params = await getMeuModuloPrerenderParams();
      return params.map(p => ({
        cidade: 'piracicaba',
        id: p.id
      }));
    }
  },
  // ... outras rotas
];
```

## Verificando o Resultado

### Verificar HTML Pré-renderizado

```bash
# Ver conteúdo de uma página
cat dist/guia-noivas/browser/piracicaba/index.html | grep -o "<h1[^>]*>[^<]*</h1>"

# Deve retornar:
# <h1>O Casamento dos seus Sonhos</h1>
```

### Testar Localmente

```bash
# Servir arquivos estáticos
npx serve dist/guia-noivas/browser

# Ou com servidor SSR
npm run serve:ssr:guia-noivas
```

Acesse `http://localhost:3000/piracicaba` e veja o código-fonte (Ctrl+U).
Você deve ver o conteúdo completo no HTML, não apenas `<app-root></app-root>`.

## Troubleshooting

### Output Hashing on Server Build
The server build has `outputHashing: "none"` configured. This is **intentional and safe** because:
- The browser build still has full hashing enabled (cache-busting works)
- The prerender builder requires a predictable filename (`main.js`)
- Server-side code is not cached by browsers
- Only affects internal build tooling, not production assets

### Erro: "document is not defined"
- Adicione guard: `if (typeof document !== 'undefined')`
- Ou use `isPlatformBrowser(platformId)`

### Erro: "localStorage is not defined"  
- Use: `if (typeof window !== 'undefined' && window.localStorage)`

### API não responde durante build
- Normal! O prerender tenta fazer chamadas HTTP mas pode falhar
- As páginas serão renderizadas com skeleton/loading states
- Em produção, o conteúdo será carregado via JavaScript no cliente

### Prerender demora muito
- Reduza o número de rotas dinâmicas
- Otimize as chamadas de API (use cache)
- Considere pré-renderizar apenas as páginas mais importantes

## Próximos Passos

1. ✅ Prerendering básico funcionando
2. ⏳ Implementar `getPrerenderParams` para categorias
3. ⏳ Implementar `getPrerenderParams` para fornecedores  
4. ⏳ Configurar CI/CD para rebuild automático
5. ⏳ Configurar webhook para rebuild quando blog post é publicado
6. ⏳ Otimizar imagens e assets
7. ⏳ Implementar service worker para cache offline

## Recursos

- [Angular SSR Documentation](https://angular.io/guide/ssr)
- [Angular Prerendering](https://angular.io/guide/prerendering)
- [CommonEngine API](https://angular.io/api/ssr/node/CommonEngine)
