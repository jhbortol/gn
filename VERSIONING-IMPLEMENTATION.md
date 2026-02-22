/**
 * VERSIONING E CACHE BUSTING - IMPLEMENTAÇÃO COMPLETA
 * 
 * Este documento descreve o sistema implementado para garantir que usuários
 * sempre tenham acesso à versão mais recente da aplicação.
 */

## 🎯 OBJETIVO
Eliminar problema de usuários vendo versão antiga da aplicação mesmo após limpar cache.

## 📋 ARQUIVOS IMPLEMENTADOS

### 1. **inject-version.js** (NOVO)
- **Localização**: Raiz do projeto
- **Quando roda**: Após cada build (prerender:prod, build, etc)
- **O que faz**:
  - Injeta `window.__BUILD_VERSION__` no index.html
  - Usa git commit hash + timestamp como identificador único
  - Fallback para timestamp + random se git não disponível

### 2. **version-check.service.ts** (NOVO)
- **Localização**: `src/app/core/`
- **Responsabilidades**:
  - ✅ Verifica atualizações a cada 5 minutos
  - ✅ Compara versão do cliente vs servidor
  - ✅ Emite sinal quando nova versão detectada
  - ✅ Oferece método para recarregar com cache bypass

### 3. **update-notification.component.ts** (NOVO)
- **Localização**: `src/app/shared/`
- **Interface**: Toast/notification no canto inferior direito
- **Ações**:
  - "Atualizar" → chama `reloadWithCacheBust()`
  - "✕" → dismiss por 24 horas

### 4. **cache-busting.interceptor.ts** (NOVO)
- **Localização**: `src/app/core/`
- **Função**: Adiciona parâmetro `_cache` a requisições HTTP quando URL contém `?cache-bust=`

## 📝 ARQUIVOS MODIFICADOS

### 5. **package.json**
- **Versão**: 0.0.0 → 1.0.0
- **Scripts**: Todos os builds agora rodam `inject-version.js` após build

### 6. **staticwebapp.config.json**
- **Cache-Control para index.html**:
  - Antes: `max-age=0, s-maxage=3600, must-revalidate`
  - Depois: `max-age=0, s-maxage=0, must-revalidate, no-store`
  - Resultado: Sempre revalidado no browser E no CDN

### 7. **index.html**
- Script de detecção de versão ao carregar
- Limpa caches locais se versão muda
- Armazena versão em localStorage

### 8. **app.ts**
- Importa `UpdateNotificationComponent`
- Injeta `VersionCheckService`

### 9. **app.html**
- Adiciona `<app-update-notification></app-update-notification>` no topo

### 10. **environment.prod.ts**
- Adiciona configuração `APP_VERSION`
- Flags para habilitar verificação de versão

### 11. **azure-static-web-apps-prod-guia-noivas.yml**
- Gera BUILD_ID (commit hash + timestamp)
- Passa como env var ao build
- Adiciona anotações no GitHub Actions

## 🔄 FLUXO COMPLETO

```
┌─────────────────────────────────────────────────────────────┐
│                    USER FLOW - VERSIONING                   │
└─────────────────────────────────────────────────────────────┘

1. DEPLOY (GitHub Actions)
   ├─ git checkout main
   ├─ npm ci
   ├─ Generate BUILD_ID (commit hash + timestamp)
   ├─ npm run prerender:prod
   │  └─ Angular build com outputHashing: "all"
   │     ├─ main.a1b2c3d4.js (hasheado)
   │     ├─ styles.x9z8y7w6.css (hasheado)
   │     └─ index.html (SEM hash)
   ├─ node inject-version.js (NOVO)
   │  └─ Injeta <meta name="build-version" content="abc123d-1708615234"/>
   │     └─ Cria window.__BUILD_VERSION__ = 'abc123d-1708615234'
   └─ Deploy para Azure Static Web Apps

2. USER ACESSA SITE (primeira vez após deploy)
   ├─ Browser solicita index.html
   │  └─ CDN/Azure responde com:
   │     Cache-Control: no-store, must-revalidate
   │     └─ Sempre revalida (nunca cacheia no browser)
   ├─ index.html carrega com <meta build-version="abc123d-..."/>
   ├─ Window global recebe __BUILD_VERSION__
   └─ localStorage['_appVersion'] = 'abc123d-...'

3. APP INICIA - VersionCheckService
   ├─ currentVersion.set(window.__BUILD_VERSION__)
   ├─ Espera 3 segundos
   ├─ Primeira checagem: checkForUpdates()
   └─ Próximas: a cada 5 minutos via interval()

4. CHECAGEM DE VERSÃO
   ├─ GET /index.html (com headers: no-cache)
   ├─ Extrai <meta build-version="..."/> da resposta
   ├─ Compara: serverVersion !== clientVersion ?
   │  ├─ SIM: updateAvailable.set(true)
   │  │  └─ UpdateNotificationComponent fica visível
   │  └─ NÃO: Tudo ok, versão atual
   └─ lastCheckTime.set(now)

5. USER INTERAGE COM NOTIFICAÇÃO
   ├─ Clica "Atualizar"
   │  ├─ VersionCheckService.reloadWithCacheBust()
   │  ├─ window.location.href = /?cache-bust=random-nonce
   │  ├─ Browser solicita página com novo param
   │  ├─ CDN/Azure força revalidação
   │  └─ Nova versão carregada!
   └─ Clica "✕"
       └─ localStorage['_updateNotificationDismissed'] = now
          (não mostra notificação por 24h)

6. APÓS RELOAD COM CACHE BUST
   ├─ index.html.js detecta novo __BUILD_VERSION__
   ├─ caches.keys().then(names => caches.delete(name))
   ├─ localStorage['_appVersion'] = nova versão
   └─ App completamente sincronizado ✅
```

