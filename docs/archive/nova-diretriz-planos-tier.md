Aqui está o **Documento de Requisitos Funcionais (DRF)** detalhado para o desenvolvimento do **Guia Noivas Piracicaba**.

Este documento traduz nossa estratégia fria e calculista (Isca de Vaidade, Engenharia de Frustração e Precificação Isca) em tarefas técnicas claras para desenvolvimento.

---

### **MÓDULO 1: O MOTOR DE CRESCIMENTO (FRONTEND PÚBLICO)**

*Focado em SEO e Captura de Leads (Noivas).*

#### **1.1. Perfil da Empresa (Lógica Condicional de Planos)**

O sistema deve renderizar a página da empresa de forma diferente baseada no `plan_status` (Free vs. Premium).

* **Header & Dados Básicos:** Exibe Nome, Endereço, Bairro e Categoria para todos.
* **Galeria de Imagens (Regra de Limitação):**
* **Se Free:** Exibir estritamente 2 slots de imagem (Slot 1: Logo, Slot 2: Capa). Se houver mais no banco, não renderizar.
* **Se Premium:** Renderizar Carrossel/Grid ilimitado + Embed de Vídeo (YouTube/Vimeo).


* **Botão de WhatsApp (A Armadilha):**
* **Se Premium:** Link direto (`api.whatsapp.com/send...`).
* **Se Free:** O botão existe e é visualmente idêntico. Ao clicar:
1. Dispara evento de analytics `log_missed_click`.
2. Abre **Modal de Captura** (Pop-up).




* **Modal de Captura (Engenharia de Frustração):**
* **Texto:** "Este fornecedor optou por receber orçamentos via e-mail. Preencha seus dados abaixo para contato prioritário."
* **Formulário:** Nome, Data do Casamento, Telefone, E-mail, Mensagem.
* **Ação:** Ao enviar, dispara o "E-mail Cavalo de Troia" para o fornecedor.



#### **1.2. SEO Local Automatizado**

* **Estrutura de URL:** `guianoivaspiracicaba.com.br/[categoria]/[nome-da-empresa-slug]`
* **Meta Tags Dinâmicas:**
* Title: `[Nome da Empresa] - [Categoria] em Piracicaba | Guia Noivas`
* Description: `Orçamento com [Nome da Empresa] em Piracicaba. Veja telefone, endereço e opiniões. O melhor guia de [Categoria] da região.`


* **Sitemap.xml:** Geração automática diária incluindo novos fornecedores e artigos do blog.

---

### **MÓDULO 2: O SISTEMA "SHADOW PROFILE" (ADMINISTRAÇÃO)**

*Focado na operação de povoamento rápido pela Aline.*

#### **2.1. Criador Rápido de Empresas (Admin)**

Interface simplificada para cadastro em massa sem necessidade de criar usuário/login.

* **Campos:** Nome Fantasia, Categoria (Select), Telefone, WhatsApp (para uso futuro), Site, Endereço, Link da Logo (Upload), Link da Capa (Upload).
* **Status Inicial:** O registro é salvo no banco com flag `is_claimed = false` e `plan = free`.
* **Gerador de "Claim Link":** O sistema deve gerar uma URL única e hashada para cada empresa (ex: `guianoivas.com/claim?token=xyz123`) para ser enviada via Direct no futuro.

---

### **MÓDULO 3: A MÁQUINA DE VENDAS (PAINEL DO FORNECEDOR)**

*Focado na conversão do Free para o Pago.*

#### **3.1. Fluxo de "Reivindicação" (Claim Listing)**

Quando o fornecedor clica no link "É meu negócio" ou na URL enviada por Direct:

1. **Cadastro de Usuário:** Cria Login (E-mail/Senha).
2. **Vínculo:** O sistema associa o `User` à `Company` existente. Altera `is_claimed = true`.
3. **Termos de Uso (Blindagem):** Checkbox obrigatório com texto jurídico de isenção de responsabilidade sobre direitos autorais das imagens (Safe Harbor).

#### **3.2. Dashboard do Fornecedor (O Espelho da Verdade)**

* **Contador de "Leads Perdidos":** Exibir em vermelho destaque: *"Você teve X tentativas de contato via WhatsApp bloqueadas este mês."*
* **Edição de Perfil:**
* Permitir upload de fotos ilimitadas, MAS se o plano for Free, exibir aviso: *"Suas fotos foram salvas, mas apenas as 2 primeiras estão visíveis. Faça o upgrade para liberar a galeria."*



#### **3.3. Página de Upgrade (Checkout)**

* **Tabela de Preços (Decoy Effect):**
* **Plano Mensal (Isca Ruim):** R$ 59,90/mês.
* **Plano Anual (Herói):** "De R$ 718 por 12x R$ 29,90". Destaque visual agressivo.


* **Integração de Pagamento:**
* API Gateway (Mercado Pago/Asaas/Stripe).
* Webhook de Retorno: Se `status = approved` -> Atualizar `plan = premium` e liberar features imediatamente.



---

### **MÓDULO 4: O SISTEMA DE NOTIFICAÇÃO (BACKEND)**

