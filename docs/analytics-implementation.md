# Implementação de Analytics - Guia Noivas Piracicaba

## ✅ Implementação Concluída

### 1. Google Tag Manager (GTM)
 Current GTM Container ID: GTM-MVF5F3ZD
### 2. Data Attributes (Rastreamento de Fornecedores)

Todos os botões de contato na página de detalhes do fornecedor agora incluem:

```html
data-event-category="Contato"
data-event-action="Clique WhatsApp|Instagram|Site"
data-vendor-id="[ID do Fornecedor]"
data-vendor-name="[Nome do Fornecedor]"
data-vendor-category="[Categoria]"
```

**Botões implementados:**
- ✅ WhatsApp
- ✅ Instagram  
- ✅ Site Externo
- ⚠️ Telefone (não há botão direto de telefone atualmente)

### 3. Data Layer Events

#### Event: `view_vendor`
Disparado automaticamente ao carregar página de detalhes do fornecedor.

**Parâmetros:**
```javascript
{
  event: 'view_vendor',
  vendor_id: '123',
  vendor_name: 'Studio 16 Fotografia',
  vendor_category: 'Fotografia'
}
```

### 4. Configuração no GTM (Próximos Passos)

**No painel do Google Tag Manager, criar:**

#### Tags GA4 a configurar:

| Evento GA4 | Trigger GTM | Variáveis Necessárias |
|------------|-------------|----------------------|
| `click_whatsapp` | Click - elemento com `data-event-action="Clique WhatsApp"` | `{{vendor_name}}`, `{{vendor_category}}`, `{{vendor_id}}` |
| `click_instagram` | Click - elemento com `data-event-action="Clique Instagram"` | `{{vendor_name}}`, `{{vendor_category}}`, `{{vendor_id}}` |
| `click_website` | Click - elemento com `data-event-action="Clique Site"` | `{{vendor_name}}`, `{{vendor_category}}`, `{{vendor_id}}` |
| `view_vendor` | Custom Event `view_vendor` | `{{dlv - vendor_name}}`, `{{dlv - vendor_category}}`, `{{dlv - vendor_id}}` |

#### Variáveis GTM necessárias:

**Para clicks (Data Attributes):**
```
Nome: vendor_name
Tipo: Click Element > Attribute
Atributo: data-vendor-name

Nome: vendor_category
Tipo: Click Element > Attribute
Atributo: data-vendor-category

Nome: vendor_id
Tipo: Click Element > Attribute
Atributo: data-vendor-id
```

**Para Data Layer:**
```
Nome: dlv - vendor_name
Tipo: Data Layer Variable
Nome da variável: vendor_name

Nome: dlv - vendor_category
Tipo: Data Layer Variable
Nome da variável: vendor_category

Nome: dlv - vendor_id
Tipo: Data Layer Variable
Nome da variável: vendor_id
```

### 5. Validação (Debug)

**Para testar:**

1. Abra o Google Tag Assistant ou DebugView do GA4
2. Navegue até uma página de fornecedor (ex: `/fornecedores/studio-16`)
3. Verifique se o evento `view_vendor` aparece com os parâmetros corretos
4. Clique nos botões WhatsApp, Instagram e Site
5. Confirme que os eventos aparecem no debug com `vendor_name` preenchido

**Exemplo de sucesso:**
```
Evento: click_whatsapp
Parâmetros:
  - vendor_name: "Studio 16 Fotografia"
  - vendor_category: "Fotografia"
  - vendor_id: "abc123..."
```

### 6. Microsoft Clarity

Para instalar o Clarity via GTM:

1. Acesse clarity.microsoft.com e obtenha o Project ID
2. No GTM, crie uma nova tag "Custom HTML"
3. Cole o snippet do Clarity
4. Configure trigger "All Pages"

### 7. Custom Dimensions no GA4

**Registrar no GA4 (Admin > Custom Definitions):**

| Nome da Dimensão | Parâmetro do Evento | Escopo |
|------------------|---------------------|--------|
| Fornecedor | `vendor_name` | Event |
| Categoria Fornecedor | `vendor_category` | Event |
| ID Fornecedor | `vendor_id` | Event |

---

## 📊 Relatórios Disponíveis Após Setup

Após a implementação completa, você poderá ver no GA4:

- **Ranking de Fornecedores** por cliques (qual fornecedor gera mais engajamento)
- **Taxa de conversão por categoria** (ex: "Fotografia" tem mais clicks que "DJ")
- **Funil completo:** Visualizações → Cliques WhatsApp → Conversões
- **ROI por fornecedor:** Quanto cada anunciante entrega de valor

---

## ⚠️ Checklist Final

- [ ] Substituir `GTM-XXXXXXX` pelo ID real do container
- [ ] Criar container GTM caso não exista
- [ ] Configurar propriedade GA4 no GTM
- [ ] Criar as 4 tags de evento (whatsapp, instagram, site, view_vendor)
- [ ] Criar variáveis GTM para capturar data attributes
- [ ] Registrar custom dimensions no GA4
- [ ] Instalar Microsoft Clarity via GTM
- [ ] Testar com Tag Assistant / DebugView
- [ ] Validar que `vendor_name` está sendo capturado corretamente

---

**Contato para dúvidas:** [seu email ou canal de suporte]
