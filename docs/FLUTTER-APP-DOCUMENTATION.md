# Guia Noivas — Documentação para Desenvolvimento Flutter

**Versão:** 1.0  
**Data:** Abril 2026  
**Projeto:** Guia Noivas Piracicaba — Aplicativo Mobile Flutter  
**Objetivo:** Replicar todas as funcionalidades do portal web em um aplicativo nativo para iOS e Android.

---

## Sumário

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Design System](#2-design-system)
   - 2.1 Paleta de Cores
   - 2.2 Tipografia
   - 2.3 Espaçamento e Grid
   - 2.4 Bordas e Sombras
   - 2.5 Ícones
3. [Estrutura de Telas (Navegação)](#3-estrutura-de-telas-navegação)
4. [Especificação de Telas](#4-especificação-de-telas)
   - 4.1 Home
   - 4.2 Categorias
   - 4.3 Detalhe de Categoria
   - 4.4 Perfil do Fornecedor
   - 4.5 Blog — Lista
   - 4.6 Blog — Detalhe
   - 4.7 Guia de Preços
   - 4.8 Guia de Custos
   - 4.9 Anuncie
   - 4.10 Contato
   - 4.11 Sobre Nós
   - 4.12 Termos de Uso
   - 4.13 Indicado (Adesão Express)
   - 4.14 Solicitar Remoção de Dados (LGPD)
   - 4.15 Status da Solicitação de Remoção
5. [Componentes Compartilhados](#5-componentes-compartilhados)
6. [Sistema de Tiers (Planos)](#6-sistema-de-tiers-planos)
7. [Integração com a API](#7-integração-com-a-api)
   - 7.1 Configuração Base
   - 7.2 Autenticação
   - 7.3 Categorias
   - 7.4 Fornecedores
   - 7.5 Busca
   - 7.6 Leads / Contato
   - 7.7 Blog
   - 7.8 Guia de Preços (Lead Capture)
   - 7.9 Newsletter
   - 7.10 Privacidade / LGPD
   - 7.11 Claim de Perfil
   - 7.12 Contrato / Termo de Adesão
8. [Modelos de Dados](#8-modelos-de-dados)
9. [Regras de Negócio](#9-regras-de-negócio)
10. [Considerações Técnicas Flutter](#10-considerações-técnicas-flutter)
11. [Funcionalidades Exclusivas do App](#11-funcionalidades-exclusivas-do-app)
    - 11.1 Contagem Regressiva Visual (Hero Widget — Home)
    - 11.2 Gerador de Briefing Automático (Integração WhatsApp)
    - 11.3 Gestor de Orçamento (Budget Tracker)
    - 11.4 Cronograma Regressivo Dinâmico (To-Do List)
    - 11.5 Pasta de Cotações ("Meus Favoritos")
    - 11.6 Gerenciador de Lista de Convidados (CRUD)

---

## 1. Visão Geral do Produto

**Guia Noivas Piracicaba** é um diretório de fornecedores para casamentos. O portal web conecta noivas aos melhores profissionais da região de Piracicaba (SP), com suporte futuro a outras cidades.

### Proposta de Valor
- Noivas encontram fornecedores por categoria, pesquisa ou navegação
- Fornecedores obtêm visibilidade e recebem leads qualificados
- Sistema de planos diferencia fornecedores gratuitos (Free) de pagos (Vitrine)

### Cidades Suportadas
- **Piracicaba** (ativa)
- Limeira, Americana (planejadas)

### URL Base da Aplicação Web
`https://guianoivas.com/piracicaba`

---

## 2. Design System

### 2.1 Paleta de Cores

```dart
// lib/core/theme/app_colors.dart

class AppColors {
  // === PRIMÁRIA (Rosa/Rose) ===
  static const primary = Color(0xFFE11D48);       // rose-600 — cor principal
  static const primary700 = Color(0xFFBE123C);    // rose-700 — hover / pressed
  static const primary500 = Color(0xFFF43F5E);    // rose-500 — badges, destaques
  static const primary100 = Color(0xFFFFE4E6);    // rose-100 — backgrounds suaves
  static const primary50  = Color(0xFFFFF1F2);    // rose-50  — hover backgrounds

  // === ACENTO (Gradiente Hero e CTAs especiais) ===
  static const accentPurple = Color(0xFF9333EA);  // purple-600
  static const accentPink   = Color(0xFFEC4899);  // pink-600
  // Gradiente CTA "Guia de Preços":
  // from: accentPurple → to: accentPink

  // === TIER VITRINE ===
  static const vitrine      = Color(0xFFF59E0B);  // amber-500
  static const vitrine600   = Color(0xFFD97706);  // amber-600
  static const vitrine50    = Color(0xFFFFFBEB);  // amber-50

  // === VERDE (sucesso / verificado) ===
  static const success      = Color(0xFF16A34A);  // green-600
  static const successBg    = Color(0xFFF0FDF4);  // green-50

  // === AZUL (plano verificado badge) ===
  static const verified     = Color(0xFF3B82F6);  // blue-500

  // === TEAL (Selo Fornecedor legacy) ===
  static const teal         = Color(0xFF0D9488);  // teal-600

  // === NEUTROS ===
  static const white        = Color(0xFFFFFFFF);
  static const surface      = Color(0xFFF9FAFB);  // gray-50
  static const surfaceCard  = Color(0xFFFFFFFF);
  static const border       = Color(0xFFE5E7EB);  // gray-200
  static const borderLight  = Color(0xFFF3F4F6);  // gray-100
  static const textPrimary  = Color(0xFF111827);  // gray-900
  static const textBody     = Color(0xFF374151);  // gray-700
  static const textMuted    = Color(0xFF6B7280);  // gray-500
  static const textSubtle   = Color(0xFF9CA3AF);  // gray-400
  static const skeleton     = Color(0xFFE5E7EB);  // gray-200 — skeletons

  // === FUNDOS ESCUROS ===
  static const darkBg       = Color(0xFF0F172A);  // slate-900 — footer
  static const darkText     = Color(0xFFFFFFFF);

  // === HERO ===
  static const heroBg       = Color(0xFF881337);  // rose-900
  static const heroRose50   = Color(0xFFFFF1F2);  // rose-50 — subtítulo hero
  static const roseSection  = Color(0xFFFFF1F2);  // rose-50 — seção destaques

  // === ERROS ===
  static const error        = Color(0xFFDC2626);  // red-600
  static const errorBg      = Color(0xFFFEF2F2);  // red-50

  // === INSTAGRAM (botão flutuante) ===
  // Gradiente radial: #fdf497 → #fd5949 → #d6249f → #285aeb
}
```

### 2.2 Tipografia

O projeto usa duas famílias de fontes:

| Família | Uso | Flutter FontFamily |
|---------|-----|--------------------|
| **Playfair Display** (serif) | Títulos, H1, H2, nomes de fornecedores | `'PlayfairDisplay'` |
| **Inter** (sans-serif) | Corpo, labels, botões, navegação | `'Inter'` ou system |

```dart
// lib/core/theme/app_text_styles.dart

class AppTextStyles {
  // Headings (Playfair Display / serif)
  static const h1 = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 40,    // text-4xl / text-5xl
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
  );
  static const h2 = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 30,    // text-3xl
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
  );
  static const h3 = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 22,    // text-2xl
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
  );
  static const h4 = TextStyle(
    fontFamily: 'PlayfairDisplay',
    fontSize: 18,    // text-xl
    fontWeight: FontWeight.w700,
    color: AppColors.textPrimary,
  );

  // Body (Inter / sans)
  static const bodyLg = TextStyle(fontSize: 18, color: AppColors.textBody);
  static const body   = TextStyle(fontSize: 16, color: AppColors.textBody);
  static const bodySm = TextStyle(fontSize: 14, color: AppColors.textBody);
  static const caption = TextStyle(fontSize: 12, color: AppColors.textMuted);
  static const tiny   = TextStyle(fontSize: 10, color: AppColors.textSubtle);

  // Labels e Badges
  static const label = TextStyle(
    fontSize: 11,
    fontWeight: FontWeight.w700,
    letterSpacing: 0.8,
    color: AppColors.white,
  );

  // Botão primário
  static const button = TextStyle(
    fontSize: 16,
    fontWeight: FontWeight.w700,
    color: AppColors.white,
  );

  // Navbar links
  static const navLink = TextStyle(
    fontSize: 13,
    fontWeight: FontWeight.w600,
    color: AppColors.textBody,
  );
}
```

### 2.3 Espaçamento e Grid

Baseado em escala de 4px (Tailwind default):

```dart
// lib/core/theme/app_spacing.dart

class AppSpacing {
  static const double xs  = 4.0;   // p-1
  static const double sm  = 8.0;   // p-2
  static const double md  = 16.0;  // p-4
  static const double lg  = 24.0;  // p-6
  static const double xl  = 32.0;  // p-8
  static const double xxl = 48.0;  // p-12

  // Container horizontal padding
  static const double pagePadding = 16.0; // px-4

  // Raios de borda padrão
  static const double radiusSm  = 8.0;   // rounded-lg
  static const double radiusMd  = 12.0;  // rounded-xl
  static const double radiusLg  = 16.0;  // rounded-2xl
  static const double radiusFull = 9999.0; // rounded-full
}
```

### 2.4 Bordas e Sombras

```dart
// Sombra padrão de card
BoxShadow cardShadow = BoxShadow(
  color: Colors.black.withOpacity(0.06),
  blurRadius: 8,
  offset: Offset(0, 2),
);

// Sombra elevada (hover)
BoxShadow cardShadowElevated = BoxShadow(
  color: Colors.black.withOpacity(0.12),
  blurRadius: 20,
  offset: Offset(0, 6),
);

// Sombra hero search bar
BoxShadow heroSearchShadow = BoxShadow(
  color: Colors.black.withOpacity(0.25),
  blurRadius: 24,
  offset: Offset(0, 8),
);
```

### 2.5 Ícones

O projeto usa SVGs inline (classe `app-icon`). No Flutter, usar o pacote `flutter_svg` ou mapear para ícones `Material`/`Cupertino` equivalentes:

| Nome Web | Material Icon equivalente |
|----------|--------------------------|
| `heart` | `Icons.favorite` |
| `search` | `Icons.search` |
| `location` | `Icons.location_on_outlined` |
| `star` | `Icons.star_rounded` |
| `camera` | `Icons.photo_camera_outlined` |
| `close` | `Icons.close` |
| `arrow_left` | `Icons.chevron_left` |
| `arrow_right` | `Icons.chevron_right` |
| `whatsapp` | SVG customizado |
| `instagram` | SVG customizado |

---

## 3. Estrutura de Telas (Navegação)

```
App
├── Bottom Navigation Bar (4 tabs)
│   ├── [0] Home        → /piracicaba
│   ├── [1] Categorias  → /piracicaba/categorias
│   ├── [2] Blog        → /piracicaba/blog
│   └── [3] Mais        → menu drawer / sheet
│
├── Stack de Navegação
│   ├── HomeScreen
│   ├── CategoriasScreen
│   │   └── CategoriaDetalheScreen (/:slug)
│   ├── FornecedorScreen (/fornecedores/:slug)
│   ├── BlogListScreen
│   │   └── BlogDetalheScreen (/:slug)
│   ├── GuiaPrecosScreen
│   ├── GuiaCustosScreen
│   ├── AnuncieScreen
│   ├── ContatoScreen
│   ├── SobreNosScreen
│   ├── TermosScreen
│   ├── IndicadoScreen  (onboarding fornecedor)
│   ├── RemocaoDadosScreen
│   └── StatusRemocaoScreen
│
└── Overlay Components
    ├── InstagramFAB (botão flutuante)
    ├── SearchResultsSheet
    └── ImageGalleryModal
```

### Rotas Deep Link

```
guianoivas://piracicaba                          → HomeScreen
guianoivas://piracicaba/categorias               → CategoriasScreen
guianoivas://piracicaba/categorias/:slug         → CategoriaDetalheScreen
guianoivas://piracicaba/fornecedores/:slug       → FornecedorScreen
guianoivas://piracicaba/blog                     → BlogListScreen
guianoivas://piracicaba/blog/:slug               → BlogDetalheScreen
guianoivas://piracicaba/guia-precos              → GuiaPrecosScreen
guianoivas://piracicaba/guia-custos              → GuiaCustosScreen
guianoivas://piracicaba/anuncie                  → AnuncieScreen
guianoivas://piracicaba/contato                  → ContatoScreen
guianoivas://piracicaba/institucional/sobre      → SobreNosScreen
guianoivas://piracicaba/institucional/termos     → TermosScreen
guianoivas://piracicaba/indicado                 → IndicadoScreen
guianoivas://piracicaba/privacy/remocao          → RemocaoDadosScreen
guianoivas://piracicaba/privacy/status           → StatusRemocaoScreen
```

---

## 4. Especificação de Telas

### 4.1 Home

**Descrição:** Tela principal do app. Apresenta hero com busca, destaques da semana, CTA do Guia de Preços e grid de categorias.

**Seções (ordem vertical):**

1. **AppBar / Navbar**
   - Logo: ícone heart (rose-600) + "Guia Noivas" (serif, rose-600) + "Piracicaba" (sm, gray-600)
   - Ação direita: ícone de pesquisa abre SearchSheet

2. **Hero Banner**
   - Imagem de fundo: foto de casamento (Unsplash)
   - Overlay: `rose-900` com opacidade
   - Título: *"O Casamento dos seus Sonhos"* — H1 serif white, bold
   - Subtítulo: *"Começa aqui, em Piracicaba."* — text-xl, rose-100
   - Search bar horizontal:
     - Input de texto com placeholder "O que você procura? (ex: Buffet, Foto...)"
     - Botão "BUSCAR" — background rose-600, texto branco, rounded-full

3. **Painel de Resultados de Busca** (aparece abaixo do hero quando há resultados)
   - Header: "Fornecedores encontrados" + paginação
   - Grid de cards (3 colunas) com setas prev/next
   - Botão "Fechar"

4. **Destaques da Semana** (`app-destaques-semana`)
   - Background: rose-50
   - Título: "Destaques da Semana" — H2 serif
   - Grid horizontal scrollável: 1 col mobile → 4 cols tablet
   - Card: imagem (h=192), badge categoria (rose-500), nome, cidade, botão "Ver Perfil"

5. **Banner CTA "Guia de Preços"**
   - Background: gradient purple-600 → pink-600
   - Texto: "Não sabe quanto guardar de dinheiro?" (bold, white)
   - Subtexto: "Baixe o Guia de Preços de Piracicaba 2026"
   - Botão: "Baixar Grátis" — branco com texto purple-600, rounded-full

6. **Seção de Categorias**
   - Título: "Navegue por Categorias"
   - Subtítulo: "Encontre os melhores profissionais de Piracicaba"
   - Grid: 2 colunas mobile, 3 tablet, 6 desktop
   - Card de categoria: imagem (aspect 4:3) + gradient overlay + nome + descrição + "Ver fornecedores"

7. **Botão Flutuante Instagram** (FAB fixo bottom-right)
   - Gradiente Instagram (amarelo → laranja → magenta → azul)
   - Label badge "Instagram" acima do botão
   - Ao tocar: abre `https://www.instagram.com/guianoivaspiracicaba/` no browser

---

### 4.2 Categorias

**Descrição:** Grid com todas as categorias disponíveis.

**Layout:**
- Título: "Categorias" — H1 serif
- Subtítulo: "Encontre os melhores profissionais para o seu casamento"
- Grid: 1 col mobile, 2 tablet, 3 desktop
- Skeleton loader enquanto carrega

**Card de Categoria:**
- Imagem: h=192, object-cover, com zoom ao hover
- Nome: H3 serif, rose-700
- Descrição: text-gray-600
- Seção "DESTAQUES": lista de fornecedores Vitrine da categoria (com bullet rose-500)
- Botão: "Ver todos fornecedores" — outlined rose-600

---

### 4.3 Detalhe de Categoria

**Descrição:** Lista de fornecedores de uma categoria específica, com breadcrumb de volta para Home.

**Elementos:**
- Breadcrumb: "← Voltar para Home"
- Título: nome da categoria — H1 serif
- Subtítulo: "Mostrando os melhores profissionais para o seu evento."
- Grid: 2 colunas mobile, 3 tablet, 4 desktop
- Skeleton loader

**Card de Fornecedor (ListCard):**
- Imagem: h=192, object-cover
- **Badge Vitrine** (amber-500): ⭐ VITRINE — visível no topo-esquerdo da imagem
- **Badge Verificado** (teal-600): ✓ VERIFICADO — para seloFornecedor legacy
- Botão favorito (top-right): coração outline
- Conteúdo:
  - Categoria: text-[11px] rose-600 bold uppercase
  - Nome: H2 serif (com ⭐ amber para Vitrine)
  - Cidade: ícone pin + text-xs gray-600
  - Descrição: line-clamp-2, text-sm gray-600
  - Rating: ⭐ text-yellow-500 bold (se disponível)
  - Botão: "Ver Perfil" — outlined rose-600

**Diferenciação Visual por Tier nos Cards:**
- **Vitrine (planLevel=1):** borda amber-400 (2px), sombra-md, background gradient amber-50→orange-50, badge ⭐ VITRINE
- **Free (planLevel=0):** borda gray-200, background white
- **Low (planLevel=-1):** borda gray-200, background white
- **Zombie (planLevel=-2):** borda gray-200, background white

---

### 4.4 Perfil do Fornecedor

**Descrição:** Página completa do fornecedor. Estrutura em duas colunas (desktop) / coluna única (mobile). É a tela mais complexa do app.

**Banner Preview Mode** (apenas quando `?preview=true`):
- Background: gradient #667eea → #764ba2
- Texto: "Modo Preview — Esta é uma visualização do seu perfil."

**Coluna Principal (2/3 largura desktop):**

1. **Card de Informações Básicas**
   - Badge categoria: rose-500 pill
   - Nome: H1 serif + badge "VERIFICADO" azul (se Vitrine) + badge "A partir de R$ X" verde (se Vitrine + preço)
   - Cidade: ícone pin gray + texto
   - Rating: ⭐ amarelo bold (se disponível)
   - Descrição

2. **Galeria de Fotos**
   - Título: "Galeria de Fotos"
   - Contador de imagens (se tier < Vitrine e tem mais de 2)
   - **Mobile:** carrossel horizontal com scroll + indicadores ponto
   - **Desktop:** grid 2 colunas
   - Ao tocar: abre modal fullscreen com navegação prev/next
   - Limite de imagens por tier: ver seção 6

3. **Modal de Galeria (fullscreen)**
   - Background: preto
   - Botão fechar (top-right)
   - Setas prev/next (left/right center)
   - Contador "X / Y" (bottom center)

4. **Depoimentos** (apenas Vitrine, se houver)
   - Título: "O que os noivos dizem"
   - Background: gradient rose levemente
   - Cards de depoimento: aspas decorativas, texto em itálico, nome do casal

5. **Formulário de Lead** (se Free com menos de 3 leads)
   - Título: "Enviar Mensagem Direta"
   - Campo Nome (obrigatório, min 3 chars)
   - Campo WhatsApp (obrigatório, mask: (XX) XXXXX-XXXX)
   - Botão "Enviar Mensagem"
   - Disclaimer: termos de uso

6. **Card de Concorrentes** (se Free/Zombie com adInjection)
   - Título: "Veja também outros profissionais"
   - Grid de cards de anúncio com link para perfil do concorrente

**Coluna Lateral (1/3 largura desktop / bottom mobile):**

7. **Card de Contato/Orçamento**
   - Título: "Solicitar Orçamento" (Vitrine) ou "Entrar em Contato" (outros)
   - Botões condicionais por tier:
     - **Vitrine com telefone:** "Chamar no WhatsApp" (verde, WhatsApp icon)
     - **Vitrine com telefone:** "Ver Número" + número mascarado
     - **Vitrine com Instagram:** "Ver Instagram" (gradiente Instagram)
     - **Vitrine com website:** "Acessar Site"
     - **Vitrine com email:** "Enviar E-mail"
     - **Free (< 3 leads):** "Ir para formulário de contato"
   - Endereço (se disponível)
   - Horário de funcionamento (se disponível)

8. **Sticky WhatsApp Bar (Mobile, apenas Vitrine)**
   - Bar fixo no bottom: "Solicitar Orçamento via WhatsApp"
   - Background: verde, ícone WhatsApp

9. **Claim Modal** (para fornecedores não reivindicados)
   - Botão "É o dono deste perfil?"
   - Modal com formulário de claim

---

### 4.5 Blog — Lista

**Descrição:** Listagem paginada de artigos.

**Elementos:**
- Título: "Blog Guia Noivas" — H1 serif
- Subtítulo: "Dicas, inspirações e guias para o seu casamento perfeito"
- Barra de busca: input + botão "Buscar"
- Filtros de categoria: chips "Todos | Dicas | Inspiração | Guias"
- Grid: 1 col mobile, 2 tablet, 3 desktop
- Empty state: "Nenhum artigo encontrado."

**Card de Post:**
- Imagem: h=192, object-cover, rounded-t
- Badge categoria + data
- Título: H3 serif hover rose-600
- Excerpt: line-clamp-3
- Autor: "Por [Nome]"
- Link "Ler mais →"

---

### 4.6 Blog — Detalhe

**Elementos:**
- Breadcrumb: Início → Blog → Título
- Imagem destaque: h=384, rounded-2xl
- Header: badge categoria + data + visualizações
- Título: H1 serif
- Excerpt: text-xl gray-600
- Linha separadora + autor (avatar inicial + nome) + botões de compartilhar (Facebook, WhatsApp)
- Conteúdo HTML renderizado (usar `flutter_widget_from_html` ou similar)
- Tags: chips "#tag"
- Posts relacionados: grid 3 colunas

---

### 4.7 Guia de Preços

**Descrição:** Lead capture para download de PDF com tabela de preços.

**Estado 1 — Formulário:**
- Título: "Guia de Preços Piracicaba 2026"
- Subtítulo: "Planeje seu casamento com segurança!"
- Card branco com formulário:
  - Campo **Nome** (texto, obrigatório)
  - Campo **Ano pretendido** (select: 2026 / 2027 / 2028 / Ainda não decidi)
  - Campo **E-mail** (email, obrigatório)
  - Botão "Receber Tabela de Preços"
- Social proof: "Mais de 500 noivas já baixaram o guia este ano!"

**Estado 2 — Sucesso:**
- Ícone ✓ verde
- Título: "Cadastro realizado com sucesso!"
- Botão primário: "Explorar fornecedores por categoria"
- Botão secundário: "Receber Tabela de Preços" (download PDF)

---

### 4.8 Guia de Custos

**Descrição:** Página editorial com estimativas de custos (conteúdo estático/HTML).
- Título: "Guia de Custos de Casamento em Piracicaba 2026"
- Conteúdo renderizado (tabelas comparativas: perfil econômico, clássico, luxo)
- Marcado como `noindex` — não deve aparecer em buscas do Google

---

### 4.9 Anuncie

**Descrição:** Formulário de captação para novos fornecedores.

**Elementos:**
- Título: "Anuncie no Guia Noivas"
- Texto explicativo
- Formulário (via Formspree):
  - Nome do fornecedor (text, obrigatório)
  - E-mail (email, obrigatório)
  - Telefone (tel)
  - Descrição dos serviços (textarea, obrigatório)
  - Botão "Enviar"
- Feedback: sucesso ou erro

---

### 4.10 Contato

**Descrição:** Página de contato com canais e formulário.

**Canais de Atendimento:**
- Email: `contato@guianoivas.com`
- WhatsApp: `(19) 98978-6156` → `https://wa.me/5519989786156`
- Instagram: `@guianoivaspiracicaba` → `https://instagram.com/guianoivaspiracicaba`

**Formulário (via Formspree `myzdrpea`):**
- Nome
- E-mail
- Mensagem
- Botão "Enviar"

---

### 4.11 Sobre Nós

**Descrição:** Página institucional sobre o projeto.

**Seções:**
- Título: "Sobre o Guia de Noivas Piracicaba"
- Subtítulo: "Conectando Sonhos aos Melhores Profissionais da Região"
- Textos sobre a missão e proposta de valor
- Bloco destacado "Nossa Atuação e Transparência" (background levemente diferenciado)
- Botão CTA: "Explorar Fornecedores"

---

### 4.12 Termos de Uso

**Descrição:** Página de termos e condições (conteúdo HTML/texto longo).

---

### 4.13 Indicado (Adesão Express)

**Descrição:** Onboarding de fornecedor via indicação. Formulário de adesão em múltiplas seções.

**Hero:**
- Background: gradient rose-600 → red-600
- Badge: "⭐ OFERTA EXCLUSIVA POR INDICAÇÃO"
- Título: "Ativação de Cadastro 2026"
- Card de preço: R$ [PRECO_FINAL] (com tachado R$ [PRECO_ORIGINAL])
- Card verde: "🎁 Oferta — 60% OFF"

**Formulário (4 seções com headers coloridos):**
1. **Dados da Empresa** — Nome Fantasia, CNPJ/CPF, Categoria, Cidade, Descrição
2. **Dados de Contato** — Telefone/WhatsApp, Email, Website, Instagram, Facebook
3. **Termo de Adesão** — Scroll completo obrigatório, checkbox de aceite
4. **Dados Pessoais do Responsável** — Nome completo, senha

**Botão final:** "Confirmar Cadastro e Ir para Pagamento"

---

### 4.14 Solicitar Remoção de Dados (LGPD)

**Descrição:** Formulário de opt-out conforme LGPD.

**Estado Sucesso:**
- Ícone ✅, protocolo, ID da solicitação, e-mail para confirmação
- Botões: "Nova Solicitação" e "Consultar Status"

**Formulário:**
- Aviso LGPD (amber) com pontos importantes
- Busca do fornecedor por nome (autocomplete via API)
- Nome do solicitante (opcional)
- E-mail (obrigatório)
- Motivo (select):
  - A empresa encerrou atividades
  - Informações estão desatualizadas
  - Não quer receber orçamentos/contatos
  - Outro motivo
- Confirmação de propriedade (checkbox obrigatório)
- Informações adicionais (textarea)
- Botão "Enviar Solicitação"

---

### 4.15 Status da Solicitação de Remoção

**Elementos:**
- Formulário de consulta: ID da solicitação + e-mail
- Resultado: protocolo, status, timeline de eventos

---

## 5. Componentes Compartilhados

### 5.1 AppBar / Navbar

```
AppBar(
  logo: Row(
    Icon(heart, rose-600),
    Column(
      Text("Guia Noivas", serif, rose-600, 22sp),
      Text("Piracicaba", sans, gray-600, 13sp),
    )
  ),
  actions: [
    IconButton(search) → SearchSheet,
  ],
  elevation: 1,
  backgroundColor: white,
)
```

**Menu Mobile (Drawer ou BottomSheet):**
- INÍCIO
- CATEGORIAS
- BLOG
- ANUNCIE
- CONTATO
- Botão "PAINEL FORNECEDOR" (rose-600, rounded-full) → abre `https://painel.guianoivas.com`

### 5.2 Footer

Visível apenas em telas maiores ou em WebView. Para mobile, usar um menu de rodapé simplificado (bottom navigation + menu lateral).

**Colunas:**
1. "Guia Noivas" — branding
2. Categorias: links rápidos
3. Institucional: Sobre, Contato, Termos
4. Newsletter: input email + botão "Assinar"

### 5.3 SkeletonLoader

```dart
// Skeleton para cards de fornecedor
Container(
  decoration: BoxDecoration(
    color: AppColors.skeleton,
    borderRadius: BorderRadius.circular(AppSpacing.radiusLg),
  ),
  child: Shimmer.fromColors(
    baseColor: AppColors.skeleton,
    highlightColor: AppColors.white,
    child: Column(
      children: [
        // Imagem
        Container(height: 192, color: Colors.white),
        // Texto
        Padding(...)
      ]
    )
  )
)
```

### 5.4 Toast Notifications

- Posição: bottom center (mobile)
- Sucesso: background white, borda verde, ícone ✓
- Erro: background red-50, borda red, ícone ⚠

### 5.5 LeadForm (Formulário de Contato com Fornecedor)

```dart
// Campos:
// - clienteName: String (obrigatório, min 3 chars)
// - clientePhone: String (obrigatório, mask (XX) XXXXX-XXXX)

// Validações:
// - Nome: minLength(3)
// - Telefone: pattern /^\(\d{2}\)\s?\d{4,5}-?\d{4}$/

// Estados:
// - idle / submitting / success / error
```

---

## 6. Sistema de Tiers (Planos)

O comportamento de exibição de cada fornecedor varia conforme seu `planLevel`:

| planLevel | Nome | Descrição |
|-----------|------|-----------|
| `-2` | **Zombie** | Perfil criado pelo admin, não reivindicado |
| `-1` | **Low** | Perfil com visibilidade reduzida |
| `0` | **Free** | Perfil reivindicado, limite de 3 leads vitalícios |
| `1` | **Vitrine** | Plano pago — destaque máximo, leads ilimitados |

### Regras de Exibição por Tier

| Funcionalidade | Zombie (-2) | Low (-1) | Free (0) | Vitrine (1) |
|----------------|------------|---------|---------|------------|
| Aparece na listagem | ✓ | ✓ | ✓ | ✓ (primeiro) |
| Badge "VITRINE" | ✗ | ✗ | ✗ | ✓ (amber) |
| Badge "VERIFICADO" | ✗ | ✗ | ✗ | ✓ (azul) |
| Preço âncora | ✗ | ✗ | ✗ | ✓ (se precoAPartirDe) |
| Galeria de fotos | 2 fotos | 2 fotos | 2 fotos | Ilimitada |
| Depoimentos | ✗ | ✗ | ✗ | ✓ |
| Botão WhatsApp | ✗ | ✗ | ✗ | ✓ |
| Formulário de lead | ✓ (até 3) | ✓ | ✓ (até 3) | ✗ |
| Ads concorrentes | ✓ (se 3+ leads) | ✗ | ✓ (se 3+ leads) | ✗ |
| Sticky WhatsApp bar | ✗ | ✗ | ✗ | ✓ |

### Ordenação na Listagem

1. **Vitrine (planLevel=1)** — primeiro, ordenados por data de atualização
2. **Free (planLevel=0)** — segundo
3. **Low/Zombie (planLevel=-1/-2)** — último

### Limite de Imagens na Galeria

```dart
List<ImageItem> getGalleryImages(Fornecedor fornecedor) {
  if (fornecedor.planLevel == PlanLevel.vitrine) {
    return fornecedor.imagens; // todas
  }
  return fornecedor.imagens.take(2).toList(); // máximo 2
}
```

---

## 7. Integração com a API

### 7.1 Configuração Base

```dart
// lib/core/config/api_config.dart

class ApiConfig {
  // Produção
  static const baseUrlProd = 
    'https://funcguianoivasprod-e7b7atdxh8dbcnd4.brazilsouth-01.azurewebsites.net/api/v1';
  
  // Desenvolvimento
  static const baseUrlDev = 
    'https://func-guianoivas-dev-deczg2affxb9f7f7.brazilsouth-dev-01.azurewebsites.net/api/v1';
  
  // URL ativa
  static String get baseUrl => kReleaseMode ? baseUrlProd : baseUrlDev;
  
  // Timeouts
  static const Duration connectTimeout = Duration(seconds: 15);
  static const Duration receiveTimeout = Duration(seconds: 30);
}
```

### 7.2 Autenticação

O app precisa de um token JWT interno para acessar alguns endpoints. O token é obtido via login automático com credenciais internas (não expostas ao usuário).

> ⚠️ **Importante:** As credenciais internas devem ser armazenadas de forma segura (não hardcoded no código Flutter). Use `flutter_dotenv` ou variáveis de ambiente de build.

**Endpoint de Login:**
```
POST /auth/login
Content-Type: application/json

{
  "email": "INTERNAL_EMAIL",
  "password": "INTERNAL_PASSWORD"
}
```

**Response:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "expiresIn": 3600
}
```

**Uso do Token:**
Adicionar header `Authorization: Bearer {accessToken}` em todas as requisições que necessitam autenticação.

```dart
// Interceptor Dio
class AuthInterceptor extends Interceptor {
  @override
  void onRequest(RequestOptions options, RequestInterceptorHandler handler) async {
    final token = await authTokenService.getToken();
    options.headers['Authorization'] = 'Bearer $token';
    handler.next(options);
  }
}
```

---

### 7.3 Categorias

#### Listar Categorias com Vitrine Suppliers

```
GET /public/categorias/vitrine
```

**Descrição:** Retorna todas as categorias com suas imagens e lista de fornecedores Vitrine (para exibir na listagem de categorias).

**Response (200 OK):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "nome": "Fotografia",
    "slug": "fotografia",
    "descricao": "Profissionais para registrar seu grande dia.",
    "imageUrl": "https://storage.azure.../fotografia.jpg",
    "thumbnailUrl": "https://storage.azure.../fotografia-thumb.jpg",
    "icon": "camera",
    "totalSuppliers": 12,
    "vitrineSuppliers": [
      {
        "id": "a1b2c3d4-...",
        "nome": "Fotógrafo Perez",
        "slug": "fotografo-perez",
        "cidade": "Piracicaba",
        "rating": 4.9,
        "primaryImageUrl": "https://storage.azure.../perez-thumb.jpg"
      }
    ]
  }
]
```

**Fallback local (se API falhar):**
```dart
const categoriasFallback = [
  { 'slug': 'fotografia', 'nome': 'Fotografia', 'imageUrl': 'assets/categorias/fotografia.jpg' },
  { 'slug': 'buffet', 'nome': 'Buffet', 'imageUrl': 'assets/categorias/buffet.jpg' },
  { 'slug': 'decoracao', 'nome': 'Decoração', 'imageUrl': 'assets/categorias/decoracao.jpg' },
  { 'slug': 'musica', 'nome': 'Música', 'imageUrl': 'assets/categorias/musica.jpg' },
  { 'slug': 'espacos', 'nome': 'Espaços', 'imageUrl': 'assets/categorias/espacos.jpg' },
  { 'slug': 'vestidos', 'nome': 'Vestido de Noiva', 'imageUrl': 'assets/categorias/vestidos.jpg' },
];
```

---

### 7.4 Fornecedores

#### 7.4.1 Listar Fornecedores Ativos

```
GET /fornecedores/ativos
```

**Query Parameters:**

| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `page` | int | 1 | Número da página |
| `pageSize` | int | 12 | Itens por página (máx: 100) |
| `publicado` | bool | true | Filtrar publicados (produção: true) |
| `destaque` | bool | — | Filtrar apenas destaques |

**Exemplo:**
```
GET /fornecedores/ativos?page=1&pageSize=12&publicado=true
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "nomeFantasia": "Fotógrafo Perez",
      "slug": "fotografo-perez",
      "descricao": "Especialistas em fotografia de casamento em Piracicaba.",
      "cidade": "Piracicaba",
      "rating": 4.9,
      "destaque": true,
      "seloFornecedor": true,
      "ativo": true,
      "publicado": true,
      "planLevel": 1,
      "categoria": {
        "id": "cat-uuid",
        "nome": "Fotografia",
        "slug": "fotografia"
      },
      "primaryImage": {
        "id": "img-uuid",
        "url": "https://storage.azure.../perez-1.jpg",
        "filename": "perez-1.jpg",
        "contentType": "image/jpeg",
        "isPrimary": true
      }
    }
  ]
}
```

#### 7.4.2 Listar Fornecedores por Categoria

```
GET /fornecedores/ativos/categoria/{categoriaId}
```

**Path Parameters:**
- `categoriaId`: UUID da categoria

**Query Parameters:** (mesmos do endpoint acima)

**Exemplo:**
```
GET /fornecedores/ativos/categoria/550e8400-e29b-41d4-a716-446655440000?page=1&pageSize=12&publicado=true
```

#### 7.4.3 Listar Destaques (para a seção "Destaques da Semana")

```
GET /fornecedores/ativos?page=1&pageSize=24&destaque=true&publicado=true
```

**Nota:** A API retorna todos os ativos; o frontend filtra os que têm `destaque=true`.

#### 7.4.4 Obter Perfil Completo por Slug

```
GET /public/fornecedores/slug/{slug}
```

**Path Parameters:**
- `slug`: slug do fornecedor (lowercase, ex: `fotografo-perez`)

**Query Parameters:**
- `preview=true`: (opcional) para visualização antes de publicar

**Exemplo:**
```
GET /public/fornecedores/slug/fotografo-perez
```

**Response (200 OK):**
```json
{
  "id": "a1b2c3d4-...",
  "nomeFantasia": "Fotógrafo Perez",
  "slug": "fotografo-perez",
  "descricao": "Descrição completa do fornecedor...",
  "cidade": "Piracicaba",
  "endereco": "Rua Exemplo, 123 - Centro",
  "horarioFuncionamento": "Seg-Sex: 9h-18h",
  "telefone": "(19) 9XXXX-XXXX",
  "email": "perez@email.com",
  "website": "https://fotografooerez.com.br",
  "instagram": "fotografoperez",
  "facebook": "https://facebook.com/fotografoperez",
  "destaque": true,
  "seloFornecedor": true,
  "ativo": true,
  "publicado": true,
  "rating": 4.9,
  "visitas": 1250,
  "planLevel": 1,
  "isClaimed": true,
  "whatsAppUrl": "https://wa.me/5519912345678?text=...",
  "showContactForm": false,
  "leadLimit": 999999,
  "precoAPartirDe": 2500.00,
  "categoria": {
    "id": "cat-uuid",
    "nome": "Fotografia",
    "slug": "fotografia"
  },
  "imagens": [
    {
      "id": "img-1",
      "url": "https://storage.azure.../perez-1.jpg",
      "isPrimary": true,
      "orderIndex": 0
    },
    {
      "id": "img-2",
      "url": "https://storage.azure.../perez-2.jpg",
      "isPrimary": false,
      "orderIndex": 1
    }
  ],
  "testemunhos": [
    {
      "id": "t1",
      "nome": "Ana e Pedro",
      "descricao": "O Perez capturou cada momento de forma única...",
      "createdAt": "2025-11-15T10:00:00Z"
    }
  ],
  "adInjection": []
}
```

#### 7.4.5 Obter Perfil Completo por ID

```
GET /public/fornecedores/{id}
```

---

### 7.5 Busca

```
GET /search/fornecedores
```

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `q` | string | Termo de busca geral |
| `nome` | string | Busca por nome (compatibilidade) |
| `descricao` | string | Busca por descrição (compatibilidade) |
| `page` | int | Página (padrão: 1) |
| `pageSize` | int | Itens por página (padrão: 12) |
| `publicado` | bool | true em produção |

**Exemplo:**
```
GET /search/fornecedores?q=buffet&nome=buffet&descricao=buffet&page=1&pageSize=12&publicado=true
```

**Response:** Array direto ou `{ data: [...] }` (normalizar no cliente)

**Implementação de busca no Flutter:**
```dart
// Debounce 250ms antes de disparar a busca
// Exibir resultados em grid de 3 colunas com paginação
// Mínimo 1 caractere para iniciar busca
```

---

### 7.6 Leads / Contato

#### 7.6.1 Enviar Lead para Fornecedor

```
POST /public/fornecedores/{fornecedorId}/contact
Content-Type: application/json
```

**Body:**
```json
{
  "clienteName": "Maria Silva",
  "clientePhone": "(19) 99876-5432",
  "clienteEmail": "maria@email.com",
  "message": "Gostaria de um orçamento para casamento em dezembro/2026",
  "eventDate": "2026-12-15",
  "lgpdConsent": true
}
```

**Campos Obrigatórios:** `clienteName`, `clientePhone`, `lgpdConsent`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Mensagem enviada com sucesso! O fornecedor entrará em contato.",
  "leadId": 42
}
```

**Response (400 Bad Request):**
```json
{
  "message": "Este fornecedor atingiu o limite de leads gratuitos."
}
```

**Validações no cliente:**
- `clienteName`: mínimo 3 caracteres
- `clientePhone`: formato `(XX) XXXXX-XXXX` ou `(XX) XXXX-XXXX`
- `lgpdConsent`: deve ser `true`

---

### 7.7 Blog

#### 7.7.1 Listar Posts

```
GET /blog
```

**Query Parameters:**

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `page` | int | Página (padrão: 1) |
| `pageSize` | int | Posts por página (padrão: 10) |
| `category` | string | Filtrar por categoria (ex: "dicas") |

**Exemplo:**
```
GET /blog?page=1&pageSize=10
GET /blog?page=1&pageSize=10&category=dicas
```

**Response:**
```json
{
  "data": [
    {
      "id": "post-uuid",
      "title": "10 dicas para organizar seu casamento",
      "slug": "10-dicas-para-organizar-casamento",
      "excerpt": "Organizar um casamento pode ser desafiador...",
      "featuredImage": "https://storage.azure.../post-1.jpg",
      "author": "Equipe Guia Noivas",
      "publishedAt": "2026-01-15T10:00:00Z",
      "category": "dicas",
      "tags": ["dicas", "planejamento", "organização"],
      "views": 350
    }
  ]
}
```

#### 7.7.2 Obter Post por Slug

```
GET /blog/{slug}
```

**Response:**
```json
{
  "id": "post-uuid",
  "title": "10 dicas para organizar seu casamento",
  "slug": "10-dicas-para-organizar-casamento",
  "excerpt": "Organizar um casamento pode ser desafiador...",
  "content": "<p>Conteúdo HTML completo do artigo...</p>",
  "featuredImage": "https://storage.azure.../post-1.jpg",
  "author": "Equipe Guia Noivas",
  "publishedAt": "2026-01-15T10:00:00Z",
  "updatedAt": "2026-02-01T10:00:00Z",
  "category": "dicas",
  "tags": ["dicas", "planejamento"],
  "metaTitle": "10 dicas para organizar seu casamento | Guia Noivas",
  "metaDescription": "Dicas essenciais para...",
  "views": 350
}
```

#### 7.7.3 Posts Relacionados

```
GET /blog/posts/{postId}/related?limit=3
```

#### 7.7.4 Incrementar Visualizações

```
POST /blog/posts/{postId}/view
```

#### 7.7.5 Busca no Blog

```
GET /blog/posts/search?q={query}&page=1&pageSize=12
```

---

### 7.8 Guia de Preços (Lead Capture)

```
POST /guia-precos/leads
Content-Type: application/json
```

**Body:**
```json
{
  "nome": "Maria Silva",
  "email": "maria@email.com",
  "dataCasamento": "2026"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "downloadUrl": "https://storage.azure.../guia-precos-piracicaba-2026.pdf"
}
```

#### Download do PDF

```
GET /guia-precos/download
Authorization: Bearer {token}
```

**Response:** PDF file stream ou redirect para URL do arquivo.

---

### 7.9 Newsletter

```
POST /newsletter/subscribe
Content-Type: application/json
```

**Body:**
```json
{
  "email": "maria@email.com"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Inscrição realizada com sucesso!"
}
```

---

### 7.10 Privacidade / LGPD

#### 7.10.1 Buscar Fornecedor por Nome (autocomplete)

```
GET /vendors?filter={query}
```

**Response:**
```json
[
  {
    "id": "fornecedor-uuid",
    "nomeFantasia": "Fotógrafo Perez",
    "categoria": "Fotografia",
    "cidade": "Piracicaba"
  }
]
```

#### 7.10.2 Solicitar Remoção de Dados

```
POST /privacy/request-removal
Content-Type: application/json
```

**Body:**
```json
{
  "fornecedorId": "fornecedor-uuid",
  "requesterName": "João Silva",
  "requesterEmail": "joao@email.com",
  "reason": "FechouEmpresa",
  "confirmsOwnership": true,
  "description": "Empresa encerrada em dezembro/2025"
}
```

**Motivos válidos:** `FechouEmpresa` | `DadosIncorretos` | `PrivacidadeDados` | `Outro`

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Solicitação enviada com sucesso!",
  "requestId": "req-uuid",
  "protocolNumber": "GN-2026-001234",
  "status": "Pending",
  "estimatedAnalysisDate": "2026-05-01T00:00:00Z"
}
```

#### 7.10.3 Consultar Status da Solicitação

```
GET /privacy/request-removal/status?id={requestId}&email={email}
```

**Response:**
```json
{
  "requestId": "req-uuid",
  "protocolNumber": "GN-2026-001234",
  "status": "Pending",
  "fornecedorId": "fornecedor-uuid",
  "createdAt": "2026-04-14T10:00:00Z",
  "updatedAt": "2026-04-14T10:00:00Z",
  "reason": "FechouEmpresa",
  "estimatedAnalysisDate": "2026-05-01T00:00:00Z",
  "timeline": [
    {
      "date": "2026-04-14T10:00:00Z",
      "description": "Solicitação recebida",
      "details": "Sua solicitação foi registrada em nosso sistema."
    }
  ]
}
```

---

### 7.11 Claim de Perfil (Reivindicar Perfil)

Fornecedores podem reivindicar seu perfil para ter acesso ao painel.

#### 7.11.1 Obter Termo de Adesão

```
GET /contratos/termo-adesao
```

**Response:**
```json
{
  "id": "termo-uuid",
  "versao": "2.1",
  "hash": "sha256-hex-do-conteudo",
  "texto": "TERMO DE ADESÃO E CONDIÇÕES DE USO\n\n1. ...",
  "dataConsulta": "2026-04-14T10:00:00Z"
}
```

#### 7.11.2 Reivindicar Perfil

```
POST /fornecedores/{fornecedorId}/claim
Content-Type: application/json
```

**Body:**
```json
{
  "email": "fornecedor@email.com",
  "password": "senha123",
  "fullName": "João Silva",
  "phone": "(19) 99876-5432",
  "termoHash": "sha256-hash-calculado-no-cliente",
  "aceitaTermos": true,
  "dataAceite": "2026-04-14T10:30:00Z",
  "clientIp": "192.168.1.1"
}
```

**Response (200 OK):**
```json
{
  "message": "Perfil reivindicado com sucesso!",
  "userId": "user-uuid",
  "fornecedorId": "fornecedor-uuid",
  "email": "fornecedor@email.com",
  "accessToken": "eyJhbGci...",
  "refreshToken": "refresh-token",
  "termoVersao": "2.1",
  "claimedAt": "2026-04-14T10:30:00Z",
  "planLevel": 0,
  "leadLimit": 3
}
```

---

### 7.12 Contrato / Adesão Express

#### Carregar Termo

```
GET /contratos/termo-adesao?tipo=ADESAO
```

**Response:**
```json
{
  "termo": {
    "id": "termo-uuid",
    "versao": 3,
    "conteudo": "TERMO DE ADESÃO...",
    "dataVigencia": "2026-01-01T00:00:00Z",
    "tipoTermo": "ADESAO",
    "hash": "sha256-hex",
    "ativo": true
  },
  "protocolo": "PROT-2026-XXXXX",
  "timestamp": "2026-04-14T10:00:00Z"
}
```

#### Aceitar Termo (Adesão Express)

```
POST /fornecedores/aceitar-termo
Content-Type: application/json
```

**Body:**
```json
{
  "termoId": "termo-uuid",
  "versao": 3,
  "termoHash": "sha256-calculado-no-cliente",
  "dataAceite": "2026-04-14T10:30:00Z",
  "scrollCompleto": true,
  "tempoLeitura": 45,
  "userAgent": "GuiaNoivasApp/1.0 (iOS 17.0)"
}
```

#### Obter Comprovante de Aceite

```
GET /fornecedores/{fornecedorId}/comprovante-aceite/{protocolo}
```

---

## 8. Modelos de Dados

### 8.1 Categoria

```dart
class Categoria {
  final String id;
  final String nome;
  final String slug;
  final String? descricao;
  final String? imageUrl;
  final String? thumbnailUrl;
  final String? icon;
  final int? totalSuppliers;
  final List<VitrineSupplier> vitrineSuppliers;
}

class VitrineSupplier {
  final String id;
  final String nome;
  final String slug;
  final String? cidade;
  final double? rating;
  final String? primaryImageUrl;
}
```

### 8.2 FornecedorListDto (Listagem)

```dart
class FornecedorListDto {
  final String id;
  final String nome;
  final String slug;
  final String? descricao;
  final String? cidade;
  final double? rating;
  final bool destaque;
  final bool seloFornecedor;
  final bool ativo;
  final String? instagram;
  final CategoriaSimples? categoria;
  final MediaDto? primaryImage;
  final List<MediaDto> imagens;
  final PlanLevel planLevel;
}
```

### 8.3 Fornecedor (Perfil Completo)

```dart
class Fornecedor {
  final String id;
  final String nome;
  final String slug;
  final String? descricao;
  final String? cidade;
  final String? endereco;
  final String? horarioFuncionamento;
  final String? telefone;
  final String? email;
  final String? website;
  final String? instagram;
  final String? facebook;
  final bool destaque;
  final bool seloFornecedor;
  final bool ativo;
  final bool publicado;
  final double? rating;
  final int? visitas;
  final String? categoria; // nome da categoria
  final List<ImagemOrdenada> imagens;
  final List<Depoimento>? depoimentos;
  final PlanLevel planLevel;
  final bool isClaimed;
  final int? totalLeadsAllTime;
  final int? leadLimit;
  final String? whatsAppUrl;
  final bool showContactForm;
  final List<CompetitorAd>? adInjection;
  final double? precoAPartirDe;
}

class ImagemOrdenada {
  final String url;
  final int orderIndex;
}

class Depoimento {
  final String texto;
  final String casal;
}
```

### 8.4 PlanLevel

```dart
enum PlanLevel {
  zombie(-2),
  low(-1),
  free(0),
  vitrine(1);

  const PlanLevel(this.value);
  final int value;

  static PlanLevel fromInt(int v) =>
    PlanLevel.values.firstWhere((e) => e.value == v, orElse: () => PlanLevel.zombie);
}
```

### 8.5 LeadData

```dart
class LeadData {
  final String clienteName;   // obrigatório
  final String clientePhone;  // obrigatório
  final String? clienteEmail;
  final String? message;
  final String? eventDate;    // YYYY-MM-DD
  final bool lgpdConsent;     // obrigatório = true
}
```

### 8.6 BlogPost

```dart
class BlogPost {
  final String id;
  final String title;
  final String slug;
  final String excerpt;
  final String content; // HTML
  final String? featuredImage;
  final String? author;
  final DateTime publishedAt;
  final DateTime? updatedAt;
  final String? category;
  final List<String>? tags;
  final int? views;
}

class BlogPostListDto {
  final String id;
  final String title;
  final String slug;
  final String excerpt;
  final String? featuredImage;
  final String? author;
  final DateTime publishedAt;
  final String? category;
  final List<String>? tags;
  final int? views;
}
```

### 8.7 CompetitorAd

```dart
class CompetitorAd {
  final String id;
  final String nome;
  final String slug;
  final String? categoria;
  final String? imagemPrincipal;
  final String? descricao;
  final String? cidade;
}
```

---

## 9. Regras de Negócio

### 9.1 Resolução de URLs de Imagem

```dart
String resolveImageUrl(String? url) {
  if (url == null || url.isEmpty) return 'assets/fornecedores/placeholder.jpg';
  
  // URL absoluta (Azure Blob Storage)
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  
  // Asset local
  if (url.startsWith('assets/') || url.startsWith('/assets/')) return url;
  
  // URL relativa — montar URL completa
  final base = ApiConfig.baseUrl.replaceAll('/api/v1', '');
  final path = url.startsWith('/') ? url : '/$url';
  return '$base$path';
}
```

### 9.2 Formatação de Telefone (Máscara)

```dart
String formatPhone(String digits) {
  digits = digits.replaceAll(RegExp(r'\D'), '');
  if (digits.length > 11) digits = digits.substring(0, 11);
  
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return '(${digits.substring(0,2)}) ${digits.substring(2)}';
  if (digits.length <= 10) {
    return '(${digits.substring(0,2)}) ${digits.substring(2,6)}-${digits.substring(6)}';
  }
  return '(${digits.substring(0,2)}) ${digits.substring(2,7)}-${digits.substring(7,11)}';
}
```

### 9.3 Normalização de Slugs

```dart
String normalizeSlug(String text) {
  return text
    .toLowerCase()
    .replaceAll(RegExp(r'[àáâãä]'), 'a')
    .replaceAll(RegExp(r'[èéêë]'), 'e')
    .replaceAll(RegExp(r'[ìíîï]'), 'i')
    .replaceAll(RegExp(r'[òóôõö]'), 'o')
    .replaceAll(RegExp(r'[ùúûü]'), 'u')
    .replaceAll(RegExp(r'[ç]'), 'c')
    .replaceAll(RegExp(r'[^\w\s-]'), '')
    .trim()
    .replaceAll(RegExp(r'\s+'), '-');
}
```

### 9.4 Lógica de Exibição de Botões de Contato

```dart
bool showWhatsApp(Fornecedor f) => 
  f.planLevel == PlanLevel.vitrine && f.whatsAppUrl != null;

bool showLeadForm(Fornecedor f) =>
  f.showContactForm && 
  f.planLevel != PlanLevel.vitrine &&
  (f.totalLeadsAllTime ?? 0) < (f.leadLimit ?? 3);

bool showCompetitorAds(Fornecedor f) =>
  f.adInjection != null && f.adInjection!.isNotEmpty;
```

### 9.5 Exibição de Depoimentos

```dart
bool showDepoimentos(Fornecedor f) =>
  f.planLevel == PlanLevel.vitrine &&
  f.depoimentos != null &&
  f.depoimentos!.isNotEmpty;
```

### 9.6 Página de Painel do Fornecedor

O painel do fornecedor é uma aplicação web separada em `https://painel.guianoivas.com`. No app Flutter, o botão "PAINEL FORNECEDOR" deve abrir o painel em WebView ou browser externo.

---

## 10. Considerações Técnicas Flutter

### 10.1 Pacotes Recomendados

| Funcionalidade | Pacote Sugerido |
|----------------|-----------------|
| HTTP Client | `dio` |
| State Management | `riverpod` ou `bloc` |
| Imagens em cache | `cached_network_image` |
| Renderizar HTML | `flutter_widget_from_html` |
| Deep Links | `go_router` |
| Storage seguro | `flutter_secure_storage` |
| PDF viewer | `flutter_pdfview` ou `url_launcher` |
| WhatsApp | `url_launcher` |
| Instagram | `url_launcher` |
| Máscaras de input | `mask_text_input_formatter` |
| Shimmer/Skeleton | `shimmer` |
| Compartilhamento | `share_plus` |
| Ambiente | `flutter_dotenv` |
| Push Notifications | `firebase_messaging` (futuro) |

### 10.2 Tratamento de Imagens

- Usar `CachedNetworkImage` com placeholder local
- Implementar `errorWidget` com asset local de fallback
- Para galeria, usar `PhotoViewGallery` do pacote `photo_view`
- Aspect ratios: 4:3 para listagens, 16:9 para banners, 3:2 para galeria

### 10.3 Conectividade

```dart
// Checar conexão antes de chamadas de API
// Em caso de erro, exibir SnackBar com "Sem conexão com a internet"
// Cache de dados para funcionamento offline (categorias e últimos fornecedores vistos)
```

### 10.4 Tratamento de Erros de API

```dart
// HTTP 200: sucesso
// HTTP 400: erro de validação → exibir mensagem do campo 'message'
// HTTP 401: não autorizado → re-login automático e retry
// HTTP 404: não encontrado → exibir tela de "não encontrado"
// HTTP 429: rate limit → exibir mensagem e aguardar
// HTTP 500+: erro servidor → exibir "Algo deu errado, tente novamente"
```

### 10.5 Performance

- **Paginação:** Usar `ListView.builder` com paginação infinita (load more)
- **Lazy Loading de imagens:** Usar `loading: lazy` equivalente no Flutter
- **Cache de categorias:** Cache em memória durante a sessão
- **Debounce na busca:** 250ms antes de disparar a query

### 10.6 Acessibilidade

- Todos os botões com `semanticsLabel`
- Imagens com `Semantics(label: altText)`
- Focus visible com `FocusNode` customizado
- Contraste mínimo 4.5:1 para textos normais

### 10.7 Internacionalização

O app é integralmente em **Português (pt-BR)**:
- Formatação de números: `NumberFormat.currency(locale: 'pt_BR', symbol: 'R\$')`
- Formatação de datas: `DateFormat('dd/MM/yyyy', 'pt_BR')`

---

## 11. Funcionalidades Exclusivas do App

> As funcionalidades desta seção **não existem** no portal web. São diferenciais nativos do aplicativo Flutter, projetados para aumentar o engajamento, a retenção e o Daily Active Users (DAU) da plataforma.

---

### 11.1 Contagem Regressiva Visual (Hero Widget — Home)

#### Objetivo
Gerar engajamento imediato e potencial de compartilhamento orgânico. O componente funciona como a "capa" emocional do aplicativo para a noiva logada.

#### Posicionamento na UI
Widget de destaque exibido no **topo da tela Home** (acima das categorias), visível imediatamente após o login. Deve ocupar largura total com padding horizontal de `16px` e height mínimo de `160px`.

#### Dados Necessários (origem: perfil da usuária)
| Campo | Tipo Dart | Fonte |
|-------|-----------|-------|
| `nomeNoiva` | `String` | `UserProfile.brideFirstName` |
| `nomeNoivo` | `String` | `UserProfile.groomFirstName` |
| `dataCasamento` | `DateTime` | `UserProfile.weddingDate` |

#### Layout do Componente

```dart
// lib/features/home/widgets/wedding_countdown_widget.dart

// Estrutura visual (de cima para baixo):
// 1. Linha de subtítulo: "Faltam para o grande dia de"
// 2. Linha de nomes: "[NomeNoiva] & [NomeNoivo]" (fonte: Playfair Display, 20sp, rose-600)
// 3. Data formatada: "dd de MMMM de yyyy" (fonte: Inter, 13sp, slate-500)
// 4. Linha divisória fina (rose-100)
// 5. Contadores lado a lado: [Dias] [Horas] [Minutos]
//    - Cada contador: número em negrito (48sp, rose-600) + label abaixo (12sp, slate-400)
// 6. Botão "Compartilhar" (full-width, rose-600, ícone share)

Widget _buildCounterBox(String value, String label) {
  return Column(
    children: [
      Text(value, style: TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: AppColors.primary)),
      Text(label, style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
    ],
  );
}
```

#### Lógica de Cálculo da Contagem Regressiva

```dart
// lib/features/home/controllers/countdown_controller.dart

class CountdownController {
  /// Calcula a diferença entre agora e a data do casamento.
  /// Retorna null se a data já passou.
  CountdownData? calculate(DateTime weddingDate) {
    final now = DateTime.now();
    final difference = weddingDate.difference(now);

    if (difference.isNegative) return null; // casamento já ocorreu

    final days    = difference.inDays;
    final hours   = difference.inHours.remainder(24);
    final minutes = difference.inMinutes.remainder(60);

    return CountdownData(days: days, hours: hours, minutes: minutes);
  }
}

class CountdownData {
  final int days;
  final int hours;
  final int minutes;
  const CountdownData({required this.days, required this.hours, required this.minutes});
}
```

- O timer deve ser atualizado a cada **60 segundos** usando `Timer.periodic`.
- Se a data do casamento ainda **não estiver preenchida** no perfil, exibir um CTA: _"Complete seu perfil para ver a contagem regressiva"_ → botão que navega para `EditProfileScreen`.
- Se o casamento **já ocorreu**, exibir: _"Parabéns! Que a sua união seja repleta de amor."_

#### Funcionalidade de Compartilhamento

```dart
// Pacotes obrigatórios:
// screenshot: ^2.1.0
// share_plus: ^7.0.0

// lib/features/home/widgets/wedding_countdown_widget.dart

final _screenshotController = ScreenshotController();

// O widget inteiro de contagem regressiva deve ser envolvido em Screenshot():
Screenshot(
  controller: _screenshotController,
  child: Stack(
    children: [
      // ... conteúdo do countdown ...
      // Marca d'água obrigatória (canto inferior direito):
      Positioned(
        bottom: 8,
        right: 8,
        child: Opacity(
          opacity: 0.45,
          child: Image.asset('assets/logos/guianoivas_watermark.png', height: 24),
        ),
      ),
    ],
  ),
)

// Ao pressionar "Compartilhar":
Future<void> _onShareTap() async {
  final imageBytes = await _screenshotController.capture(
    pixelRatio: 3.0, // alta resolução para Stories (9:16)
  );
  if (imageBytes == null) return;

  final tempDir = await getTemporaryDirectory();
  final file = await File('${tempDir.path}/contagem_guianoivas.png').writeAsBytes(imageBytes);

  await SharePlus.instance.share(
    ShareParams(
      text: 'Faltam ${countdown.days} dias para o meu casamento! 💍\n\nBaixe o app Guia Noivas Piracicaba',
      files: [XFile(file.path)],
    ),
  );
}
```

**Atenção:** A imagem capturada deve ter proporção adequada para Instagram Stories (9:16 ou quadrado 1:1). Garantir que o componente tenha altura suficiente antes do `capture()`. O texto de compartilhamento deve **sempre** incluir menção ao app.

#### Assets Necessários
- `assets/logos/guianoivas_watermark.png` — logotipo com fundo transparente, versão monocromática branca (para sobrepor em fundos escuros e claros). Dimensões mínimas: `200×60px`.

#### Dependências `pubspec.yaml`
```yaml
dependencies:
  screenshot: ^2.1.0
  share_plus: ^7.2.0
  path_provider: ^2.1.0  # para getTemporaryDirectory()
```

---

### 11.2 Gerador de Briefing Automático (Integração WhatsApp)

#### Objetivo
Qualificar os leads gerados para os fornecedores com contexto completo da noiva, aumentando a taxa de conversão e mantendo a assinatura de marca do Guia Noivas em cada contato.

#### Posicionamento na UI
Botão **"Pedir Orçamento via WhatsApp"** exibido no rodapé da tela de **Perfil do Fornecedor** (`FornecedorDetailScreen`), ao lado do botão de WhatsApp já existente (ou substituindo-o quando o usuário estiver logado e com perfil preenchido).

#### Dados Necessários (origem: perfil da usuária)
| Campo | Tipo Dart | Fonte |
|-------|-----------|-------|
| `dataCasamento` | `DateTime` | `UserProfile.weddingDate` |
| `numConvidados` | `int` | `UserProfile.estimatedGuests` |
| `estiloCasamento` | `String` | `UserProfile.weddingStyle` (ex: "Romântico", "Rústico", "Moderno") |
| `whatsappFornecedor` | `String` | `Fornecedor.whatsapp` |

#### Lógica de Construção do Payload

```dart
// lib/features/fornecedores/services/briefing_service.dart

class BriefingService {
  /// Gera a string pré-formatada do briefing.
  String generateBriefing({
    required DateTime weddingDate,
    required int guests,
    required String style,
  }) {
    final formattedDate = DateFormat("dd/MM/yyyy", 'pt_BR').format(weddingDate);
    return 'Olá! Vi vocês no App do Guia Noivas Piracicaba. '
        'Meu casamento será dia $formattedDate, '
        'para $guests convidados no estilo $style. '
        'Gostaria de solicitar um orçamento.';
  }

  /// Abre o WhatsApp com o número do fornecedor e o briefing pré-preenchido.
  Future<void> openWhatsAppBriefing({
    required String phone, // formato: apenas dígitos, ex: "5519999999999"
    required String message,
  }) async {
    final encoded = Uri.encodeComponent(message);
    final url = Uri.parse('https://wa.me/$phone?text=$encoded');

    if (await canLaunchUrl(url)) {
      await launchUrl(url, mode: LaunchMode.externalApplication);
    } else {
      throw Exception('WhatsApp não disponível neste dispositivo.');
    }
  }
}
```

#### Comportamento do Botão na UI

```dart
// lib/features/fornecedores/widgets/briefing_whatsapp_button.dart

// Regras de exibição:
// - Se usuário NÃO estiver logado: exibir botão padrão de WhatsApp (sem briefing)
// - Se usuário logado MAS perfil incompleto (falta data, convidados ou estilo):
//     → Botão habilitado com tooltip/snackbar: "Complete seu perfil para enviar briefing automático"
//     → Ao tocar: navegar para EditProfileScreen
// - Se usuário logado E perfil completo:
//     → Botão "Pedir Orçamento via WhatsApp" com ícone WhatsApp (verde)
//     → Ao tocar: chamar BriefingService.openWhatsAppBriefing()

ElevatedButton.icon(
  onPressed: _onBriefingTap,
  icon: Icon(FontAwesomeIcons.whatsapp, color: Colors.white),
  label: Text('Pedir Orçamento via WhatsApp'),
  style: ElevatedButton.styleFrom(
    backgroundColor: const Color(0xFF25D366), // WhatsApp green
    foregroundColor: Colors.white,
    minimumSize: const Size.fromHeight(48),
  ),
)
```

#### Dependências `pubspec.yaml`
```yaml
dependencies:
  url_launcher: ^6.2.0
  intl: ^0.18.0  # para DateFormat
```

#### Permissões Android (`android/app/src/main/AndroidManifest.xml`)
```xml
<queries>
  <intent>
    <action android:name="android.intent.action.VIEW" />
    <data android:scheme="https" />
  </intent>
</queries>
```

---

### 11.3 Gestor de Orçamento (Budget Tracker)

#### Objetivo
Reter a usuária na plataforma por meio do controle financeiro do casamento e gerar cross-sell natural de fornecedores ao identificar categorias sem orçamento alocado.

#### Rota
`/meu-casamento/orcamento` → `BudgetScreen`

#### Modelo de Dados

```dart
// lib/features/budget/models/budget_model.dart

/// Categorias padrão do orçamento de casamento
enum BudgetCategory {
  buffet,
  vestido,
  fotografia,
  decoracao,
  musica,
  local,
  convites,
  lembrancas,
  cerimonial,
  outros,
}

extension BudgetCategoryLabel on BudgetCategory {
  String get label {
    const labels = {
      BudgetCategory.buffet:       'Buffet / Gastronomia',
      BudgetCategory.vestido:      'Vestido & Acessórios',
      BudgetCategory.fotografia:   'Foto & Vídeo',
      BudgetCategory.decoracao:    'Decoração & Flores',
      BudgetCategory.musica:       'Música & Entretenimento',
      BudgetCategory.local:        'Espaço / Local',
      BudgetCategory.convites:     'Convites & Papelaria',
      BudgetCategory.lembrancas:   'Lembranças & Mimos',
      BudgetCategory.cerimonial:   'Cerimonialista',
      BudgetCategory.outros:       'Outros',
    };
    return labels[this]!;
  }

  /// Slug de categoria para deep link interno ao marketplace
  String get marketplaceSlug {
    const slugs = {
      BudgetCategory.buffet:     'buffet',
      BudgetCategory.vestido:    'vestidos',
      BudgetCategory.fotografia: 'fotografia',
      BudgetCategory.decoracao:  'decoracao',
      BudgetCategory.musica:     'musica',
      BudgetCategory.local:      'espacos-para-eventos',
      BudgetCategory.convites:   'convites',
      BudgetCategory.lembrancas: 'lembrancas',
      BudgetCategory.cerimonial: 'cerimonial',
      BudgetCategory.outros:     null,
    };
    return slugs[this] ?? '';
  }
}

/// Distribuição percentual padrão sugerida pelo sistema
const Map<BudgetCategory, double> kDefaultBudgetPercentages = {
  BudgetCategory.buffet:      0.35,  // 35%
  BudgetCategory.vestido:     0.10,  // 10%
  BudgetCategory.fotografia:  0.10,  // 10%
  BudgetCategory.decoracao:   0.15,  // 15%
  BudgetCategory.musica:      0.08,  // 8%
  BudgetCategory.local:       0.10,  // 10%
  BudgetCategory.convites:    0.02,  // 2%
  BudgetCategory.lembrancas:  0.02,  // 2%
  BudgetCategory.cerimonial:  0.05,  // 5%
  BudgetCategory.outros:      0.03,  // 3%
};

class BudgetItem {
  final String id;          // UUID
  final BudgetCategory category;
  double allocatedAmount;   // valor orçado para a categoria
  double spentAmount;       // valor já pago/contratado
  String? supplierName;     // nome do fornecedor contratado (opcional)
  String? notes;            // observações livres
  BudgetStatus status;

  BudgetItem({
    required this.id,
    required this.category,
    required this.allocatedAmount,
    this.spentAmount = 0,
    this.supplierName,
    this.notes,
    this.status = BudgetStatus.pending,
  });
}

enum BudgetStatus { pending, inProgress, contracted, paid }

class BudgetSummary {
  final double totalBudget;         // valor total disponível (inserido pela usuária)
  final List<BudgetItem> items;

  double get totalAllocated => items.fold(0, (s, i) => s + i.allocatedAmount);
  double get totalSpent     => items.fold(0, (s, i) => s + i.spentAmount);
  double get remaining      => totalBudget - totalSpent;
}
```

#### Tela Principal — `BudgetScreen`

```
+--------------------------------------------------+
|  ← Gestor de Orçamento               [Editar]   |
+--------------------------------------------------+
|  Orçamento Total: R$ [___________]  [✓]          |
|                                                  |
|  Gasto: R$ 12.500   Disponível: R$ 37.500        |
|  ████████░░░░░░░░░░░░░░ 25%                       |
+--------------------------------------------------+
|  CATEGORIAS                                      |
|                                                  |
|  🍽 Buffet              R$ 17.500 / R$ 17.500    |
|  [████████████████████] CONTRATADO               |
|  "Buffet Sabor & Arte" · R$ 17.500               |
|                                                  |
|  📸 Foto & Vídeo        R$ 5.000 / R$ 5.000      |
|  [████████████░░░░░░░░░] PENDENTE                |
|  [🔍 Buscar fornecedores nesta categoria →]      |
|                                                  |
|  ... (demais categorias)                         |
+--------------------------------------------------+
|           [+ Adicionar Despesa]                  |
+--------------------------------------------------+
```

#### Lógica da Barra de Progresso por Categoria

```dart
// lib/features/budget/widgets/budget_category_row.dart

double get progressValue =>
    item.allocatedAmount > 0
        ? (item.spentAmount / item.allocatedAmount).clamp(0.0, 1.0)
        : 0.0;

Color get progressColor {
  if (progressValue >= 1.0) return Colors.green;
  if (progressValue >= 0.5) return AppColors.primary;
  return AppColors.vitrine; // amarelo = atenção
}
```

#### CTA de Deep Link Interno (categoria pendente)

```dart
// Exibir apenas quando: status == BudgetStatus.pending E allocatedAmount > 0
// E a categoria possui um marketplaceSlug válido (não vazio)

if (item.status == BudgetStatus.pending && item.category.marketplaceSlug.isNotEmpty)
  InkWell(
    onTap: () => context.go('/categorias/${item.category.marketplaceSlug}'),
    child: Container(
      padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: AppColors.primary50,
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: AppColors.primary100),
      ),
      child: Row(
        children: [
          Icon(Icons.search, size: 16, color: AppColors.primary),
          const SizedBox(width: 8),
          Text(
            'Buscar fornecedores nesta categoria →',
            style: TextStyle(color: AppColors.primary, fontSize: 13),
          ),
        ],
      ),
    ),
  ),
```

#### CRUD de Despesas — Modal de Edição

Ao tocar em uma categoria ou no botão "+ Adicionar Despesa", abrir `BottomSheet` ou `AlertDialog` com os campos:
- **Valor Alocado** (double, obrigatório) — com formatação de moeda R$
- **Valor Gasto** (double, opcional)
- **Nome do Fornecedor** (String, opcional)
- **Status** (dropdown: Pendente / Em Negociação / Contratado / Pago)
- **Observações** (String, opcional, multiline)

#### Persistência
- Dados persistidos **localmente** via `shared_preferences` ou `sqflite` (chave: `budget_summary_<userId>`).
- Sincronizar com o back-end via `PATCH /api/v1/users/{id}/budget` sempre que houver alteração (com debounce de 2 segundos).

#### Dependências `pubspec.yaml`
```yaml
dependencies:
  sqflite: ^2.3.0        # ou shared_preferences para MVP simples
  intl: ^0.18.0
```

---

### 11.4 Cronograma Regressivo Dinâmico (To-Do List)

#### Objetivo
Combater a ansiedade do planejamento, educar a jornada de compra da noiva e criar dependência orgânica do app como organizador central.

#### Rota
`/meu-casamento/cronograma` → `WeddingChecklistScreen`

#### Modelo de Dados

```dart
// lib/features/checklist/models/checklist_model.dart

class ChecklistTask {
  final String id;
  final String title;
  final String? description;         // detalhe expandível (opcional)
  final int monthsBeforeWedding;     // ex: 12, 9, 6, 3, 1, 0
  final String? deepLinkRoute;       // rota interna (ex: '/categorias/vestidos')
  final String? deepLinkLabel;       // texto do atalho (ex: 'Ver Estilistas')
  bool isCompleted;
  DateTime? completedAt;

  ChecklistTask({
    required this.id,
    required this.title,
    this.description,
    required this.monthsBeforeWedding,
    this.deepLinkRoute,
    this.deepLinkLabel,
    this.isCompleted = false,
    this.completedAt,
  });
}
```

#### Lista Padrão de Tarefas (seed data)

```dart
// lib/features/checklist/data/default_tasks.dart

const List<ChecklistTask> kDefaultChecklistTasks = [
  // === 12 MESES ANTES ===
  ChecklistTask(id: 'task_001', title: 'Definir orçamento total do casamento',    monthsBeforeWedding: 12),
  ChecklistTask(id: 'task_002', title: 'Escolher e reservar o espaço/local',       monthsBeforeWedding: 12,
      deepLinkRoute: '/categorias/espacos-para-eventos', deepLinkLabel: 'Ver Espaços'),
  ChecklistTask(id: 'task_003', title: 'Contratar cerimonialista',                 monthsBeforeWedding: 12,
      deepLinkRoute: '/categorias/cerimonial',           deepLinkLabel: 'Ver Cerimonialistas'),
  ChecklistTask(id: 'task_004', title: 'Definir lista inicial de convidados',      monthsBeforeWedding: 12,
      deepLinkRoute: '/meu-casamento/convidados',        deepLinkLabel: 'Gerenciar Convidados'),

  // === 9 MESES ANTES ===
  ChecklistTask(id: 'task_005', title: 'Escolher e contratar fotógrafo/videomaker', monthsBeforeWedding: 9,
      deepLinkRoute: '/categorias/fotografia',           deepLinkLabel: 'Ver Fotógrafos'),
  ChecklistTask(id: 'task_006', title: 'Escolher o vestido de noiva',               monthsBeforeWedding: 9,
      deepLinkRoute: '/categorias/vestidos',             deepLinkLabel: 'Ver Estilistas / Lojas'),
  ChecklistTask(id: 'task_007', title: 'Escolher decoração e floricultura',          monthsBeforeWedding: 9,
      deepLinkRoute: '/categorias/decoracao',            deepLinkLabel: 'Ver Decoradores'),
  ChecklistTask(id: 'task_008', title: 'Escolher e contratar buffet',               monthsBeforeWedding: 9,
      deepLinkRoute: '/categorias/buffet',               deepLinkLabel: 'Ver Buffets'),

  // === 6 MESES ANTES ===
  ChecklistTask(id: 'task_009', title: 'Confirmar música / banda / DJ',             monthsBeforeWedding: 6,
      deepLinkRoute: '/categorias/musica',               deepLinkLabel: 'Ver Músicos e DJs'),
  ChecklistTask(id: 'task_010', title: 'Escolher e encomendar convites',             monthsBeforeWedding: 6,
      deepLinkRoute: '/categorias/convites',             deepLinkLabel: 'Ver Papelarias'),
  ChecklistTask(id: 'task_011', title: 'Agendar prova do vestido (1ª prova)',        monthsBeforeWedding: 6),
  ChecklistTask(id: 'task_012', title: 'Definir lista de presentes (mesa de noivos)', monthsBeforeWedding: 6),

  // === 3 MESES ANTES ===
  ChecklistTask(id: 'task_013', title: 'Enviar convites',                            monthsBeforeWedding: 3),
  ChecklistTask(id: 'task_014', title: 'Confirmar cardápio com o buffet',            monthsBeforeWedding: 3),
  ChecklistTask(id: 'task_015', title: 'Agendar prova do vestido (2ª prova)',        monthsBeforeWedding: 3),
  ChecklistTask(id: 'task_016', title: 'Contratar make e cabelo',                   monthsBeforeWedding: 3),
  ChecklistTask(id: 'task_017', title: 'Planejar lua de mel e reservar passagens',  monthsBeforeWedding: 3),

  // === 1 MÊS ANTES ===
  ChecklistTask(id: 'task_018', title: 'Confirmar presença dos convidados',         monthsBeforeWedding: 1,
      deepLinkRoute: '/meu-casamento/convidados',        deepLinkLabel: 'Ver Lista de Convidados'),
  ChecklistTask(id: 'task_019', title: 'Fazer degustação final com o buffet',       monthsBeforeWedding: 1),
  ChecklistTask(id: 'task_020', title: 'Confirmar horários com todos os fornecedores', monthsBeforeWedding: 1),
  ChecklistTask(id: 'task_021', title: 'Retirar vestido e acessórios',              monthsBeforeWedding: 1),

  // === NA SEMANA DO CASAMENTO (0 meses) ===
  ChecklistTask(id: 'task_022', title: 'Briefing final com cerimonialista',         monthsBeforeWedding: 0),
  ChecklistTask(id: 'task_023', title: 'Preparar kits para banheiro e bem-casados', monthsBeforeWedding: 0),
  ChecklistTask(id: 'task_024', title: 'Relaxar e curtir o momento! 💍',            monthsBeforeWedding: 0),
];
```

#### Renderização Dinâmica por Marco Temporal

```dart
// lib/features/checklist/screens/wedding_checklist_screen.dart

/// Agrupa tarefas pelo offset em meses e calcula a data de alvo.
Map<int, List<ChecklistTask>> groupByMonths(List<ChecklistTask> tasks) {
  final grouped = <int, List<ChecklistTask>>{};
  for (final task in tasks) {
    grouped.putIfAbsent(task.monthsBeforeWedding, () => []).add(task);
  }
  return Map.fromEntries(
    grouped.entries.toList()..sort((a, b) => b.key.compareTo(a.key)), // decrescente
  );
}

/// Gera o título do grupo de acordo com a data do casamento e o offset.
String groupTitle(int monthsOffset, DateTime weddingDate) {
  if (monthsOffset == 0) return 'Na Semana do Casamento 🎊';
  final targetDate = DateTime(
    weddingDate.year,
    weddingDate.month - monthsOffset,
    weddingDate.day,
  );
  final now = DateTime.now();
  final remaining = weddingDate.difference(now).inDays ~/ 30;

  if (monthsOffset > remaining) return 'Faltam $monthsOffset meses (já passou — revise!)';
  return 'Faltam $monthsOffset ${monthsOffset == 1 ? "mês" : "meses"} '
      '(até ${DateFormat("MMM/yyyy", "pt_BR").format(targetDate)})';
}
```

#### Deep Link Interno nas Tarefas

```dart
// Cada tarefa com deepLinkRoute deve exibir um botão/chip ao final:
if (task.deepLinkRoute != null)
  ActionChip(
    label: Text(task.deepLinkLabel ?? 'Ver no app'),
    avatar: Icon(Icons.arrow_forward, size: 14),
    onPressed: () => context.go(task.deepLinkRoute!),
    backgroundColor: AppColors.primary50,
    labelStyle: TextStyle(color: AppColors.primary, fontSize: 12),
  ),
```

#### Persistência e Sincronização
- Estado dos checkboxes (`isCompleted`, `completedAt`) persistido localmente via `sqflite`.
- Sincronizar com `PATCH /api/v1/users/{id}/checklist` ao marcar/desmarcar cada tarefa.
- A lista padrão é gerada no **front-end** a partir do `kDefaultChecklistTasks` e não precisa de endpoint específico para seed.

#### Dependências `pubspec.yaml`
```yaml
dependencies:
  sqflite: ^2.3.0
  intl: ^0.18.0
```

---

### 11.5 Pasta de Cotações ("Meus Favoritos")

#### Objetivo
Facilitar a comparação de preços entre fornecedores sem sair do ecossistema, aumentando o tempo de sessão no app.

#### Rota
`/meus-favoritos` → `FavoritesScreen`

#### Modelo de Dados

```dart
// lib/features/favorites/models/favorite_model.dart

class FavoriteSupplier {
  final String supplierId;      // ID do fornecedor na API
  final String supplierName;    // nome (cacheado localmente)
  final String? supplierCategory; // ex: 'Fotografia'
  final String? supplierLogoUrl;  // URL do logo (cacheado)
  String? userNote;             // nota livre da usuária
  DateTime savedAt;

  FavoriteSupplier({
    required this.supplierId,
    required this.supplierName,
    this.supplierCategory,
    this.supplierLogoUrl,
    this.userNote,
    required this.savedAt,
  });
}
```

#### Comportamento do Ícone de Favoritar

```dart
// lib/features/fornecedores/widgets/favorite_button.dart

// Exibido em:
// 1. Cards de fornecedor na listagem (canto superior direito do card)
// 2. Tela de perfil do fornecedor (no AppBar ou abaixo do cabeçalho)

// Estado visual:
// - Não favoritado: ícone coração vazio (Icons.favorite_border), cor cinza
// - Favoritado: ícone coração preenchido (Icons.favorite), cor rose-600

IconButton(
  icon: Icon(
    isFavorited ? Icons.favorite : Icons.favorite_border,
    color: isFavorited ? AppColors.primary : AppColors.textSecondary,
  ),
  onPressed: () => _toggleFavorite(fornecedor),
  tooltip: isFavorited ? 'Remover dos favoritos' : 'Salvar nos favoritos',
)

// Ao favoritar pela primeira vez: mostrar SnackBar:
// "Salvo em Meus Favoritos! Adicione uma nota de cotação."
// com ação: "Adicionar Nota" → abre modal de nota
```

#### Modal de Nota de Cotação

```dart
// lib/features/favorites/widgets/favorite_note_dialog.dart

// Acionado ao:
// 1. Tocar em "Adicionar Nota" no SnackBar pós-favoritamento
// 2. Tocar no ícone de edição ao lado do favorito na FavoritesScreen

showModalBottomSheet(
  context: context,
  isScrollControlled: true,
  builder: (_) => Padding(
    padding: EdgeInsets.only(bottom: MediaQuery.of(context).viewInsets.bottom),
    child: Column(
      mainAxisSize: MainAxisSize.min,
      children: [
        Text('Nota de Cotação', style: AppTextStyles.subtitle),
        TextField(
          maxLines: 4,
          decoration: InputDecoration(
            hintText: 'Ex: Cobrou R\$ 5.000 e parcela em 10x. Retornar em 15/05.',
          ),
          onChanged: (v) => noteText = v,
        ),
        ElevatedButton(
          onPressed: _saveNote,
          child: Text('Salvar'),
        ),
      ],
    ),
  ),
);
```

#### Tela de Favoritos — `FavoritesScreen`

```
+--------------------------------------------------+
|  ← Meus Favoritos (12)                          |
+--------------------------------------------------+
|  [🔍 Buscar nos favoritos]                      |
|  Filtrar por: [Todos ▼]  [Categoria ▼]          |
+--------------------------------------------------+
|  📸 Estúdio Luz & Arte      Fotografia           |
|  ⭐ Vitrine                                      |
|  "Cobrou R$ 5.000 e parcela em 10x"  [✏]        |
|  Salvo em 10/04/2026                            |
|  [Ver Perfil →]                                 |
+--------------------------------------------------+
|  🎂 Buffet Sabor & Arte     Buffet / Gastronomia |
|  (sem nota)                              [+ Nota]|
|  [Ver Perfil →]           [🗑 Remover]           |
+--------------------------------------------------+
```

#### Persistência
- **MVP:** Persistência local via `sqflite` (tabela `favorites`).
- **Produção:** Sincronizar com endpoint `GET/POST/DELETE /api/v1/users/{id}/favorites`.
- Ao restaurar app (reinstalação), recuperar favoritos do servidor se o usuário estiver logado.

#### Dependências `pubspec.yaml`
```yaml
dependencies:
  sqflite: ^2.3.0
```

---

### 11.6 Gerenciador de Lista de Convidados (CRUD)

#### Objetivo
Garantir Daily Active Users (DAU), pois o gerenciamento de convidados é a ferramenta mais acessada diariamente pelas noivas durante o planejamento.

#### Rota
`/meu-casamento/convidados` → `GuestListScreen`

#### Modelo de Dados

```dart
// lib/features/guests/models/guest_model.dart

enum GuestGroup { familia, trabalho, amigos, outros }

extension GuestGroupLabel on GuestGroup {
  String get label {
    const labels = {
      GuestGroup.familia:  'Família',
      GuestGroup.trabalho: 'Trabalho',
      GuestGroup.amigos:   'Amigos',
      GuestGroup.outros:   'Outros',
    };
    return labels[this]!;
  }
}

enum GuestStatus { pending, confirmed, declined }

extension GuestStatusLabel on GuestStatus {
  String get label {
    const labels = {
      GuestStatus.pending:   'Pendente',
      GuestStatus.confirmed: 'Confirmado',
      GuestStatus.declined:  'Recusado',
    };
    return labels[this]!;
  }

  Color get color {
    const colors = {
      GuestStatus.pending:   Color(0xFFF59E0B), // amber
      GuestStatus.confirmed: Color(0xFF10B981), // green
      GuestStatus.declined:  Color(0xFFEF4444), // red
    };
    return colors[this]!;
  }
}

class Guest {
  final String id;           // UUID gerado localmente ou retornado pela API
  String name;               // nome completo
  GuestGroup group;          // grupo
  GuestStatus status;        // status da confirmação
  String? phone;             // telefone (opcional)
  String? notes;             // observações (ex: "restrição alimentar: sem glúten")
  int plusOnes;              // acompanhantes (0 = apenas o convidado)
  DateTime createdAt;
  DateTime updatedAt;

  Guest({
    required this.id,
    required this.name,
    required this.group,
    this.status = GuestStatus.pending,
    this.phone,
    this.notes,
    this.plusOnes = 0,
    required this.createdAt,
    required this.updatedAt,
  });

  // Total de pessoas que este registro representa:
  int get totalPersons => 1 + plusOnes;
}
```

#### Tela Principal — `GuestListScreen`

```
+--------------------------------------------------+
|  ← Lista de Convidados        [+ Adicionar]     |
+--------------------------------------------------+
|  RESUMO                                         |
|  Total: 150  ✅ Confirmados: 98  ⏳ Pendentes: 42  ❌ Recusados: 10  |
+--------------------------------------------------+
|  [🔍 Buscar por nome...]                        |
|  Filtrar: [Todos ▼]  [Grupo ▼]  [Status ▼]     |
+--------------------------------------------------+
|  FAMÍLIA (45)                                   |
|  ┌─────────────────────────────────────────┐   |
|  │ Ana Costa             [✅ Confirmado]   │   |
|  │ +1 acompanhante                         │   |
|  └─────────────────────────────────────────┘   |
|  ┌─────────────────────────────────────────┐   |
|  │ João Lima             [⏳ Pendente]     │   |
|  └─────────────────────────────────────────┘   |
+--------------------------------------------------+
```

#### Dashboard de Resumo (sempre visível no topo)

```dart
// lib/features/guests/widgets/guest_summary_card.dart

class GuestSummaryCard extends StatelessWidget {
  final List<Guest> guests;

  int get total      => guests.fold(0, (s, g) => s + g.totalPersons);
  int get confirmed  => guests.where((g) => g.status == GuestStatus.confirmed)
                              .fold(0, (s, g) => s + g.totalPersons);
  int get pending    => guests.where((g) => g.status == GuestStatus.pending)
                              .fold(0, (s, g) => s + g.totalPersons);
  int get declined   => guests.where((g) => g.status == GuestStatus.declined)
                              .fold(0, (s, g) => s + g.totalPersons);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: [
        _SummaryTile(label: 'Total',      value: total,     color: AppColors.primary),
        _SummaryTile(label: 'Confirmados', value: confirmed, color: Colors.green),
        _SummaryTile(label: 'Pendentes',  value: pending,   color: AppColors.vitrine),
        _SummaryTile(label: 'Recusados',  value: declined,  color: Colors.red),
      ],
    );
  }
}
```

#### Adição Rápida de Convidado

```dart
// lib/features/guests/widgets/add_guest_sheet.dart

// Campos do formulário:
// 1. Nome completo* (TextField, autofocus)
// 2. Grupo* (SegmentedButton: Família / Amigos / Trabalho / Outros)
// 3. Status* (SegmentedButton: Pendente / Confirmado / Recusado)
// 4. Acompanhantes (Stepper numérico: 0–10, default 0)
// 5. Telefone (TextField, opcional, teclado número)
// 6. Observações (TextField, opcional, multiline)

// Atalho: ao submeter o formulário (botão "Salvar" ou Enter),
// limpar o campo de nome e manter foco nele para adição em série rápida.
```

#### Filtros e Busca

```dart
// lib/features/guests/controllers/guest_list_controller.dart

List<Guest> get filteredGuests {
  return _allGuests.where((guest) {
    final matchesSearch = _searchQuery.isEmpty ||
        guest.name.toLowerCase().contains(_searchQuery.toLowerCase());
    final matchesGroup  = _selectedGroup == null  || guest.group  == _selectedGroup;
    final matchesStatus = _selectedStatus == null || guest.status == _selectedStatus;
    return matchesSearch && matchesGroup && matchesStatus;
  }).toList()
    ..sort((a, b) => a.name.compareTo(b.name)); // ordena por nome
}
```

#### Integração com API (.NET)

> **Atenção:** A sincronização via API é **obrigatória** para esta funcionalidade. Os dados de convidados **não podem ser perdidos** em caso de reinstalação do app.

```
GET    /api/v1/users/{userId}/guests           → lista todos os convidados
POST   /api/v1/users/{userId}/guests           → cria novo convidado
PUT    /api/v1/users/{userId}/guests/{id}      → atualiza convidado
DELETE /api/v1/users/{userId}/guests/{id}      → remove convidado
PATCH  /api/v1/users/{userId}/guests/{id}/status → atualiza apenas o status
```

**Estratégia de sincronização:**
1. Na abertura da tela, fazer `GET` para carregar lista atualizada do servidor.
2. Cada operação de CRUD dispara imediatamente a chamada de API correspondente.
3. Em caso de falha de rede: persistir localmente em fila (`sqflite`) e sincronizar quando a conexão retornar (usando `connectivity_plus` para detectar reconexão).
4. Implementar **otimistic UI**: atualizar a UI imediatamente e reverter em caso de erro de API.

#### Edição e Exclusão por Swipe

```dart
// lib/features/guests/widgets/guest_list_tile.dart

Dismissible(
  key: Key(guest.id),
  background: Container(
    color: Colors.green,
    alignment: Alignment.centerLeft,
    child: Padding(padding: EdgeInsets.only(left: 16), child: Icon(Icons.check, color: Colors.white)),
  ),
  secondaryBackground: Container(
    color: Colors.red,
    alignment: Alignment.centerRight,
    child: Padding(padding: EdgeInsets.only(right: 16), child: Icon(Icons.delete, color: Colors.white)),
  ),
  confirmDismiss: (direction) async {
    if (direction == DismissDirection.startToEnd) {
      // Swipe direita → marcar como Confirmado
      await _updateStatus(guest, GuestStatus.confirmed);
      return false; // não remove da lista
    } else {
      // Swipe esquerda → confirmação de exclusão
      return await _showDeleteConfirmDialog(context);
    }
  },
  child: GuestListTile(guest: guest, onTap: () => _openEditSheet(guest)),
)
```

#### Dependências `pubspec.yaml`
```yaml
dependencies:
  sqflite: ^2.3.0
  connectivity_plus: ^5.0.0
  uuid: ^4.0.0  # para geração de IDs locais
```

---

### 11.7 Notas de Arquitetura para as Funcionalidades Exclusivas

#### Gerenciamento de Estado
Livre escolha entre `Provider`, `Bloc` ou `Riverpod`. **Recomendação:** utilizar `Riverpod` (versão 2.x com code generation) para fluidez nas listas dinâmicas e reatividade entre funcionalidades.

Cada funcionalidade exclusiva deve ter seu próprio **provider/notifier isolado:**

| Funcionalidade | Provider/Notifier Sugerido |
|----------------|---------------------------|
| Contagem Regressiva | `weddingCountdownProvider` (AsyncNotifier) |
| Briefing WhatsApp | `briefingServiceProvider` (Provider simples) |
| Gestor de Orçamento | `budgetNotifierProvider` (StateNotifier/AsyncNotifier) |
| Cronograma | `checklistNotifierProvider` (StateNotifier) |
| Favoritos | `favoritesNotifierProvider` (StateNotifier) |
| Lista de Convidados | `guestListNotifierProvider` (AsyncNotifier) |

#### Estrutura de Pastas Recomendada

```
lib/
└── features/
    ├── countdown/           # 11.1 Contagem Regressiva
    │   ├── controllers/
    │   │   └── countdown_controller.dart
    │   └── widgets/
    │       └── wedding_countdown_widget.dart
    ├── briefing/            # 11.2 Gerador de Briefing
    │   └── services/
    │       └── briefing_service.dart
    ├── budget/              # 11.3 Gestor de Orçamento
    │   ├── data/
    │   ├── models/
    │   │   └── budget_model.dart
    │   ├── screens/
    │   │   └── budget_screen.dart
    │   └── widgets/
    │       └── budget_category_row.dart
    ├── checklist/           # 11.4 Cronograma
    │   ├── data/
    │   │   └── default_tasks.dart
    │   ├── models/
    │   │   └── checklist_model.dart
    │   └── screens/
    │       └── wedding_checklist_screen.dart
    ├── favorites/           # 11.5 Favoritos
    │   ├── models/
    │   │   └── favorite_model.dart
    │   ├── screens/
    │   │   └── favorites_screen.dart
    │   └── widgets/
    │       ├── favorite_button.dart
    │       └── favorite_note_dialog.dart
    └── guests/              # 11.6 Lista de Convidados
        ├── models/
        │   └── guest_model.dart
        ├── controllers/
        │   └── guest_list_controller.dart
        ├── screens/
        │   └── guest_list_screen.dart
        └── widgets/
            ├── guest_summary_card.dart
            ├── guest_list_tile.dart
            └── add_guest_sheet.dart
```

#### Navegação — Rotas Adicionais (go_router)

```dart
// Adicionar ao router principal:
GoRoute(path: '/meu-casamento',             builder: (_, __) => MyCWeddingHubScreen()),
GoRoute(path: '/meu-casamento/orcamento',   builder: (_, __) => BudgetScreen()),
GoRoute(path: '/meu-casamento/cronograma',  builder: (_, __) => WeddingChecklistScreen()),
GoRoute(path: '/meu-casamento/convidados',  builder: (_, __) => GuestListScreen()),
GoRoute(path: '/meus-favoritos',            builder: (_, __) => FavoritesScreen()),
```

#### Tela Hub "Meu Casamento"
Criar uma tela intermediária `/meu-casamento` que sirva como dashboard central das funcionalidades exclusivas, exibindo:
1. Widget de Contagem Regressiva (resumido)
2. Botões de navegação para: Orçamento, Cronograma, Convidados, Favoritos
3. Acesso rápido à edição do perfil (data, convidados estimados, estilo)

#### Dependências Consolidadas `pubspec.yaml`

```yaml
dependencies:
  # Funcionalidades exclusivas
  screenshot: ^2.1.0
  share_plus: ^7.2.0
  path_provider: ^2.1.0
  url_launcher: ^6.2.0
  sqflite: ^2.3.0
  connectivity_plus: ^5.0.0
  uuid: ^4.0.0
  intl: ^0.18.0   # já deve estar no projeto
```

---

## Apêndice A: Assets Locais

```
assets/
├── categorias/
│   ├── fotografia.jpg
│   ├── buffet.jpg
│   ├── decoracao.jpg
│   ├── musica.jpg
│   ├── espacos.jpg
│   └── vestidos.jpg
├── fornecedores/
│   └── placeholder.jpg
└── logos/
    └── (logos de parceiros, se necessário)
```

---

## Apêndice B: Paleta Completa de Gradientes

| Uso | Gradiente |
|-----|-----------|
| Hero background | Imagem + overlay `rose-900` com opacidade |
| CTA Guia de Preços | `purple-600` → `pink-600` (horizontal) |
| Página Indicado | `rose-600` → `red-600` (diagonal) |
| Badge Vitrine | `amber-500` sólido |
| Badge Verificado | `blue-500` sólido |
| Botão Instagram | Radial: `#fdf497` → `#fd5949` → `#d6249f` → `#285aeb` |
| Botão WhatsApp | `green-500` sólido |
| Footer | `slate-900` sólido |

---

## Apêndice C: Links Externos Utilizados

| Destino | URL |
|---------|-----|
| Instagram | `https://www.instagram.com/guianoivaspiracicaba/` |
| WhatsApp Contato | `https://wa.me/5519989786156` |
| Painel Fornecedor | `https://painel.guianoivas.com` |
| Formspree (Contato) | `https://formspree.io/f/myzdrpea` |
| Formspree (Anuncie) | `https://formspree.io/f/myzdrpea` |

---

*Documento gerado com base no código-fonte do portal web Angular/TypeScript do Guia Noivas Piracicaba.*  
*Seção 11 (Funcionalidades Exclusivas do App) adicionada em Abril 2026.*  
*Para dúvidas, contato: contato@guianoivas.com*
