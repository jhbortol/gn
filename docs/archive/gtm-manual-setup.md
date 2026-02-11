# Configuração Manual GTM - Rastreamento de Botões de Contato

Como a importação automática está com problemas de formato, aqui está o passo a passo COMPLETO para criar manualmente no GTM.
**Tempo estimado: 10-15 minutos**

---

## 🔧 PASSO 1: Ativar Variáveis Built-in

1. Acesse: https://tagmanager.google.com
2. Entre no container: `GTM-MVF5F3ZD`
3. Menu lateral: **Variables**
4. Na seção "Built-In Variables", clique em **Configure**
5. Marque as seguintes variáveis (se ainda não estiverem ativas):
   - ✅ Click Element
   - ✅ Click Classes
   - ✅ Click ID
   - ✅ Click Target
   - ✅ Click URL
6. Clique fora para salvar

---

## 🔧 PASSO 2: Criar 3 Variáveis Personalizadas

Clique em **New** na seção "User-Defined Variables"

### Variável 1: Click - Vendor ID
1. Nome: `Click - Vendor ID`
2. Tipo: **Auto-Event Variable**
3. Variable Type: **Element Attribute**
4. Attribute Name: `data-vendor-id`
5. **Save**

### Variável 2: Click - Vendor Name
1. Nome: `Click - Vendor Name`
2. Tipo: **Auto-Event Variable**
3. Variable Type: **Element Attribute**
4. Attribute Name: `data-vendor-name`
5. **Save**

### Variável 3: Click - Vendor Category
1. Nome: `Click - Vendor Category`
2. Tipo: **Auto-Event Variable**
3. Variable Type: **Element Attribute**
4. Attribute Name: `data-vendor-category`
5. **Save**

---

## 🎯 PASSO 3: Criar 3 Triggers (Gatilhos)

Menu lateral: **Triggers** → **New**

### Trigger 1: Click - WhatsApp Button
1. Nome: `Click - WhatsApp Button`
2. Tipo: **Click - All Elements**
3. This trigger fires on: **Some Clicks**
4. Adicione condição (escolha UMA das opções abaixo):
   
   **OPÇÃO A (mais confiável):**
   - `Click Text` **equals** `WhatsApp`
   
   **OPÇÃO B (usando atributo):**
   - Primeira linha: `Click Element` **contains** `data-event-action`
   - Clique no "+" para adicionar condição AND
   - Segunda linha: `Click Text` **equals** `WhatsApp`

5. **Save**

### Trigger 2: Click - Instagram Button
1. Nome: `Click - Instagram Button`
2. Tipo: **Click - All Elements**
3. This trigger fires on: **Some Clicks**
4. Adicione condição:
   - `Click Text` **equals** `Instagram`
5. **Save**

### Trigger 3: Click - Site Button
1. Nome: `Click - Site Button`
2. Tipo: **Click - All Elements**
3. This trigger fires on: **Some Clicks**
4. Adicione condição:
   - `Click Text` **equals** `Visitar Site`
5. **Save**

**💡 Dica:** Se você precisar ser mais específico (caso tenha outros botões com mesmo texto), use a Opção B adicionando a condição do atributo.

---

## 🏷️ PASSO 4: Criar 3 Tags GA4

Menu lateral: **Tags** → **New**

### Tag 1: GA4 - Event - Click WhatsApp
1. Nome: `GA4 - Event - Click WhatsApp`
2. Clique em **Tag Configuration**
3. Selecione: **Google Analytics: GA4 Event**
4. **Configuration Tag:** Se aparecer um dropdown vazio ou não encontrar nenhuma tag:
   - Clique em **Measurement ID** (campo alternativo que aparece abaixo)
   - Digite: `G-W5VV70FNKL`
   - **OU** se só aparecer "Configuration Tag" sem opção, pule para criar a Config Tag primeiro (veja seção abaixo*)