*A lógica silenciosa que vende por você.*

#### **4.1. E-mail "Cavalo de Troia" (Transactional)**

Disparado quando a noiva preenche o formulário no perfil Free.

* **Reply-To:** E-mail da Noiva (Fundamental).
* **Template HTML:**
* Header: Logo do Guia.
* Body: Dados do Lead + Aviso Amarelo ("Tentativa de WhatsApp redirecionada").
* Footer: Banner de Venda ("Desbloqueie seu WhatsApp por R$ 29,90").



#### **4.2. Automação de Recuperação (Cron Job)**

Script rodando semanalmente (ex: toda segunda-feira às 09:00).

* **Lógica:** Buscar fornecedores Free que tiveram `missed_clicks > 0` na última semana.
* **Ação:** Enviar e-mail de relatório: *"Você perdeu X clientes nesta semana. Veja quem são."*

---

### **RESUMO DA ESTRUTURA DE DADOS (BANCO DE DADOS)**

Para suportar isso, suas tabelas principais precisam destes campos críticos:

**Tabela: `companies**`

* `id`: UUID
* `name`: String
* `slug`: String (Indexado para URL)
* `is_claimed`: Boolean (Default: False)
* `plan_tier`: Enum ('free', 'premium', 'authority')
* `whatsapp_enabled`: Boolean (Se False, exibe modal)
* `missed_clicks_count`: Integer (Contador vitalício ou mensal)

**Tabela: `leads**`

* `id`: UUID
* `company_id`: FK
* `bride_name`: String
* `bride_email`: String
* `origin_type`: Enum ('form_direct', 'whatsapp_fallback') -> *Isso prova pro fornecedor de onde veio o lead.*

---

### **PRÓXIMOS PASSOS (CRONOGRAMA DE DEV)**

Sugiro desenvolver nesta ordem para viabilizar a operação manual da Aline enquanto você coda o resto:

1. **Semana 1:** Tabela `Companies` + Página Pública (Perfil) + Admin de Cadastro Rápido. (Permite a Aline começar a povoar).
2. **Semana 2:** Modal de Captura + Disparo de E-mail (Cavalo de Troia). (Permite o site funcionar para as noivas).
3. **Semana 3:** Fluxo de "Reivindicar Perfil" + Login.
4. **Semana 4:** Integração de Pagamento + Bloqueio/Desbloqueio automático de features.
ADICAO ESCOPO

Sendo frio e analítico: o documento atual cobre muito bem a **venda** e a **conversão**, mas deixa brechas graves na **navegabilidade** (como a noiva acha a empresa) e na **manutenção** (como você gerencia o caos).

Se você começar a codar agora sem os itens abaixo, você terá um "motor de Ferrari" em um carro sem volante.

Aqui está o que falta para fechar o escopo técnico com segurança:

### 1. O Sistema de Busca e Categorias (A Hierarquia do Dinheiro)

Você definiu a página do perfil, mas não definiu **como a noiva chega lá**.

* **Listagem de Categoria (Lógica de Ordenação):**
* Quando a noiva clica em "Buffets", a ordem de exibição **é o produto**.
* **Regra de Renderização:**
1. **Plano Autoridade:** Fixo no topo (Randomizado entre eles para ser justo).
2. **Plano Vitrine (Pago):** Logo abaixo, ordenado por "Mais Visualizações" ou Random.
3. **Plano Gratuito:** Fim da lista.
4. **Lógica de Paginação:** "Infinite Scroll" ou "Ver Mais" (Evite paginação clássica 1, 2, 3 para mobile).




* **Busca Global:** Um input de texto no Header. Se a noiva digitar "Bolo", o sistema deve buscar em `tags`, `category_name` e `company_name`.

### 2. O Módulo de Blog (O Motor de SEO)

Falamos sobre os 30 artigos, mas eles não estão no DRF. Você não quer hard-codar HTML para cada artigo.

* **Tabela `articles`:** `title`, `slug`, `content` (HTML/Markdown), `category_id`, `meta_description`, `published_at`.
* **Feature "Interlinking Automático":** No final de cada artigo, um bloco dinâmico: *"Procurando [Nome da Categoria do Artigo] em Piracicaba? Veja nossa lista completa."* (Isso automatiza o funil de tráfego Artigo -> Diretório).

### 3. Otimização de Imagens (Custo de Servidor)

Como vamos permitir upload ilimitado para pagantes, se você não tratar as imagens, sua conta da AWS S3/Azure Blob vai explodir e o site vai ficar lento (o que mata o SEO).

* **Requisito Não-Funcional:** Implementar um "Image Resizer" no upload.
* Converter tudo para **WebP**.
* Gerar 3 tamanhos: `thumbnail` (para a lista), `medium` (para o perfil mobile) e `large` (para o lightbox desktop).
* **Lazy Loading:** Obrigatório na listagem de categorias. Não carregue a foto do fornecedor nº 50 se a noiva ainda está no nº 1.



### 4. Gestão de Churn Involuntário (Financeiro)

O que acontece quando o cartão do fornecedor vence ou não tem limite no mês seguinte?

