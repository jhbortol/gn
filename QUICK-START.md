## 🚀 QUICK START - Cache Busting Implementation

### What's New
✅ **Cache Busting System** - Garantir que usuários sempre veem a versão mais recente  
✅ **Automatic Versioning** - Cada build recebe ID único (git hash + timestamp)  
✅ **Update Detection** - Verifica a cada 5 minutos se há nova versão  
✅ **User Notification** - Toast inteligente quando atualização disponível  
✅ **HTTP Headers** - index.html com `no-store` (nunca cacheia)  

---

### 📁 Files Created (4)
```
inject-version.js                           (Post-build script)
src/app/core/version-check.service.ts       (Version detection)
src/app/shared/update-notification.component.ts  (UI notification)
src/app/core/cache-busting.interceptor.ts   (HTTP interceptor - bonus)
```

### 📝 Files Modified (7)
```
package.json                                (version + scripts)
public/staticwebapp.config.json             (cache headers)
src/index.html                              (cache detection)
src/app/app.ts                              (service injection)
src/app/app.html                            (notification component)
src/environments/environment.prod.ts        (version config)
.github/workflows/azure-static-web-apps-prod-guia-noivas.yml  (BUILD_ID)
```

---

### 🧪 Test It
```bash
# Build locally
npm run build:prod

# Expected output
# ✅ Version injected successfully!
#    Build ID: abc123d-1771788252623

# Verify injection
grep "build-version" dist/guia-noivas/browser/index.html
# Output: <meta name="build-version" content="abc123d-1771788252623"/>
```

---

### 🚀 Deploy
```bash
git add -A
git commit -m "feat: implement cache busting and version checking system"
git push origin main

# GitHub Actions will:
# 1. Generate BUILD_ID (commit hash + timestamp)
# 2. Run npm run prerender:prod
# 3. Execute node inject-version.js
# 4. Deploy to Azure with cache headers
# ETA: ~5-10 minutes
```

---

### 🔍 Verify After Deploy
```bash
# Check version injected
curl https://guianoivas.com/index.html | grep "build-version" | head -1

# Check cache headers for HTML (should revalidate always)
curl -I https://guianoivas.com/index.html | grep Cache-Control
# Expected: Cache-Control: public, max-age=0, s-maxage=0, must-revalidate, no-store

# Check cache headers for assets (should cache 1 year)
curl -I https://guianoivas.com/main.*.js | grep Cache-Control
# Expected: Cache-Control: public, max-age=31536000, s-maxage=31536000, immutable
```

---

### 📱 How It Works (User View)
1. User visits guianoivas.com
2. HTML always fresh (no-store header)
3. App loads with version info
4. Every 5 minutes: checks for new version
5. If found: toast notification appears
6. User clicks "Update" → page reloads with cache bust
7. New version fully loaded ✅

---

### ⚙️ Configuration

**Change check interval** (default: 5 min)
- File: `src/app/core/version-check.service.ts` line ~51
- Change: `interval(5 * 60 * 1000)` → `interval(2 * 60 * 1000)` for 2 min

**Change dismiss duration** (default: 24h)
- File: `src/app/core/version-check.service.ts` line ~77  
- Change: `24 * 60 * 60 * 1000` → `1 * 60 * 60 * 1000` for 1 hour

---

### 📚 Full Documentation
- **README-VERSIONING.md** - Executive summary & deployment
- **VERSIONING-IMPLEMENTATION.md** - Technical details & flow
- **DEPLOYMENT-CHECKLIST.md** - Pre-deploy checklist
- **CACHE-BUSTING-GUIDE.md** - Practical guide with examples
- **IMPLEMENTATION-SUMMARY.txt** - Detailed overview

---

### 🆘 Troubleshooting

**Build fails: inject-version.js not found**
```
Solution: npm run build:prod creates dist/ automatically
If it fails: node inject-version.js
```

**Notification doesn't appear**
```
Solution 1: Check DevTools console (F12) for errors
Solution 2: Run window.versionCheck.checkForUpdates() in console
Solution 3: Wait 5+ minutes for periodic check
```

**Cache headers not applied**
```
Solution: Clear browser cache (Ctrl+Shift+Delete)
Or: Wait 15 min for CDN to revalidate
```

---

### ✅ Checklist
- [x] 4 new files created
- [x] 7 files modified
- [x] Build tested locally
- [x] Version injection verified
- [x] TypeScript compilation OK
- [x] Documentation complete
- [ ] Ready to commit & push
- [ ] Deploy to production

---

### 🎯 Key Metrics
| Aspect | Before | After |
|--------|--------|-------|
| HTML cache | Possible | ✅ Never (no-store) |
| Update detection | Manual | ✅ Automatic (5 min) |
| User notification | None | ✅ Toast UI |
| Version tracking | No | ✅ Build ID |
| Assets cache | 1 year | ✅ 1 year (immutable) |

---

**Status: PRODUCTION READY ✅**

Next: `git push origin main` → Done!
