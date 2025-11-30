# Guia de Importação - GTM Contact Tracking

## Arquivo Criado
`gtm-contact-tracking-config.json`

Este arquivo contém toda a configuração necessária para rastrear cliques nos botões de contato (WhatsApp, Instagram, Site).

---

## 📋 O que será importado

### **3 Variáveis** (Variables)
- `Click - Vendor ID` → Captura o atributo `data-vendor-id`
- `Click - Vendor Name` → Captura o atributo `data-vendor-name`
- `Click - Vendor Category` → Captura o atributo `data-vendor-category`

### **3 Triggers** (Gatilhos)
- `Click - WhatsApp Button` → Dispara quando clica em elemento com `data-event-action="Clique WhatsApp"`
- `Click - Instagram Button` → Dispara quando clica em elemento com `data-event-action="Clique Instagram"`
- `Click - Site Button` → Dispara quando clica em elemento com `data-event-action="Clique Site"`

### **3 Tags** (Tags GA4)
- `GA4 - Event - Click WhatsApp` → Envia evento `click_whatsapp` com parâmetros vendor_*
- `GA4 - Event - Click Instagram` → Envia evento `click_instagram` com parâmetros vendor_*
- `GA4 - Event - Click Site` → Envia evento `click_site` com parâmetros vendor_*

---

## 🚀 Como Importar (Passo a Passo)

### 1. Acesse o Google Tag Manager
- Vá para: https://tagmanager.google.com
- Entre no container: `GTM-MVF5F3ZD`

### 2. Importe o Container
1. No menu lateral, clique em **Admin** (ícone de engrenagem)
2. Na seção "Container", clique em **Import Container**
3. Clique em **Choose container file** e selecione: `gtm-contact-tracking-config.json`
4. Em "Choose a workspace", selecione: **Existing** → **Default Workspace**
5. Em "Import option", selecione: **Merge** (recomendado) ou **Overwrite** (se quiser substituir tudo)
   - ⚠️ **ATENÇÃO:** Overwrite apaga configurações existentes! Use Merge.
6. Escolha como resolver conflitos: **Rename conflicting tags, triggers, and variables**
7. Clique em **Confirm**

### 3. Configure a Tag GA4 (IMPORTANTE!)
As tags importadas referenciam "GA4 Config Tag". Você precisa conectá-las à sua propriedade GA4:

**Opção A - Se já tem uma tag GA4 Config:**
1. Vá em **Tags**
2. Abra cada uma das 3 tags importadas
3. No campo **Configuration Tag**, selecione sua tag GA4 existente
4. Salve cada tag

**Opção B - Se NÃO tem tag GA4 Config ainda:**
1. Clique em **Tags** → **New**
2. Nome: `GA4 - Config`
3. Tipo: **Google Analytics: GA4 Configuration**
4. Measurement ID: `G-W5VV70FNKL` (seu ID GA4)
5. Trigger: **All Pages**
6. Salve
7. Abra cada uma das 3 tags importadas e selecione esta tag no campo **Configuration Tag**

### 4. Teste no Preview Mode
1. Clique em **Preview** (canto superior direito)
2. Digite a URL do seu site (pode ser localhost ou produção)
3. Navegue até a página de um fornecedor
4. Clique nos botões WhatsApp, Instagram e Site
5. No painel do Tag Assistant, confirme que as tags dispararam com os parâmetros corretos

### 5. Publique
1. Se tudo estiver OK no Preview, clique em **Submit** (canto superior direito)
2. Dê um nome à versão: "Contact Button Tracking - v1"
3. Adicione descrição (opcional): "Rastreamento de cliques em WhatsApp, Instagram e Site"
4. Clique em **Publish**

---

## ✅ Validação no GA4

Após publicar, valide no Google Analytics 4:

1. Acesse sua propriedade GA4
2. Vá em **Configure** → **DebugView**
3. Com o site aberto, clique nos botões de contato
4. Verifique se aparecem os eventos:
   - `click_whatsapp`
   - `click_instagram`
   - `click_site`
5. Clique em cada evento e confirme os parâmetros:
   - `vendor_id` (ex: 123)
   - `vendor_name` (ex: "Studio Fotográfico")
   - `vendor_category` (ex: "Fotografia")

---

## 📊 Criar Dimensões Personalizadas no GA4

Para usar esses parâmetros em relatórios:

1. No GA4, vá em **Admin** → **Custom definitions**
2. Clique em **Create custom dimension**
3. Crie 3 dimensões:

**Dimensão 1:**
- Dimension name: `Vendor Name`
- Scope: `Event`
- Event parameter: `vendor_name`

**Dimensão 2:**
- Dimension name: `Vendor ID`
- Scope: `Event`
- Event parameter: `vendor_id`

**Dimensão 3:**
- Dimension name: `Vendor Category`
- Scope: `Event`
- Event parameter: `vendor_category`

Agora você pode usar essas dimensões em relatórios personalizados e explorations!

---

## 🆘 Troubleshooting

**Tags não disparam:**
- Verifique se os triggers estão corretos (Preview mode mostra se dispararam)
- Confirme que os elementos HTML têm os atributos `data-event-action`

**Parâmetros vazios:**
- Verifique se as variáveis estão capturando os atributos corretos
- Use o Debug mode do GTM para ver o valor das variáveis no momento do clique

**Eventos não aparecem no GA4:**
- Confirme que a tag GA4 Config está corretamente configurada
- Verifique o Measurement ID
- Aguarde até 30 segundos (DebugView tem delay)

---

## 📁 Arquivos Relacionados
- `src/index.html` → GTM snippet com ID `GTM-MVF5F3ZD`
- `src/app/features/fornecedores/fornecedor-page.html` → Botões com data attributes
- `docs/analytics-implementation.md` → Documentação completa do analytics

---

**Dúvidas?** Este guia cobre todo o processo de importação e configuração. Siga os passos na ordem para garantir que tudo funcione corretamente.
