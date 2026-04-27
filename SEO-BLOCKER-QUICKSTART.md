# 🚫 Bloqueio de Indexação - dev.guianoivas.com

## ✅ Implementação Completa

### Arquivos Criados/Modificados

1. **src/app/core/seo-blocker.service.ts** ⭐ NOVO
   - Serviço que injeta `<meta name="robots" content="noindex, nofollow">` automaticamente
   - Ativa apenas quando `environment.production = false`

2. **src/environments/environment.ts** ✏️ MODIFICADO
   - Adicionado: `production: false`

3. **src/environments/environment.prod.ts** ✏️ MODIFICADO
   - Adicionado: `production: true`

4. **src/app/app.ts** ✏️ MODIFICADO
   - Injetado `SeoBlockerService` para ativar automaticamente

5. **public/robots-dev.txt** ⭐ NOVO
   - Bloqueia TODOS os crawlers para ambiente de desenvolvimento

6. **build-dev.ps1** ⭐ NOVO
   - Script automatizado para build de DEV com proteções SEO

7. **build-prod.ps1** ⭐ NOVO
   - Script automatizado para build de PROD com SEO habilitado

8. **DEPLOY-SEO-BLOCKER.md** ⭐ NOVO
   - Documentação completa do processo

## 🚀 Como Usar

### Para Deploy em DESENVOLVIMENTO (dev.guianoivas.com)

```powershell
# Execute o script de build para dev
.\build-dev.ps1

# O script irá:
# 1. Limpar build anterior
# 2. Fazer build da aplicação
# 3. Substituir robots.txt pela versão que bloqueia crawlers
# 4. Verificar configurações de ambiente
```

### Para Deploy em PRODUÇÃO (guianoivas.com)

```powershell
# Execute o script de build para prod
.\build-prod.ps1

# O script irá:
# 1. Limpar build anterior
# 2. Fazer build com configuração de produção
# 3. Verificar que robots.txt permite indexação
# 4. Verificar configurações de ambiente
```

## 🔒 Proteções Implementadas

### Nível 1: Meta Tag noindex (Dinâmica)
- ✅ Injetada automaticamente no browser em ambiente dev
- ✅ Funciona mesmo se crawler ignorar robots.txt
- ✅ Aparece em `<head>` via JavaScript

### Nível 2: robots.txt (Estático)
- ✅ Bloqueia Google, Bing, Yahoo, DuckDuckGo, etc.
- ✅ Primeira linha de defesa
- ✅ Padrão da indústria

### Nível 3: Configuração de Ambiente
- ✅ `environment.production = false` em dev
- ✅ `environment.production = true` em prod
- ✅ Controle centralizado

## ⚡ Ação Imediata Necessária

### 1. Fazer Deploy do Build Atualizado
```powershell
.\build-dev.ps1
# Deploy dist/guia-noivas/browser/* para dev.guianoivas.com
```

### 2. Solicitar Remoção no Google Search Console
1. Acesse: https://search.google.com/search-console
2. Adicione propriedade `dev.guianoivas.com` (se não existir)
3. Vá em **Remoções** > **Nova solicitação**
4. Digite: `https://dev.guianoivas.com/`
5. Marque: "Remover todas as URLs com este prefixo"
6. Aguarde aprovação (1-2 dias)

### 3. Verificar Implementação
```powershell
# Verificar robots.txt
curl https://dev.guianoivas.com/robots.txt

# Deve retornar:
# User-agent: *
# Disallow: /
```

```javascript
// No browser, abra DevTools (F12) e execute:
document.querySelector('meta[name="robots"]')?.content
// Deve retornar: "noindex, nofollow"
```

## 📊 Checklist de Verificação

- [ ] Build de dev executado com `build-dev.ps1`
- [ ] Deploy realizado para dev.guianoivas.com
- [ ] Verificado robots.txt em dev (deve bloquear)
- [ ] Verificado meta tag noindex no browser (F12)
- [ ] Solicitação de remoção enviada no Google Search Console
- [ ] Aguardar 48-72h para remoção completa do índice

## 📞 Próximos Passos (Opcional)

### Proteção Extra: HTTP Basic Authentication
Se quiser adicionar senha no ambiente dev:
- Configure via Azure Static Web Apps
- Ver: DEPLOY-SEO-BLOCKER.md seção "Proteção Adicional"

## ⏱️ Timeline Esperado

- **Imediato**: Novos crawls serão bloqueados
- **24-48h**: Google processa solicitação de remoção
- **1 semana**: URLs completamente removidas do índice
- **Contínuo**: Monitorar Google Search Console

## 🎯 Resultado Final

✅ **dev.guianoivas.com** → BLOQUEADO (noindex + robots.txt)  
✅ **guianoivas.com** → INDEXADO (permite crawlers)

---

**Criado em**: 02/03/2026  
**Status**: ✅ Implementação Completa