5. **Event Name:** `click_whatsapp`
6. **Event Parameters** - clique em **Add Row** 3 vezes:
   - Row 1: Parameter Name: `vendor_id` → Value: `{{Click - Vendor ID}}`
   - Row 2: Parameter Name: `vendor_name` → Value: `{{Click - Vendor Name}}`
   - Row 3: Parameter Name: `vendor_category` → Value: `{{Click - Vendor Category}}`
7. **Triggering:** clique e selecione `Click - WhatsApp Button`
8. **Save**

### Tag 2: GA4 - Event - Click Instagram
1. Nome: `GA4 - Event - Click Instagram`
2. Tag Configuration: **Google Analytics: GA4 Event**
3. **Measurement ID:** `G-W5VV70FNKL` (mesmo do WhatsApp)
4. **Event Name:** `click_instagram`
5. **Event Parameters** - clique em **Add Row** 3 vezes:
   - Row 1: Parameter Name: `vendor_id` → Value: `{{Click - Vendor ID}}`
   - Row 2: Parameter Name: `vendor_name` → Value: `{{Click - Vendor Name}}`
   - Row 3: Parameter Name: `vendor_category` → Value: `{{Click - Vendor Category}}`
6. **Triggering:** selecione `Click - Instagram Button`
7. **Save**

### Tag 3: GA4 - Event - Click Site
1. Nome: `GA4 - Event - Click Site`
2. Tag Configuration: **Google Analytics: GA4 Event**
3. **Measurement ID:** `G-W5VV70FNKL` (mesmo das anteriores)
4. **Event Name:** `click_site`
5. **Event Parameters** - clique em **Add Row** 3 vezes:
   - Row 1: Parameter Name: `vendor_id` → Value: `{{Click - Vendor ID}}`
   - Row 2: Parameter Name: `vendor_name` → Value: `{{Click - Vendor Name}}`
   - Row 3: Parameter Name: `vendor_category` → Value: `{{Click - Vendor Category}}`
6. **Triggering:** selecione `Click - Site Button`
7. **Save**

---

## *📌 Se você NÃO tem uma Tag GA4 Config ainda:

Menu lateral: **Tags** → **New**

1. Clique em **Tag Configuration**
2. Na lista de tipos, procure por: **Google Analytics** (seção)
3. Dentro dela, selecione: **Google tag** (esse é o novo nome da GA4 Configuration)
   - **OU** se aparecer: **Google Analytics: GA4 Configuration** (nome antigo)
4. Nome da tag: `GA4 - Config`
5. Tag ID / Measurement ID: `G-W5VV70FNKL`
6. Triggering: clique e selecione **All Pages**
7. **Save**

**⚠️ Nota:** Dependendo da versão do GTM, pode aparecer como:
- "Google tag" (novo) → use Tag ID: `G-W5VV70FNKL`
- "GA4 Configuration" (antigo) → use Measurement ID: `G-W5VV70FNKL`

Ambos funcionam da mesma forma!

Agora volte e configure as 3 tags de evento acima para usar esta tag Config.

---

## 🧪 PASSO 5: Testar no Preview Mode

1. Clique em **Preview** (canto superior direito)
2. Digite a URL do seu site (localhost ou produção)
3. Navegue até a página de um fornecedor
4. No painel Tag Assistant (lateral):
   - Clique no botão **WhatsApp** no site
   - Verifique se aparece "Click - WhatsApp Button" nos eventos
   - Clique nele e confirme:
     - Tag `GA4 - Event - Click WhatsApp` disparou (Tags Fired)
     - Variables: `Click - Vendor ID`, `Click - Vendor Name`, `Click - Vendor Category` têm valores corretos
5. Repita para Instagram e Site

**Se algo não funcionar:**
- Verifique se os triggers estão detectando os cliques (seção "Triggers" no Tag Assistant)
- Confirme que as variáveis estão capturando os atributos (seção "Variables")
- Use o console do navegador (F12) e veja se os elementos HTML têm os atributos `data-event-action`, `data-vendor-id`, etc.