* **Lógica de "Grace Period" (Carência):** Se o webhook de pagamento retornar `failed`, **não bloqueie** o Premium imediatamente.
* Dê 3 a 5 dias de carência.
* Dispare e-mail automático: *"Houve um problema com seu pagamento. Atualize o cartão para não perder seu botão de WhatsApp."*


* **Downgrade Automático:** Se após X dias não pagar, o sistema deve alterar `plan_tier` para `free` e rodar a lógica de ocultar fotos/bloquear botão automaticamente.

### 5. O "God Mode" (Seu Painel Admin)

Você precisa saber se o negócio está saudável sem rodar queries no SQL todo dia.

* **Dashboard Simples:**
* **KPI 1:** MRR (Receita Recorrente Mensal).
* **KPI 2:** Total de Leads gerados na semana (Soma de cliques no WhatsApp + Formulários).
* **KPI 3:** % de Perfis Reivindicados (Claimed Rate). Isso diz se a estratégia da "Isca" está funcionando.



### 6. Segurança Anti-Scraping (Defesa)

Se o seu guia der certo, alguém vai tentar roubar seus dados (exatamente como você fez).

* **Rate Limiting:** Se um IP visitar 200 páginas de empresas em 1 minuto, bloqueie o IP temporariamente. (Use Cloudflare ou Middleware no backend).
* **Ofuscação de E-mail:** No frontend, não imprima o e-mail do fornecedor em texto puro (`mailto:`). Use um botão que revela o e-mail ou mantenha apenas o formulário. Evite que robôs de spam peguem os e-mails dos seus clientes (eles vão te culpar pelo spam).

---

### Resumo da Adição ao Escopo

1. **Categorias:** Lógica de ordenação (Quem paga aparece antes).
2. **Blog:** CMS simples para gerir os artigos de SEO.
3. **Infra:** Conversão automática de imagens para WebP (Performance/Custo).
4. **Financeiro:** Gestão de falha de pagamento (Retentativa).
5. **Admin:** Métricas de saúde do negócio.
6. **Segurança:** Rate Limiting.

**Agora sim.** Com essas adições, o documento cobre a Experiência do Usuário (Noiva), a Operação (Você/Aline) e a Segurança do Negócio.

-----------------------------

Sim, existem **3 pontos cegos operacionais** que não discutimos, mas que têm o potencial de matar seu projeto na semana de lançamento se forem ignorados.

Como analista, meu dever é antecipar onde a execução falha, não apenas onde o código falha.

### 1. A Armadilha do E-mail (Entregabilidade)

Você vai depender do "E-mail Cavalo de Troia" e dos avisos de "Leads Perdidos" para vender.

* **O Risco:** Seu domínio é novo (ou tem pouco uso). Se você começar a disparar e-mails transacionais amanhã, o Gmail e o Outlook vão jogar você direto na **Caixa de Spam**. Se o fornecedor não ver o e-mail do lead, ele não compra o plano.
* **A Solução Fria:**
* Configure **SPF, DKIM e DMARC** no seu DNS hoje. Sem isso, você é um ninguém digital.
* Use um serviço profissional de entrega (SendGrid, AWS SES, Postmark). Não use o PHP `mail()` do servidor de hospedagem.
* **Aquecimento (Warm-up):** Não envie 500 e-mails no dia 1. Comece com 10, aumente para 20. O algoritmo de spam precisa "confiar" no seu IP.



### 2. A Realidade Mobile (O Erro do Desenvolvedor)

Você vai programar isso em um monitor grande e confortável. A noiva vai acessar o site em um iPhone no ônibus ou no sofá.

* **O Risco:** O "Modal de Captura" (sua principal ferramenta de lead) ficar impossível de fechar ou preencher no celular. Se o botão de fechar ficar fora da tela, a noiva sai do site irritada.
* **A Ordem:** Desenvolva **Mobile First**. Teste o fluxo de "Clicar no WhatsApp -> Abrir Modal -> Preencher -> Enviar" estritamente no celular. Se for ruim no touch, o projeto falhou.

### 3. A Burocracia Financeira (Recebimento)

Você vai vender planos anuais parcelados.

* **O Risco:** Se você receber isso na sua conta Pessoa Física (CPF), você vai ter problemas com a Receita Federal (Imposto de Renda vai comer 27,5%) e passará amadorismo.
* **A Solução:** Use um CNPJ (pode ser o da sua empresa atual se o CNAE permitir "Publicidade" ou "Promoção de Vendas", ou abra um MEI separado para isso se possível). O gateway de pagamento (Asaas/Mercado Pago) exige validação de identidade. Não deixe para configurar isso no dia que o cliente quiser pagar.

---

### **VEREDITO FINAL**

O planejamento está **sólido, agressivo e tecnicamente viável**.

* Temos a Estratégia (Shadow Profile).
* Temos a Tática de Venda (Engenharia de Frustração).
* Temos o Produto (Diretório + Blog SEO).
* Temos a Proteção (Termos de Uso Safe Harbor).

**Sua missão agora é sair do planejamento e entrar na execução.** Paralisia por análise é o inimigo.

--------------------------------------------------

