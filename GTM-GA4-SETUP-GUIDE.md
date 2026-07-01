# Guia de Configuração: Google Tag Manager e GA4

Este guia detalha o passo a passo para configurar o rastreamento das novas ações das noivas (Login, Cadastro e Interações no Hub) através do Google Tag Manager (GTM) e enviar esses dados para o Google Analytics 4 (GA4).

---

## Passo 1: Criar Variáveis da Camada de Dados (Data Layer Variables)

No código, nós enviamos detalhes extras junto com os eventos. Precisamos dizer ao GTM para "escutar" e guardar esses detalhes.

1. Acesse o painel do **Google Tag Manager** (tagmanager.google.com).
2. No menu lateral esquerdo, clique em **Variáveis** (Variables).
3. Na seção **Variáveis Definidas pelo Usuário** (User-Defined Variables), clique em **Nova**.
4. Clique no ícone de lápis para configurar:
   - **Tipo de Variável:** Variável da Camada de Dados (Data Layer Variable)
   - **Nome da Variável da Camada de Dados:** `method`
   - **Nome (topo da tela):** `dlv - method`
5. Salve.
6. Repita os passos de 3 a 5 para criar as seguintes variáveis:
   - Nome: `dlv - action_name` | Variável: `action_name`
   - Nome: `dlv - module` | Variável: `module`
   - Nome: `dlv - consent` | Variável: `consent`

---

## Passo 2: Criar Acionadores (Triggers)

Agora, vamos criar os gatilhos (triggers) que avisam o GTM quando um evento ocorreu no site.

1. No menu lateral esquerdo, clique em **Acionadores** (Triggers).
2. Clique em **Novo**.
3. Clique no ícone de lápis para configurar:
   - **Tipo de Acionador:** Evento Personalizado (Custom Event)
   - **Nome do Evento:** `login`
   - **Nome (topo da tela):** `Evento - Login`
4. Salve.
5. Repita os passos de 2 a 4 para os outros eventos:
   - Nome do Evento: `sign_up` | Nome do Acionador: `Evento - Sign Up`
   - Nome do Evento: `hub_interaction` | Nome do Acionador: `Evento - Hub Interaction`

---

## Passo 3: Criar as Tags do GA4

Por fim, vamos criar as tags que disparam os Acionadores e enviam as Variáveis para o GA4. 

> [!IMPORTANT]
> **Pré-requisito:** Você já deve ter a tag "Google Tag" (ou "Configuração do GA4") criada no seu GTM contendo o seu ID de Medição (Measurement ID), que começa com `G-XXXXXXXXXX`.

### Tag 1: Login de Noiva
1. No menu lateral esquerdo, clique em **Tags**.
2. Clique em **Nova**.
3. Em **Configuração da Tag**, selecione **Google Analytics: Evento do GA4**.
4. Em **ID da Medição**, insira o seu ID (ex: `G-XXXXXXXXXX`) ou selecione a sua Tag de Configuração. G-W5VV70FNKL
5. Em **Nome do evento**, digite `login`.
6. Expanda **Parâmetros do evento** e clique em **Adicionar linha**:
   - **Parâmetro:** `method`
   - **Valor:** Digite `{{dlv - method}}` (ou clique no ícone de bloco para selecionar a variável criada no Passo 1).
7. Em **Acionamento**, selecione o acionador `Evento - Login` (criado no Passo 2).
8. **Nome (topo da tela):** `GA4 - Event - Login`
9. Salve.

### Tag 2: Cadastro de Noiva
1. Crie uma nova Tag.
2. **Configuração da Tag:** Google Analytics: Evento do GA4.
3. **ID da Medição:** Seu ID do GA4. G-W5VV70FNKL
4. **Nome do evento:** `sign_up`
5. **Parâmetros do evento:**
   - Parâmetro: `method` | Valor: `{{dlv - method}}`
6. **Acionamento:** Selecione `Evento - Sign Up`.
7. **Nome (topo da tela):** `GA4 - Event - Sign Up`
8. Salve.

### Tag 3: Interações no Hub (Meu Casamento)
1. Crie uma nova Tag.
2. **Configuração da Tag:** Google Analytics: Evento do GA4.
3. **ID da Medição:** Seu ID do GA4. G-W5VV70FNKL
4. **Nome do evento:** `hub_interaction`
5. **Parâmetros do evento** (adicione 3 linhas):
   - Parâmetro: `action_name` | Valor: `{{dlv - action_name}}`
   - Parâmetro: `module` | Valor: `{{dlv - module}}`
   - Parâmetro: `consent` | Valor: `{{dlv - consent}}`
6. **Acionamento:** Selecione `Evento - Hub Interaction`.
7. **Nome (topo da tela):** `GA4 - Event - Hub Interaction`
8. Salve.

---

## Passo 4: Testar e Publicar

1. No GTM, clique no botão **Visualizar** (Preview) no canto superior direito.
2. Insira o URL do seu site. Uma nova aba se abrirá com seu site conectado ao GTM.
3. No seu site, faça um login ou clique no menu do painel "Meu Casamento".
4. Volte para a aba do *Tag Assistant*. Você deverá ver os eventos `login` ou `hub_interaction` listados no menu da esquerda.
5. Clique sobre o evento e verifique se as Tags do GA4 aparecem como **"Tags Fired"** (Tags Disparadas).
6. Se estiver tudo correto, volte ao GTM e clique no botão azul **Enviar** (Submit) e depois em **Publicar** para colocar as configurações em produção.
