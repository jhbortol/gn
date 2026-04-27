/**
 * GUIA PRÁTICO: Cache Busting & Versioning
 * 
 * Exemplos de uso, testes e troubleshooting
 */

## 📚 TABELA DE CONTEÚDOS
1. [Como Funciona](#como-funciona)
2. [Testes Manuais](#testes-manuais)
3. [Verificação em Produção](#verificação-em-produção)
4. [Troubleshooting](#troubleshooting)
5. [Exemplos de Comportamento](#exemplos-de-comportamento)

---

## Como Funciona

### 1️⃣ Injeção de Versão (Build Time)

```javascript
// inject-version.js rodado após build
// 
// Entrada: dist/guia-noivas/browser/index.html
// Saída: index.html com meta tag + script injetos

// Antes:
// </head>
// </html>

// Depois:
// <!-- Build Version Info - Auto-injected by inject-version.js -->
// <meta name="build-version" content="3243d4b-1771787663442" />
// <meta name="build-timestamp" content="2026-02-22T19:14:23.442Z" />
// <script>
//   window.__BUILD_VERSION__ = '3243d4b-1771787663442';
//   window.__BUILD_TIMESTAMP__ = '2026-02-22T19:14:23.442Z';
//   sessionStorage.setItem('_buildVersion', '3243d4b-1771787663442');
// </script>
// </head>
// </html>
```

### 2️⃣ Verificação Periódica (Client Runtime)

```typescript
// VersionCheckService (src/app/core/version-check.service.ts)
// 
// Timeline:
// ├─ Page Load
// ├─ 3 segundos depois: checkForUpdates() [1ª verificação]
// ├─ 5 minutos depois: checkForUpdates() [2ª verificação]
// ├─ 5 minutos depois: checkForUpdates() [3ª verificação]
// └─ E assim por diante...
//
// A cada verificação:
// 1. GET /index.html (com Cache-Control: no-store)
// 2. Extract <meta name="build-version" content="..."/>
// 3. Compare com window.__BUILD_VERSION__
// 4. Se diferente: updateAvailable.set(true)
```

### 3️⃣ Notificação de Atualização (UI)

```typescript
// UpdateNotificationComponent aparece quando:
// updateAvailable() === true
//
// Toast mostra:
// ┌─────────────────────────────────────────────────┐
// │ 🔄 Nova versão disponível                        │
// │ Recarregue para atualizar para a versão mais    │
// │ recente.                                        │
// │                                                 │
// │ [Atualizar]  [✕]                               │
// └─────────────────────────────────────────────────┘
//
// - Atualizar: chama reloadWithCacheBust()
// - ✕: localStorage['_updateNotificationDismissed']
```

### 4️⃣ Cache Busting no Reload

```javascript
// reloadWithCacheBust() faz:
//
// const nonce = Math.random().toString(36).substring(2, 15)
// // Exemplo: "8a4b2c9d1e5f7g"
//
// window.location.href = `/?cache-bust=8a4b2c9d1e5f7g`
//
// Isso força:
// ├─ Browser a fazer novo GET para /index.html?cache-bust=...
// ├─ HTTP header: Cache-Control: no-store
// ├─ CDN a revalidar (s-maxage=0)
// ├─ Assets (main.*.js, styles.*.css) a serem revalidados
// └─ Sessão com novo __BUILD_VERSION__
```

---

## Testes Manuais

### ✅ Teste 1: Verificar Injeção

**O que testar:** Script rodou e injetou versão

```bash
cd c:\fontes\guia-noivas-new
npm run build:prod

# Procure por:
# ✅ Version injected successfully!
#    Build ID: 3243d4b-1771787663442
#    Timestamp: 2026-02-22T19:14:23.442Z

# Depois verifique arquivo:
grep "build-version" dist/guia-noivas/browser/index.html
# Output: <meta name="build-version" content="3243d4b-1771787663442" />
```

### ✅ Teste 2: Verificar Headers HTTP

**O que testar:** Cache headers estão corretos em produção

```bash
# Para index.html (deve sempre revalidar)
curl -I https://guianoivas.com/index.html

# Esperado:
# Cache-Control: public, max-age=0, s-maxage=0, must-revalidate, no-store
# Pragma: no-cache
# Expires: 0

# Para assets com hash (podem ser cacheados por 1 ano)
curl -I https://guianoivas.com/main.3243d4b1.js

# Esperado:
# Cache-Control: public, max-age=31536000, s-maxage=31536000, immutable
```

### ✅ Teste 3: Verificar LocalStorage

**O que testar:** Valores de versão estão sendo armazenados

```javascript
// No console do browser (F12):

// Versão atual no build
window.__BUILD_VERSION__
// Output: "3243d4b-1771787663442"

// Versão armazenada na sessão
sessionStorage.getItem('_buildVersion')
// Output: "3243d4b-1771787663442"

// Versão armazenada permanentemente
localStorage.getItem('_appVersion')
// Output: "3243d4b-1771787663442"

// Timestamp da última notificação dismissida
localStorage.getItem('_updateNotificationDismissed')
// Output: null ou timestamp (ex: "1708615263442")
```

### ✅ Teste 4: Simular Atualização

**O que testar:** Notificação aparece quando versão muda

```javascript
// No console do browser:

// 1. Simule versão antiga
window.__BUILD_VERSION__ = 'old-version-12345'

// 2. Force check imediato
window.versionCheck.checkForUpdates()

// 3. Aguarde resposta (2-3 segundos)

// 4. Verifique signal
window.versionCheck.updateAvailable()
// Output: true (se versão nova foi detectada)

// 5. Notificação deve aparecer no canto inferior direito
```

### ✅ Teste 5: Cache Busting

**O que testar:** Reload com nonce funciona

```javascript
// No console do browser:

// 1. Chame método de cache bust
window.versionCheck.reloadWithCacheBust()

// Resultado: Página recarrega com ?cache-bust=random-nonce
// URL fica: https://guianoivas.com/?cache-bust=8a4b2c9d1e5f7g
```

---

## Verificação em Produção

### 🔍 Checklist Pós-Deploy

Após fazer push para main e GitHub Actions completar:

```bash
# 1. Verificar versão foi injetada
curl https://guianoivas.com/index.html 2>/dev/null | grep "build-version" | head -1
# Esperado: <meta name="build-version" content="abc123d-1771787663442" />

# 2. Verificar cache headers para HTML
curl -I https://guianoivas.com/index.html
# Esperado: Cache-Control: public, max-age=0, s-maxage=0, must-revalidate, no-store

# 3. Verificar cache headers para assets
curl -I https://guianoivas.com/main.*.js | head -20
# Esperado: Cache-Control: public, max-age=31536000, s-maxage=31536000, immutable

# 4. Verificar sitemap (deve estar atualizado)
curl -I https://guianoivas.com/sitemap.xml
# Esperado: Cache-Control: public, max-age=3600, s-maxage=86400
```

### 📊 Monitoramento

```javascript
// Adicione ao seu Analytics (GA/GTM):

// Event: version_check
// Properties:
// - current_version: window.__BUILD_VERSION__
// - check_timestamp: new Date().toISOString()
// - update_available: boolean

// Event: version_updated
// Properties:
// - old_version: localStorage.getItem('_appVersion')
// - new_version: window.__BUILD_VERSION__
// - update_method: 'notification_click'
```

---

## Troubleshooting

### ❌ Problema: Notificação não aparece

**Causa provável:** VersionCheckService não foi injetado

**Solução:**
```typescript
// Em src/app/app.ts, verifique:
import { VersionCheckService } from './core/version-check.service';

// E no constructor:
private versionCheck = inject(VersionCheckService);
```

**Outra causa:** Browser blocando requisições

```javascript
// No console:
window.versionCheck.checkForUpdates()
// Se mostrar erro CORS ou timeout, é problema de rede
```

### ❌ Problema: Build falha ao rodar inject-version.js

**Causa provável:** Arquivo não encontrado ou git não disponível

**Solução:**
```bash
# Verifique se dist existe:
ls -la dist/guia-noivas/browser/index.html

# Se não existir:
npm run build:prod
# Isto deve criar a pasta

# Se problema persistir:
node inject-version.js
# Rodará manualmente com debug
```

### ❌ Problema: Cache headers não estão sendo aplicados

**Causa provável:** staticwebapp.config.json não foi atualizado

**Solução:**
```bash
# Verifique arquivo:
cat public/staticwebapp.config.json | grep -A5 "index.html"

# Deve conter:
# "Cache-Control": "public, max-age=0, s-maxage=0, must-revalidate, no-store"
```

### ❌ Problema: UpdateNotificationComponent causa erro TypeScript

**Causa provável:** Arquivo criado no local errado

**Solução:**
```bash
# Verifique localização:
ls -la src/app/shared/update-notification.component.ts

# Se não existir, recrie:
# Copie o conteúdo de docs/update-notification.component.ts
# Para: src/app/shared/update-notification.component.ts
```

---

## Exemplos de Comportamento

### 📅 Cenário 1: Deploy às 14:00

```
14:00 - Deploy ao Azure
       ├─ npm run prerender:prod
       ├─ node inject-version.js
       └─ BUILD_ID: "abc123d-1708615263442"

14:05 - User A acessa site
       ├─ Recebe novo index.html (não cacheado)
       ├─ window.__BUILD_VERSION__ = "abc123d-1708615263442"
       └─ localStorage['_appVersion'] = "abc123d-1708615263442"

14:08 - User A continua navegando
       ├─ 3 segundos após load: checkForUpdates() 1ª vez
       ├─ Encontra mesma versão: ✅ Versão atual
       └─ Próxima check em 5 minutos

14:13 - User A continua navegando
       ├─ checkForUpdates() 2ª vez (5 min depois)
       ├─ Encontra mesma versão: ✅ Versão atual
       └─ Próxima check em 5 minutos

14:14 - Deploy 2 ao Azure (hotfix)
       └─ BUILD_ID: "def456e-1708615456789"

14:18 - User A continua navegando
       ├─ checkForUpdates() 3ª vez
       ├─ GET /index.html → detecta novo BUILD_ID
       ├─ updateAvailable.set(true)
       ├─ Toast notification aparece! 🔔
       └─ User tem opção: Atualizar ou Descartar

14:19 - User A clica "Atualizar"
       ├─ reloadWithCacheBust() executa
       ├─ window.location.href = "/?cache-bust=8a4b2c..."
       ├─ Nova requisição sem cache
       ├─ Carrega novo BUILD_ID
       └─ ✅ User tem versão 100% atual
```

### 📅 Cenário 2: User com cache agressivo de ISP

```
14:00 - Deploy novo (BUILD_ID: "abc123d-...")

14:05 - User B acessa site pela 1ª vez
       ├─ ISP/Proxy cacheia resposta de index.html
       ├─ Browser recebe index.html com novo BUILD_ID
       └─ ✅ Versão correta recebida

14:06 - User B recarrega página (F5)
       ├─ Browser não tem index.html no cache
       ├─ Header: Cache-Control: no-store
       ├─ Proxy/ISP revalida
       ├─ Recebe nova versão
       └─ ✅ Versão correta mesmo com proxy

14:07 - User B fecha browser e volta depois (Ctrl+Shift+Del não feito)
       ├─ Browser tenta carregar index.html do cache
       ├─ Mas Cache-Control: no-store desabilita isso
       ├─ Nova requisição é feita
       └─ ✅ Nova versão carregada automaticamente
```

### 📅 Cenário 3: User com internet lenta (mobile)

```
14:00 - Deploy

14:15 - User C em 4G abre site
       ├─ Internet lenta, download de assets demora
       ├─ index.html carrega rápido (< 50KB)
       ├─ Browser não cacheia index.html
       └─ ✅ Versão correta mesmo com lentidão

14:20 - checkForUpdates() roda
       ├─ GET /index.html com timeout de 5 segundos
       ├─ Internet lenta: pode timeout
       ├─ catchError() retorna null
       ├─ Tenta novamente em 5 minutos
       └─ ✅ Sem travamento da UI
```

---

## 🎯 RESUMO EXECUTIVO

| Problema Original | Solução Implementada | Status |
|---|---|---|
| User vê versão antiga mesmo após Ctrl+Shift+Del | Cache-Control: no-store para HTML | ✅ |
| Index.html cacheado por CDN | s-maxage=0 na config | ✅ |
| User não sabe quando atualizar | Toast notification automático | ✅ |
| Mudança de versão não detectada | VersionCheckService a cada 5min | ✅ |
| User obrigado a atualizar | Notificação com opção dismiss | ✅ |
| Assets velhos carregados | outputHashing: all + 1 ano cache | ✅ (existia) |
| Sem feedback de versão | `window.__BUILD_VERSION__` global | ✅ |

---

**Versão deste documento:** 1.0.0  
**Última atualização:** 2026-02-22  
**Status:** ✅ IMPLEMENTAÇÃO COMPLETA
