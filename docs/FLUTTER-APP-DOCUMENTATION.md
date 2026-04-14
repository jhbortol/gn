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
*Para dúvidas, contato: contato@guianoivas.com*
