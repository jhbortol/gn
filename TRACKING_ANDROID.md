# Documentação de Rastreamento (Tracking) para Android

Este documento contém o mapeamento de todos os eventos de tracking implementados atualmente na versão web/PWA do projeto. O objetivo é guiar os desenvolvedores do aplicativo Android na implementação dos mesmos eventos via Google Analytics (GA4) e Facebook SDK (Meta), garantindo paridade na coleta de dados.

O mapeamento descreve apenas a estrutura lógica (Nome do evento, Parâmetros e Gatilho/Momento de disparo).

---

## Índice de Eventos

1. [Visualização de Página (Page View) e Landing (Ads)](#1-visualização-de-página-page-view-e-landing-ads)
2. [Engajamento com a Página (Page Engagement)](#2-engajamento-com-a-página-page-engagement)
3. [Contato Direto (Cliques em WhatsApp, Telefone, etc)](#3-contato-direto-cliques-em-whatsapp-telefone-etc)
4. [Intenção de Contato WhatsApp (WhatsApp Intent)](#4-intenção-de-contato-whatsapp-whatsapp-intent)
5. [Visualização de Fornecedor (View Vendor)](#5-visualização-de-fornecedor-view-vendor)
6. [Busca (Search)](#6-busca-search)
7. [Submissão de Formulário (Form Submit / Lead)](#7-submissão-de-formulário-form-submit--lead)
8. [Geração de Leads Diretos (Ex: Guia de Preços)](#8-geração-de-leads-diretos-ex-guia-de-preços)
9. [Funil de Cadastro Gratuito de Fornecedor (Free Signup Funnel)](#9-funil-de-cadastro-gratuito-de-fornecedor-free-signup-funnel)
10. [Login de Noivas (Login)](#10-login-de-noivas-login)
11. [Cadastro de Noivas (Sign Up)](#11-cadastro-de-noivas-sign-up)
12. [Interação no Hub "Meu Casamento" (Hub Interaction)](#12-interação-no-hub-meu-casamento-hub-interaction)
13. [Navegação de Categoria (Navigate Categorias)](#13-navegação-de-categoria-navigate-categorias)

---

## 1. Visualização de Página (Page View) e Landing (Ads)
**Objetivo:** Mensurar quais telas o usuário visita e identificar a entrada de tráfego pago nas landings.
**Gatilho:** Assim que o usuário abre uma nova tela/rota no aplicativo.

**Google Analytics 4**
* **Evento:** `page_view`
* **Parâmetros:**
  * `page_path` (String): Caminho/Rota da tela (ex: `/cascavel/guia-custos`).
  * `page_title` (String): Título da tela.
  * `page_location` (String): URL profunda ou nome interno (se aplicável).

**Meta Pixel (Facebook SDK)**
* **Evento Principal:** `PageView`
* **Evento Customizado (Apenas Tráfego Pago):** `PaidSocialLanding`
  * *Nota: Este evento customizado deve ser disparado 1 única vez por sessão caso seja identificado que o usuário veio via link/ad do Meta (presença de fbclid ou utm_source = facebook/instagram).*
* **Parâmetros em ambos:**
  * `page_path` (String): Rota.
  * `page_title` (String): Título da tela.
  * Opcionais: Dados de atribuição (utm_source, utm_medium, utm_campaign, fbclid, traffic_channel).

---

## 2. Engajamento com a Página (Page Engagement)
**Objetivo:** Mensurar o tempo exato de retenção/engajamento na tela ativa.
**Gatilho:** Quando a tela perde o foco (vai para background), ou quando o usuário sai da tela para ir a outra, ou a destrói.

**Google Analytics 4**
* **Evento:** `page_engagement`
* **Parâmetros:**
  * `page_path` (String): Rota atual.
  * `page_title` (String): Título da tela.
  * `engagement_time_msec` (Int/Long): Tempo total na tela em milissegundos.
  * `engagement_time_sec` (Float): Tempo na tela em segundos.
  * `exit_reason` (String): Motivo de encerramento do tracking (ex: `route_change`, `hidden`, `pagehide`).

**Meta Pixel (Facebook SDK)**
* **Evento Customizado:** `PageEngagement`
* **Parâmetros:** Mesmos parâmetros definidos no GA4.

---

## 3. Contato Direto (Cliques em WhatsApp, Telefone, etc)
**Objetivo:** Mensurar quando um usuário decide contactar o fornecedor ou suporte diretamente pelos botões de contato.
**Gatilho:** Clique/Tap no botão de contato (WhatsApp, Instagram, Website, Telefone ou Maps).

**Google Analytics 4**
* **Evento:** `contact_click`
* **Parâmetros:**
  * `contact_type` (String): Tipo de contato (ex: `whatsapp`, `instagram`, `facebook`, `website`, `phone`, `maps`).
  * `vendor_id` (String): ID do fornecedor.
  * `vendor_name` (String): Nome do fornecedor.
  * `vendor_category` (String): Categoria do fornecedor (Opcional).

**Meta Pixel (Facebook SDK)**
* **Evento Padrão:** `Contact`
* **Parâmetros:**
  * `content_type` (String): `product`
  * `content_name` (String): Concatenação de `{contactType} - {vendorName}`.
  * `value` (Float/Int): `0`
  * `currency` (String): `BRL`
  * `content_id` (String): `vendorId`

---

## 4. Intenção de Contato WhatsApp (WhatsApp Intent)
**Objetivo:** Analisar em qual etapa o usuário manifestou o interesse em chamar o fornecedor via WhatsApp (especialmente quando existe uma camada de formulário/lead intermediária).
**Gatilho:** No tap do botão de WhatsApp pré ou pós o preenchimento de formulário de qualificação.

**Google Analytics 4**
* **Evento:** `whatsapp_intent`
* **Parâmetros:**
  * `intent_stage` (String): Fase da intenção (ex: `before_lead_form` ou `after_lead_form`).
  * `vendor_id` (String): ID do fornecedor.
  * `vendor_name` (String): Nome do fornecedor.
  * `vendor_category` (String): Categoria do fornecedor (Opcional).

**Meta Pixel (Facebook SDK)**
* **Evento Padrão:** `Contact`
* **Parâmetros:**
  * `content_type` (String): `product`
  * `content_name` (String): `WhatsApp Intent - {vendorName}`
  * `value` (Float/Int): `0`
  * `currency` (String): `BRL`
  * `content_id` (String): `vendorId`
  * `intent_stage` (String): Fase da intenção (mesmo valor acima).

---

## 5. Visualização de Fornecedor (View Vendor)
**Objetivo:** Mensurar visitas aos perfis detalhados de fornecedores.
**Gatilho:** Assim que carregar a tela de detalhes de um fornecedor específico.

**Google Analytics 4**
* **Evento:** `view_vendor`
* **Parâmetros:**
  * `vendor_id` (String): ID do fornecedor.
  * `vendor_name` (String): Nome do fornecedor.
  * `vendor_category` (String): Categoria do fornecedor.

**Meta Pixel (Facebook SDK)**
* **Evento Padrão:** `ViewContent`
* **Parâmetros:**
  * `content_type` (String): `product`
  * `content_name` (String): Nome do fornecedor.
  * `value` (Float/Int): `0`
  * `currency` (String): `BRL`
  * `content_id` (String): `vendorId`

---

## 6. Busca (Search)
**Objetivo:** Rastrear a utilização e volume da barra/ferramenta de pesquisa interna.
**Gatilho:** Quando o usuário efetua/submete uma busca.

**Google Analytics 4**
* **Evento:** `search`
* **Parâmetros:**
  * `search_term` (String): A string/palavra buscada.
  * `result_count` (Int): Número de resultados retornados pela busca.

**Meta Pixel (Facebook SDK)**
* **Evento Padrão:** `Search`
* **Parâmetros:**
  * `search_string` (String): A string/palavra buscada.

---

## 7. Submissão de Formulário (Form Submit / Lead)
**Objetivo:** Monitorar a conversão através de formulários (Contato, Assinatura de Newsletter ou Anúncio).
**Gatilho:** Quando o formulário é enviado/concluído com sucesso (requisição respondeu OK).

**Google Analytics 4**
* **Evento:** `form_submit`
* **Parâmetros:**
  * `form_type` (String): Tipo de formulário (ex: `contact`, `anuncio`, `newsletter`).
  * `vendor_id` (String): ID do fornecedor (Opcional, quando aplicável).

**Meta Pixel (Facebook SDK)**
* **Evento Padrão:** `Lead` (caso seja newsletter/anúncio) ou `Contact` (caso seja formulário direto a fornecedor).

---

## 8. Geração de Leads Diretos (Ex: Guia de Preços)
**Objetivo:** Identificar captura de leads e downloads através das iscas digitais da plataforma.
**Gatilho:** Quando o usuário preenche o formulário para ter acesso a algum e-book/guia (ex: Guia de Custos 2026).

**Google Analytics 4**
* **Evento:** `generate_lead`
* **Parâmetros:**
  * `lead_type` (String): Tipo/Origem do lead (ex: `guia_precos`).
  * `lead_value` (Float/Int): `1` (Opcional).

**Meta Pixel (Facebook SDK)**
* **Evento Padrão:** `Lead`
* **Parâmetros:**
  * `content_name` (String): Nome do material baixado (ex: `Guia de Preços 2026`).
  * `content_category` (String): `Lead Magnet`
  * `value` (Float/Int): `1`
  * `currency` (String): `BRL`

---

## 9. Funil de Cadastro Gratuito de Fornecedor (Free Signup Funnel)
**Objetivo:** Monitorar e identificar quedas em cada etapa do fluxo de adesão gratuita de fornecedores.
**Gatilho:** Mudança de etapa na tela de cadastro (ex: inicio do processo, erro, conclusão).

**Google Analytics 4**
* **Evento:** `free_signup_funnel`
* **Parâmetros:**
  * `funnel_stage` (String): `inicio`, `falha` ou `sucesso`.
  * `form_type` (String): Tipo (padrão é `anuncio_free`).
  * `vendor_id` (String): ID (Opcional).
  * `reason` (String): Descrição/motivo caso ocorra uma falha na etapa (Opcional).

*Nota: Na Web, os eventos do funil não engatilham disparos nativos do Facebook SDK (ficam a cargo das triggers do GTM caso implementado).*

---

## 10. Login de Noivas (Login)
**Objetivo:** Rastrear a autenticação de usuárias no aplicativo.
**Gatilho:** Autenticação concluída com sucesso.

**Google Analytics 4**
* **Evento:** `login`
* **Parâmetros:**
  * `method` (String): Método utilizado (ex: `google` ou `email`).

**Meta Pixel (Facebook SDK)**
* **Evento Principal:** `Login`
* **Parâmetros:**
  * `method` (String): Método utilizado.

---

## 11. Cadastro de Noivas (Sign Up)
**Objetivo:** Rastrear a criação de novas contas de usuárias no aplicativo.
**Gatilho:** Finalização/criação da nova conta com sucesso.

**Google Analytics 4**
* **Evento:** `sign_up`
* **Parâmetros:**
  * `method` (String): Método utilizado (ex: `google` ou `email`).

**Meta Pixel (Facebook SDK)**
* **Evento Principal:** `CompleteRegistration`
* **Parâmetros:**
  * `content_name` (String): `Bride Signup`
  * `method` (String): Método utilizado.

---

## 12. Interação no Hub "Meu Casamento" (Hub Interaction)
**Objetivo:** Medir engajamento em ferramentas específicas disponíveis logado.
**Gatilho:** Tap/interação em funcionalidades da dashboard da noiva.

**Google Analytics 4**
* **Evento:** `hub_interaction`
* **Parâmetros:**
  * `action_name` (String): Qual ação/clique ocorreu.
  * Adicionalmente, permite qualquer chave/valor extra para contextos específicos (ex: `task_id`, `guest_name`).

*Nota: Não aciona Facebook SDK na web atualmente.*

---

## 13. Navegação de Categoria (Navigate Categorias)
**Objetivo:** Identificar quando os usuários saem de um fluxo paralelo e decidem navegar na listagem de fornecedores.
**Gatilho:** Tap no botão "Ir para categorias" / "Navegar" (Ex: botão final após download do guia de preços).

**Google Analytics 4**
* **Evento:** `navigate_categorias`
* **Parâmetros:**
  * `source` (String): Onde ocorreu o clique (ex: `guia_precos_success`).
  * `cidade` (String): A cidade em contexto no momento do clique.

*Nota: Não aciona Facebook SDK na web atualmente.*