# Guia de Deploy - Bloqueio de Indexação em Desenvolvimento

## ✅ Implementações Realizadas

### 1. Meta Tag noindex Dinâmica
- **Serviço**: `src/app/core/seo-blocker.service.ts`
- **Funcionalidade**: Adiciona automaticamente `<meta name="robots" content="noindex, nofollow">` no ambiente de desenvolvimento
- **Ativação**: Automática ao inicializar a aplicação quando `environment.production = false`

### 2. Propriedade production nos Environments
- **Development** (`environment.ts`): `production: false`
- **Production** (`environment.prod.ts`): `production: true`

### 3. Arquivos robots.txt por Ambiente
- **Produção**: `public/robots.txt` - Permite indexação completa
- **Desenvolvimento**: `public/robots-dev.txt` - Bloqueia todos os bots

## 🚀 Passos para Deploy

### Ambiente de Desenvolvimento (dev.guianoivas.com)

1. **Build da aplicação**:
   ```bash
   npm run build
   ```

2. **Substituir robots.txt antes do deploy**:
   ```bash
   # Windows (PowerShell)
   Copy-Item public/robots-dev.txt dist/guia-noivas/browser/robots.txt -Force

   # Linux/Mac
   cp public/robots-dev.txt dist/guia-noivas/browser/robots.txt
   ```

3. **Deploy para Azure Static Web Apps (Dev)**
   - O meta tag noindex será injetado automaticamente no browser
   - O robots.txt bloqueará todos os crawlers

### Ambiente de Produção (guianoivas.com)

1. **Build da aplicação com configuração de produção**:
   ```bash
   npm run build -- --configuration production
   ```

2. **Verificar que o robots.txt correto está presente**:
   - O arquivo `public/robots.txt` (que permite indexação) será copiado automaticamente

3. **Deploy para Azure Static Web Apps (Prod)**

## 🔍 Solicitação de Remoção no Google Search Console

Para remover dev.guianoivas.com do índice do Google:

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Selecione a propriedade dev.guianoivas.com (ou adicione se não existir)
3. Vá em **Remoções** > **Nova solicitação**
4. Escolha "Remover temporariamente URL" ou "Limpar cache"
5. Digite: `https://dev.guianoivas.com/`
6. Marque também "Remover todas as URLs com este prefixo"
7. Aguarde a aprovação (geralmente 1-2 dias)

## ⚠️ Proteção Adicional (Opcional)

### Autenticação Básica via Azure Static Web Apps

Se você quiser adicionar autenticação HTTP Basic no ambiente dev:

1. Crie arquivo `staticwebapp.config.json` específico para dev:

```json
{
  "routes": [
    {
      "route": "/*",
      "allowedRoles": ["authenticated"]
    }
  ],
  "responseOverrides": {
    "401": {
      "statusCode": 401,
      "rewrite": "/login.html"
    }
  }
}
```

2. Configure restrições de acesso no Azure Portal:
   - Navegue até Static Web App > Configuration > Authentication
   - Configure o provedor desejado (Azure AD, GitHub, etc.)

## 📋 Checklist de Verificação

- [ ] Meta tag noindex presente em dev (verificar via DevTools)
- [ ] robots.txt bloqueando em dev (`curl https://dev.guianoivas.com/robots.txt`)
- [ ] robots.txt permitindo em prod (`curl https://guianoivas.com/robots.txt`)
- [ ] Solicitação de remoção enviada no Google Search Console
- [ ] Verificar em 48h se URLs foram removidas

## 🛠️ Comandos Úteis

```bash
# Verificar qual robots.txt está ativo
curl https://dev.guianoivas.com/robots.txt
curl https://guianoivas.com/robots.txt

# Testar meta tags no browser
# Abra o DevTools (F12) e execute:
document.querySelector('meta[name="robots"]')?.content
```

## 📝 Notas Importantes

- A meta tag `noindex` é injetada **dinamicamente no browser**, não no HTML estático
- Para SSR/Pre-rendering, pode ser necessário ajuste adicional no `server.ts`
- O bloqueio é **imediato** para novos crawls, mas URLs já indexadas precisam de solicitação de remoção
- Mantenha sempre `environment.production = false` em development builds
