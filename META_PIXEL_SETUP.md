# Meta Pixel Setup

## Configuração do Meta Pixel

O Meta Pixel foi instalado no projeto. Agora você precisa:

### 1. Obter seu Pixel ID
- Acesse [Meta Business Suite](https://business.facebook.com/)
- Vá para **Events Manager** → **Data Sources** → **Web**
- Crie um novo pixel (caso não tenha) ou copie o ID de um existente
- O ID é um número de 16 dígitos (exemplo: `1234567890123456`)

### 2. Atualizar o código
No arquivo `src/index.html`, procure por:

```javascript
fbq('init', '1234567890'); <!-- ALTERE PARA O SEU PIXEL ID -->
```

E substitua `1234567890` pelo seu **ID do Meta Pixel real**.

Também atualize a URL da imagem noscript na mesma linha:

```html
<noscript><img height="1" width="1" style="display:none"
  src="https://www.facebook.com/tr?id=1234567890&ev=PageView&noscript=1" /></noscript>
```

### 3. Eventos Customizados (Opcional)

Você pode rastrear eventos específicos adicionando chamadas `fbq('track', ...)` em componentes Angular:

**Exemplo - Quando alguém clica em um fornecedor:**
```typescript
// em fornecedor-page.ts ou onde fizer sentido
declare var fbq: Function;

export class FornecedorPageComponent {
  onClickFornecedor() {
    fbq('track', 'ViewContent', {
      content_name: this.fornecedor.nome,
      content_type: 'product',
      value: 0,
      currency: 'BRL'
    });
  }
}
```

**Exemplo - Newsletter:**
```typescript
// em footer.ts
declare var fbq: Function;

subscribe() {
  // ... seu código
  fbq('track', 'Lead');
}
```

**Exemplo - Contato:**
```typescript
// em contato-page.ts
fbq('track', 'Contact');
```

### 4. Verificar se está funcionando

1. Instale a [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgodkgjglpklndljpnfmpnalhggacne) (extensão Chrome)
2. Abra seu site
3. A extensão deve mostrar o pixel sendo disparado

### CSP (Content Security Policy)

Já foram adicionadas as permissões necessárias:
- `script-src`: permite carregar scripts do `https://connect.facebook.net`
- `connect-src`: permite conexões para `https://connect.facebook.net`

Tudo pronto para rastrear eventos de conversão no Facebook Ads!
