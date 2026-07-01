# ✅ GTM - Correção Final: Custom Events + Data Layer (SEM Erros)

**Este guia elimina os erros "A variável retornou false"** usando `custom events` do dataLayer em vez de triggers baseados em clique com `Click Text`.

---

## 🎯 Por que os erros aparecem?

O setup atual usa:
- ❌ `Click Text` equals `"WhatsApp"` → falha em SVGs e spans genéricos
- ❌ `Click - Vendor ID/Name/Category` → falha quando clica fora do elemento com atributo

**Solução:** usar eventos já disparados pelo código Angular via `window.dataLayer.push()`

---

## 🚀 PASSO 1: Remover Variáveis Problemáticas (Opcional)

Se quiser limpar o GTM:

1. Acesse: https://tagmanager.google.com
2. Container: `GTM-MVF5F3ZD`
3. Menu: **Variables**
4. Procure e **delete** (opcional):
   - `Click Text` (se não usa em outros places)
   - `Click - Vendor ID` (se não usa em outros places)
   - `Click - Vendor Name` (se não usa em outros places)
   - `Click - Vendor Category` (se não usa em outros places)

**Não é obrigatório; pode deixar inativas.**

---

## ✅ PASSO 2: Criar 3 Novos Triggers com Custom Events

Menu: **Triggers** → **New**

### Trigger 1: Custom Event - contact_click
1. Nome: `Custom Event - contact_click`
2. Tipo: **Custom Event**
3. Event name: `contact_click`
4. This trigger fires on: **All Custom Events**
5. **Save**

### Trigger 2: Custom Event - view_vendor
1. Nome: `Custom Event - view_vendor`
2. Tipo: **Custom Event**
3. Event name: `view_vendor`
4. This trigger fires on: **All Custom Events**
5. **Save**

### Trigger 3: Custom Event - whatsapp_intent
1. Nome: `Custom Event - whatsapp_intent`
2. Tipo: **Custom Event**
3. Event name: `whatsapp_intent`
4. This trigger fires on: **All Custom Events**
5. **Save**

---

## 🔧 PASSO 3: Criar 3 Variáveis Data Layer

Menu: **Variables** → **New**

### Variável 1: DLV - vendor_id
1. Nome: `DLV - vendor_id`
2. Tipo: **Data Layer Variable**
3. Variable name: `vendor_id`
4. Data layer version: **Version 2**
5. **Save**

### Variável 2: DLV - vendor_name
1. Nome: `DLV - vendor_name`
2. Tipo: **Data Layer Variable**
3. Variable name: `vendor_name`
4. Data layer version: **Version 2**
5. **Save**

### Variável 3: DLV - vendor_category
1. Nome: `DLV - vendor_category`
2. Tipo: **Data Layer Variable**
3. Variable name: `vendor_category`
4. Data layer version: **Version 2**
5. **Save**

### Variável 4: DLV - contact_type
1. Nome: `DLV - contact_type`
2. Tipo: **Data Layer Variable**
3. Variable name: `contact_type`
4. Data layer version: **Version 2**
5. **Save**

### Variável 5: DLV - intent_stage
1. Nome: `DLV - intent_stage`
2. Tipo: **Data Layer Variable**
3. Variable name: `intent_stage`
4. Data layer version: **Version 2**
5. **Save**

---

## 🏷️ PASSO 4: Criar 3 Tags GA4 com Custom Events

Menu: **Tags** → **New**

### Tag 1: GA4 - Event - Contact Click
1. Nome: `GA4 - Event - Contact Click`
2. Tag Configuration: **Google Analytics: GA4 Event**
3. **Measurement ID:** `G-W5VV70FNKL`
4. **Event Name:** `contact_click`
5. **Event Parameters** - clique em **Add Row** 4 vezes:
   - Row 1: Parameter Name: `vendor_id` → Value: `{{DLV - vendor_id}}`
   - Row 2: Parameter Name: `vendor_name` → Value: `{{DLV - vendor_name}}`
   - Row 3: Parameter Name: `vendor_category` → Value: `{{DLV - vendor_category}}`
   - Row 4: Parameter Name: `contact_type` → Value: `{{DLV - contact_type}}`
6. **Triggering:** selecione `Custom Event - contact_click`
7. **Save**

### Tag 2: GA4 - Event - View Vendor
1. Nome: `GA4 - Event - View Vendor`
2. Tag Configuration: **Google Analytics: GA4 Event**
3. **Measurement ID:** `G-W5VV70FNKL`
4. **Event Name:** `view_vendor`
5. **Event Parameters** - clique em **Add Row** 3 vezes:
   - Row 1: Parameter Name: `vendor_id` → Value: `{{DLV - vendor_id}}`
   - Row 2: Parameter Name: `vendor_name` → Value: `{{DLV - vendor_name}}`
   - Row 3: Parameter Name: `vendor_category` → Value: `{{DLV - vendor_category}}`
6. **Triggering:** selecione `Custom Event - view_vendor`
7. **Save**

### Tag 3: GA4 - Event - WhatsApp Intent
1. Nome: `GA4 - Event - WhatsApp Intent`
2. Tag Configuration: **Google Analytics: GA4 Event**
3. **Measurement ID:** `G-W5VV70FNKL`
4. **Event Name:** `whatsapp_intent`
5. **Event Parameters** - clique em **Add Row** 4 vezes:
   - Row 1: Parameter Name: `vendor_id` → Value: `{{DLV - vendor_id}}`
   - Row 2: Parameter Name: `vendor_name` → Value: `{{DLV - vendor_name}}`
   - Row 3: Parameter Name: `vendor_category` → Value: `{{DLV - vendor_category}}`
   - Row 4: Parameter Name: `intent_stage` → Value: `{{DLV - intent_stage}}`
