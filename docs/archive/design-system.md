# Design System — Guia de Noivas Piracicaba

Última atualização: Novembro de 2025

Objetivo
--------
Este documento descreve as diretrizes visuais e de interface para o projeto `Guia de Noivas Piracicaba`. O objetivo é permitir que desenvolvedores front-end e designers mantenham consistência visual (cores, tipografia, espaçamentos, componentes e acessibilidade) ao implementar novos módulos.

Visão geral
-----------
- Framework CSS: Tailwind CSS (já presente no projeto). Use utilitários do Tailwind sempre que possível.
- Estratégia: Design token + componentes utilitários. Tokens expostos via CSS variables e replicados no `tailwind.config.js` para uso direto das classes utilitárias.

Paleta de cores (tokens)
------------------------
Recomenda-se expor cores como variáveis CSS e mapear as mesmas no `tailwind.config.js`.

- Primária (rosa):
  - `--color-primary`: #BE185D  /* principal */
  - `--color-primary-700`: #97124A
  - `--color-primary-400`: #F472B6
- Acento / destaque:
  - `--color-accent`: #FDE68A
- Texto e superfícies:
  - `--color-bg`: #FFFFFF
  - `--color-surface`: #F7F7F8
  - `--color-text`: #374151  /* gray-700 */
  - `--color-muted`: #6B7280 /* gray-500 */
  - `--color-border`: #E5E7EB /* gray-200 */
- Semânticas:
  - `--color-success`: #16A34A
  - `--color-danger`: #DC2626

Observação: esses são *tokens* de exemplo — ajuste conforme identidade final. Mapear no `tailwind.config.js` como `theme.extend.colors` para criar utilitários `bg-primary`, `text-primary`, etc., ou usar `bg-[var(--color-primary)]` se preferir.

Tipografia
----------
- Fontes recomendadas:
  - Headings (serif): 'Playfair Display', Georgia, serif; (uso atual: `font-serif`).
  - Texto (sans): 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif.
- Escala de tamanhos (tokens):
  - `--fs-xxl`: 2.5rem (h1 / text-4xl)
  - `--fs-xl`: 1.875rem (h2 / text-3xl)
  - `--fs-lg`: 1.25rem (h3 / text-xl)
  - `--fs-base`: 1rem (body)
  - `--fs-sm`: 0.875rem
  - `--fs-xs`: 0.75rem

Exemplo Tailwind:
```
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif']
      },
      colors: {
        primary: '#BE185D',
        'primary-700': '#97124A',
        accent: '#FDE68A',
        surface: '#F7F7F8',
        'text-default': '#374151'
      }
    }
  }
}
```

Espaçamento e Grid
-------------------
- Unidade base: 4px (Tailwind default scale). Use `p-4`, `mt-6`, `gap-4` etc.
- Container: `max-width` centralizado com `container mx-auto px-4` (usado no projeto).
- Breakpoints padrões (Tailwind):
  - `sm` (min-width: 640px)
  - `md` (768px)
  - `lg` (1024px)
  - `xl` (1280px)
  - `2xl` (1536px)

Componentes (padrões e exemplos)
--------------------------------
As seguintes são implementações e recomendações para componentes usados no projeto. Use classes Tailwind onde possível e criar componentes standalone quando necessário.

1) Navbar
- Estrutura: `nav > container > [logo] [links] [cta]`.
- Logo: use `routerLink='/'` e mantenha `flex items-center gap-2`. Texto principal em `font-serif text-2xl text-primary`.
- Estado móvel: menu hambúrguer ocultando links (já presente) — usar `aria-expanded` e `aria-controls` para acessibilidade.

2) Footer
- Estrutura em 4 colunas em desktop; colapsa em 1 coluna em mobile.
- Links institucionais: usar `routerLink` para rotas internas.
- Rodapé: `bg-slate-900 text-white py-8` e microtipografia em `text-sm text-gray-400`.

3) Botões
- Variantes:
  - Primary: `inline-block bg-primary text-white px-6 py-2 rounded-full shadow-md hover:bg-primary-700`.
  - Secondary (outline): `inline-block border border-primary text-primary px-4 py-2 rounded`.
  - Ghost: `bg-transparent text-text-default`.

Exemplo:
```
<button class="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-700 transition">Explorar</button>
```

4) Cartão de Fornecedor (FornecedorCard)
- Estrutura sugerida:
  - Imagem (aspect 4:3 ou 16:9) com `object-cover rounded-lg`.
  - Título (nome) em `text-lg font-semibold`.
  - Tag de cidade + rating small
  - Badges de categorias (`inline-block bg-surface px-2 py-1 rounded-full text-sm`)

Exemplo (Tailwind):
```
<article class="bg-white rounded-lg border p-4 shadow-sm">
  <img src="..." alt="..." class="w-full h-48 object-cover rounded-md mb-3">
  <h3 class="text-lg font-semibold">Doce Sonho Bolos</h3>
  <div class="flex items-center gap-2 text-sm text-muted">Piracicaba • ★ 4.8</div>
  <div class="mt-3 flex gap-2"><span class="bg-surface text-sm px-2 py-1 rounded-full">Confeitaria</span></div>
</article>
```