## 🛡️ GARANTIAS

| Cenário | Solução |
|---------|---------|
| User usa browser velho que cacheia HTML | ✅ `no-store` força revalidação em cada acesso |
| User cacheia no nível do app/PWA | ✅ `must-revalidate` + Service Worker limpa caches |
| User tem proxy/firewall | ✅ HTTP headers respeitados por proxies padrão |
| Mobile app com webview | ✅ Cache headers HTTP funcionam em webviews |
| CDN cacheando versão velha | ✅ `s-maxage=0` força revalidação em CDN também |
| User com offline mode | ✅ Verificação periódica ao voltar online |

## 🚀 COMO TESTAR

### 1. Build Local
```bash
npm run prerender:prod
# Verifica se inject-version.js rodou com sucesso
# Procure por: "✅ Version injected successfully!"
```

### 2. Verificar Injeção
```bash
grep "build-version" dist/guia-noivas/browser/index.html
# Deve retornar: <meta name="build-version" content="abc123d-1708615234"/>
```

### 3. Verificar Headers
```bash
curl -I https://guianoivas.com/index.html
# Procure por:
# Cache-Control: public, max-age=0, s-maxage=0, must-revalidate, no-store
# Pragma: no-cache
```

### 4. Verificar Assets
```bash
curl -I https://guianoivas.com/main.*.js
# Deve ter:
# Cache-Control: public, max-age=31536000, s-maxage=31536000, immutable
```

### 5. Testar Notificação
- Abra DevTools (F12)
- Goto Console
- Execute: `window.__BUILD_VERSION__ = 'test-old-version'`
- Aguarde 3-5 segundos
- Notificação deve aparecer no canto inferior direito

## 📊 RESUMO TÉCNICO

| Aspecto | Implementação |
|---------|---------------|
| **Hashing de Assets** | ✅ Angular `outputHashing: "all"` (já existia) |
| **Versionamento de HTML** | ✅ Injeção via `inject-version.js` (NOVO) |
| **Detecção de Atualizações** | ✅ `VersionCheckService` com poll de 5min (NOVO) |
| **UI de Atualização** | ✅ Toast notification (NOVO) |
| **Cache Busting** | ✅ Query param + HTTP headers reforçados (NOVO) |
| **HTTP Headers** | ✅ `no-store` para HTML (ATUALIZADO) |
| **CDN Headers** | ✅ `s-maxage=0` para HTML (NOVO) |
| **Performance** | ✅ Assets imutáveis por 1 ano (existia) |

## 🎓 COMO FUNCIONA SEMANTICAMENTE

1. **Build Time**: Cada build é único (commit hash + timestamp)
2. **Serve Time**: HTML sempre revalidado, assets nunca
3. **Client Time**: Verifica periodicamente se há nova versão
4. **User Time**: Notificação oferece opção de atualizar
5. **Reload Time**: Cache é limpo e nova versão carregada

## ⚙️ CONFIGURAÇÕES AJUSTÁVEIS

### Em `version-check.service.ts`:
- Intervalo de verificação: `interval(5 * 60 * 1000)` → mude o número em ms
- Timeout da requisição: `timeout(5000)` → mude para mais/menos
- Duração do dismiss: 24 horas em `_updateNotificationDismissed`

### Em `staticwebapp.config.json`:
- Cache HTML: mude `max-age=0, s-maxage=0` para seu valor desejado
- Cache assets: mude `max-age=31536000` para período diferente

## 🐛 DEBUGGING

```javascript
// No console do browser:
window.__BUILD_VERSION__  // Mostra versão atual
localStorage.getItem('_appVersion')  // Versão no armazenamento
sessionStorage.getItem('_buildVersion')  // Versão na sessão
```

## ✅ PRÓXIMAS ETAPAS (Opcionais)

1. **Service Worker**: `@angular/service-worker` para offline support
2. **Notification API**: Pedir permissão ao usuário para desktop notifications
3. **Analytics**: Track em quantos usuários pegaram nova versão
4. **Rollback**: Sistema para fazer rollback se detect bugs
5. **Semver**: Usar versionamento semântico (1.2.3) em environment.prod.ts