---

## 🚀 PASSO 6: Publicar

1. Clique em **Submit** (canto superior direito)
2. Version Name: `Contact Button Tracking - v1`
3. Version Description: `Rastreamento de cliques em WhatsApp, Instagram e Site com parâmetros do fornecedor`
4. Clique em **Publish**

---

## ✅ PASSO 7: Validar no GA4

1. Acesse Google Analytics 4: https://analytics.google.com
2. Entre na propriedade vinculada ao `G-W5VV70FNKL`
3. Menu lateral: **Configure** → **DebugView**
4. Com o site aberto, clique nos botões de contato
5. Verifique se aparecem os eventos:
   - `click_whatsapp`
   - `click_instagram`
   - `click_site`
6. Clique em cada evento e confirme os parâmetros:
   - `vendor_id` (ex: 123)
   - `vendor_name` (ex: "Studio Fotográfico XYZ")
   - `vendor_category` (ex: "Fotografia")

**⏱️ Nota:** O DebugView tem delay de até 30 segundos.

---

## 📊 PASSO 8: Criar Dimensões Personalizadas (Opcional, mas Recomendado)

Para usar esses parâmetros em relatórios do GA4:

1. No GA4: **Admin** → **Data display** → **Custom definitions**
2. Clique em **Create custom dimension**
3. Crie 3 dimensões:

**Dimensão 1:**
- Dimension name: `Vendor Name`
- Scope: **Event**
- Event parameter: `vendor_name`
- Clique **Save**

**Dimensão 2:**
- Dimension name: `Vendor ID`
- Scope: **Event**
- Event parameter: `vendor_id`
- Clique **Save**

**Dimensão 3:**
- Dimension name: `Vendor Category`
- Scope: **Event**
- Event parameter: `vendor_category`
- Clique **Save**

Agora você pode usar essas dimensões em:
- Explorations (Análises exploratórias)
- Custom Reports (Relatórios personalizados)
- Segments (Segmentos)

---

## 🎯 Resumo do que você criou:

✅ 3 Variáveis personalizadas (capturando data attributes)
✅ 3 Triggers (detectando cliques nos botões)
✅ 3 Tags GA4 (enviando eventos com parâmetros)
✅ Eventos sendo enviados ao GA4: `click_whatsapp`, `click_instagram`, `click_site`
✅ Parâmetros sendo capturados: `vendor_id`, `vendor_name`, `vendor_category`

---

## 🆘 Troubleshooting

**Tags não disparam no Preview:**
- Verifique se o trigger tem a condição correta (Click Element contains "data-event-action=...")
- Inspecione o elemento HTML no DevTools (F12) e confirme que o atributo existe

**Variáveis retornam undefined:**
- Certifique-se de que criou variáveis do tipo "Auto-Event Variable" → "Element Attribute"
- Confirme que o nome do atributo está correto (sem "{{" ou "}}")

**Eventos não aparecem no GA4 DebugView:**
- Confirme que a tag GA4 Config tem o Measurement ID correto: `G-W5VV70FNKL`
- Verifique se não há bloqueadores de anúncios/analytics ativos
- Aguarde até 30 segundos (DebugView não é instantâneo)

**Parâmetros vazios no GA4:**
- No Preview do GTM, clique no evento e veja se as variáveis têm valores
- Se tiverem valores no GTM mas não no GA4, pode haver limite de parâmetros ou configuração de consent

---

## 📁 Arquivos Relacionados

- `src/index.html` → GTM snippet instalado
- `src/app/features/fornecedores/fornecedor-page.html` → Botões com data attributes
- `docs/analytics-implementation.md` → Documentação geral de analytics

---

**Pronto!** Siga este guia passo a passo e em 15 minutos terá tudo funcionando. 🚀