6. **Triggering:** selecione `Custom Event - whatsapp_intent`
7. **Save**

---

## 🧪 PASSO 5: Testar no Preview Mode

1. Clique em **Preview** (canto superior direito)
2. Digite a URL: `https://guia-noivas.somee.com/piracicaba/fornecedores/seu-fornecedor` (ou local)
3. Navegue até a página de um fornecedor
4. No painel lateral (Tag Assistant):
   - Clique no botão **WhatsApp** no site
   - Verifique se aparece:
     - `contact_click` → Status: **Tags Fired**
     - `whatsapp_intent` → Status: **Tags Fired**
   - Clique em cada evento e confirme:
     - Variables: `DLV - vendor_id`, `DLV - vendor_name`, etc. têm valores preenchidos
5. Volte à página inicial (home)
6. Clique em um card de fornecedor
7. Verifique se aparece:
   - `view_vendor` → Status: **Tags Fired**

**Se não aparecer nada:**
- Abra o console (F12 → Console)
- Digite: `window.dataLayer`
- Procure por objetos com `event: 'contact_click'` ou `event: 'view_vendor'`
- Se aparecer, o site está enviando os eventos corretamente; o problema é no trigger do GTM

---

## 🚀 PASSO 6: Publicar

1. Clique em **Submit** (canto superior direito)
2. Version Name: `Contact Tracking - Custom Events v2`
3. Version Description: `Rastreamento via Custom Events (sem erros de Click Text)`
4. Clique em **Publish**

---

## ✅ PASSO 7: Validar no GA4

1. Acesse Google Analytics 4: https://analytics.google.com
2. Entre na propriedade `G-W5VV70FNKL`
3. Menu lateral: **Configure** → **DebugView**
4. Com o site aberto:
   - Clique em um card de fornecedor → deve aparecer `view_vendor`
   - Clique no botão WhatsApp → deve aparecer `contact_click` + `whatsapp_intent`
   - Clique em Instagram → deve aparecer `contact_click`
5. Clique em cada evento e confirme:
   - `vendor_id` preenchido
   - `vendor_name` preenchido
   - `vendor_category` preenchido

**Nenhum erro de "variável retornou false"!** ✅

---

## 📊 PASSO 8: Criar Dimensões Personalizadas (Para Relatórios)

No GA4: **Admin** → **Data display** → **Custom definitions** → **Create custom dimension**

**Dimensão 1: Vendor Name**
- Dimension name: `Vendor Name`
- Scope: **Event**
- Event parameter: `vendor_name`

**Dimensão 2: Vendor Category**
- Dimension name: `Vendor Category`
- Scope: **Event**
- Event parameter: `vendor_category`

**Dimensão 3: Contact Type**
- Dimension name: `Contact Type`
- Scope: **Event**
- Event parameter: `contact_type`

Clique **Save** em cada uma.

---

## 🎯 PASSO 9: Criar um Relatório no GA4 (Opcional)

1. Menu: **Reports** → **Engagement** → **Events**
2. Clique em um evento (ex: `contact_click`)
3. Clique em **Event count by Vendor Name** (ou crie uma exploração customizada)
4. Adicione as dimensões criadas acima para segmentar

---

## 🔍 Checklist Final

- [ ] 3 Triggers Custom Event criados (`contact_click`, `view_vendor`, `whatsapp_intent`)
- [ ] 5 Variáveis Data Layer criadas (`DLV - vendor_id`, `vendor_name`, `vendor_category`, `contact_type`, `intent_stage`)
- [ ] 3 Tags GA4 criadas e associadas aos triggers
- [ ] Preview mode testado → eventos aparecem sem erros
- [ ] Published
- [ ] DebugView do GA4 confirmando eventos com parâmetros
- [ ] Dimensões personalizadas criadas (opcional)

---

## ❓ FAQ

**P: E os triggers de "Click Text" que tinha antes?**
R: Deixe como está (pausados ou ativos); os novos triggers via Custom Events vão funcionar paralelo. Após testar, você pode deletar os antigos se quiser.

**P: Preciso mudar algo no código do site?**
R: **Não.** O código já dispara esses eventos no dataLayer. Você só está configurando o GTM para ouvir eles.

**P: Os dados vão aparecer no GA4 certo?**
R: Sim. Dentro de 24-48h você verá os eventos em relatórios padrão. DebugView aparece em tempo real (com até 30s de delay).

**P: Posso testar em localhost?**
R: Sim, desde que seu `index.html` inclua a tag GTM (que inclui).

**P: E o Meta Pixel / Facebook Pixel?**
R: O código também já dispara eventos para o Meta Pixel. Se quiser rastrear no Meta, crie tags para isso de forma similar (Meta Pixel Event).

---

## 📞 Suporte

Se algo der errado:
1. Abra DevTools (F12)
2. Vá para Console
3. Digite: `window.dataLayer` e procure por eventos `contact_click` ou `view_vendor`
4. Se aparecer, o site está OK; o GTM é o problema
5. Volte ao Preview Mode do GTM e revise os triggers