5) Modal de imagem
- Fundo escurecido (`bg-black/60 fixed inset-0`), container central com `max-w-3xl mx-auto p-4` e combinação `z-50`.
- Fechar com `Esc` e botão visível com `aria-label`.

6) Formulários e Inputs
- Inputs: `w-full border border-border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400`.
- Labels em `text-sm font-medium` e mensagens de erro em `text-sm text-danger`.

7) Badges / Selo
- Selo 'Fornecedor Guia 2026': usar badge com cor primária em `px-2 py-1 rounded-full text-xs font-semibold bg-primary text-white`.

8) Avisos / Toasts
- Position: fixed bottom-right (mobile: bottom-center).
- Estilo: `bg-white border shadow p-3 rounded` para toasts informativos e `bg-danger text-white` para erros.

9) Carregadores / Skeletons
- Use skeletons para imagens e blocos de texto (`animate-pulse bg-surface rounded`), especialmente em listagens.

Imagens
-------
- Aspect ratio: padronizar em 4:3 para listagens e 16:9 para banners.
- Tamanhos recomendados:
  - Thumbnail listagem: 480x360
  - Imagem destaque full: 1200x800
- Otimização: gerar múltiplas resoluções e usar `srcset` + `loading="lazy"`.

Ícones
------
- Uso de `app-icon` (componente do projeto) — padronizar nome/size (16/20/24/32).
- Preferir SVGs inline para controle de cor via CSS (fill/currentColor).

Animações e micro-interações
----------------------------
- Transições: `transition-colors`, `transition-transform` com `duration-150` ou `duration-200`.
- Hover nos botões: leve elevação (`transform translate-y-0.5`) e mudança de cor.
- Preferir animações sutis para não distrair.

Design Tokens e integração com Tailwind
-------------------------------------
- Declare tokens CSS em `src/styles.css` ou `:root` (exemplo):
```
:root{
  --color-primary: #BE185D;
  --color-surface: #F7F7F8;
  --color-text: #374151;
}
```
- No `tailwind.config.js`, estenda `colors` usando os hexes das variáveis ou referencie as variáveis com `bg-[var(--color-primary)]` quando necessário.

Estrutura de arquivos e padrões para componentes
------------------------------------------------
- Cada componente compartilhado em `src/app/shared/components/<component-name>/` com:
  - `<component>.ts` (standalone component)
  - `<component>.html` (template)
  - `<component>.css` (estilos locais mínimos)
  - `index.ts` exportando o componente
- Nome de arquivos: kebab-case para componentes, PascalCase para classes TS.

Acessibilidade (A11y)
---------------------
- Contraste: garanta contraste mínimo 4.5:1 para texto normal e 3:1 para textos grandes.
- Imagens: sempre definir `alt` significativo.
- Keyboard: todos os componentes interativos devem ser acessíveis por teclado (tabindex, aria-attributes).
- Focus states: visíveis e consistentes (`ring-2 ring-offset-2 ring-primary-400`).
- ARIA: use roles/labels quando necessário (modals, dialogs, alerts).

Padrões de conteúdo e microcopy
-------------------------------
- Botões: Verbos de ação no imperativo (Ex.: "Explorar Fornecedores", "Enviar Mensagem").
- Títulos e cabeçalhos: usar texto claro e orientado para ação.

Regras de revisão visual
------------------------
- Antes de mesclar qualquer novo módulo:
  - Verificar uso correto de tokens (cores/espacamentos/typography).
  - Testar em mobile/desktop (breakpoints).
  - Executar checklist de acessibilidade (contrast, keyboard).

Exemplos rápidos (snippet para cartão de fornecedor)
```
<article class="bg-white rounded-lg border p-4 shadow-sm">
  <img src="/assets/fotos/provedor-1.jpg" alt="Novo Espaço Fulano" class="w-full h-48 object-cover rounded-md mb-3">
  <h3 class="text-lg font-serif font-semibold text-text-default">Espaço Fulano</h3>
  <div class="flex items-center gap-2 text-sm text-muted">Piracicaba • <span class="text-amber-500">★ 4.9</span></div>
  <div class="mt-3 flex gap-2"><span class="bg-surface px-2 py-1 rounded-full text-sm">Espaços</span></div>
</article>
```

Como contribuir / adicionar componentes
--------------------------------------
1. Criar componente em `src/app/shared/components/<name>` seguindo padrão.
2. Registrar export em `src/app/shared/components/index.ts`.
3. Atualizar documentações e exemplares em `/docs` se necessário.

Check-list de entrega visual
---------------------------
- [ ] Paleta aplicada via tokens
- [ ] Tipografia e escala aplicadas
- [ ] Componentes responsivos e com estados (hover/focus/active)
- [ ] Acessibilidade testada (keyboard e contraste)
- [ ] Testes visuais e revisão cross-browser

Recursos adicionais
-------------------
- Tailwind docs: https://tailwindcss.com/docs
- Ferramentas de contraste: https://webaim.org/resources/contrastchecker/
- Sanitização HTML: Ganss.XSS (C#) para o lado backend

Conclusão
---------
Este documento serve como referência principal para manter consistência visual no projeto. Se desejar, posso gerar uma versão condensada (PDF) ou exemplos Angular prontos para copiar e colar.
