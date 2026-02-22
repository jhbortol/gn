#!/bin/bash
# ============================================================
# DEPLOYMENT SCRIPT - Cache Busting & Versioning
# ============================================================
# 
# Este script automatiza o commit e push da implementação
# Use: bash deploy.sh
#

set -e

echo "════════════════════════════════════════════════"
echo "  🚀 DEPLOYMENT: Cache Busting & Versioning"
echo "════════════════════════════════════════════════"
echo ""

# Verificar se está em git repository
if [ ! -d ".git" ]; then
    echo "❌ Erro: Não está em um repositório git"
    exit 1
fi

# Mostrar branch atual
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo "📍 Branch atual: $CURRENT_BRANCH"

if [ "$CURRENT_BRANCH" != "main" ]; then
    echo "⚠️  Aviso: Você não está na branch 'main'"
    read -p "Deseja continuar? (s/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "📋 Arquivos a serem commitados:"
echo ""

# Contar arquivos
CREATED_COUNT=4
MODIFIED_COUNT=7
DOCS_COUNT=4

echo "  📁 Criados: $CREATED_COUNT"
echo "     - inject-version.js"
echo "     - src/app/core/version-check.service.ts"
echo "     - src/app/shared/update-notification.component.ts"
echo "     - src/app/core/cache-busting.interceptor.ts"
echo ""

echo "  📝 Modificados: $MODIFIED_COUNT"
echo "     - package.json"
echo "     - public/staticwebapp.config.json"
echo "     - src/index.html"
echo "     - src/app/app.ts"
echo "     - src/app/app.html"
echo "     - src/environments/environment.prod.ts"
echo "     - .github/workflows/azure-static-web-apps-prod-guia-noivas.yml"
echo ""

echo "  📚 Documentação: $DOCS_COUNT"
echo "     - README-VERSIONING.md"
echo "     - VERSIONING-IMPLEMENTATION.md"
echo "     - DEPLOYMENT-CHECKLIST.md"
echo "     - CACHE-BUSTING-GUIDE.md"
echo ""

# Verificar status
echo "📊 Status do git:"
git status --short
echo ""

# Pedir confirmação
read -p "Deseja fazer commit e push? (s/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "❌ Deploy cancelado"
    exit 1
fi

echo ""
echo "🔄 Adicionando arquivos..."
git add -A

echo "📝 Criando commit..."
git commit -m "feat: implement cache busting and version checking system

BREAKING: HTTP cache headers updated to no-store for index.html

Features:
- Add inject-version.js for automatic build version injection
- Add VersionCheckService for periodic update detection (5min interval)
- Add UpdateNotificationComponent for user notifications
- Add CacheBustingInterceptor for HTTP cache control
- Enhance HTTP cache headers (no-store for index.html, immutable for assets)
- Improve Azure deployment with BUILD_ID tracking via git commit hash

Files changed:
- New: inject-version.js (pós-build script)
- New: src/app/core/version-check.service.ts
- New: src/app/shared/update-notification.component.ts
- New: src/app/core/cache-busting.interceptor.ts
- Modified: package.json (versioning + scripts)
- Modified: public/staticwebapp.config.json (cache headers)
- Modified: src/index.html (cache detection script)
- Modified: src/app/app.ts (service injection)
- Modified: src/app/app.html (notification component)
- Modified: src/environments/environment.prod.ts (version config)
- Modified: .github/workflows/azure-static-web-apps-prod-guia-noivas.yml (BUILD_ID)
- Docs: 4 guides added

Benefits:
✓ Users always get latest version (no-store prevents caching)
✓ Automatic detection of updates every 5 minutes
✓ Non-intrusive toast notification for updates
✓ One-click cache busting with reload
✓ Production-ready versioning system
✓ Performance: assets cached 1 year with immutable flag
✓ Mobile-friendly and accessible

Resolves: Issue with users seeing old version despite cache clearing"

echo "✅ Commit criado com sucesso"
echo ""

echo "🚀 Fazendo push para GitHub..."
git push origin $CURRENT_BRANCH

echo ""
echo "════════════════════════════════════════════════"
echo "  ✅ DEPLOY COMPLETADO COM SUCESSO!"
echo "════════════════════════════════════════════════"
echo ""
echo "📊 Próximos passos:"
echo "  1. GitHub Actions iniciará automaticamente"
echo "  2. Build será executado com versioning"
echo "  3. Deploy para Azure Static Web Apps"
echo "  4. ETA: ~5-10 minutos"
echo ""
echo "✔️  Verifique o status em:"
echo "  https://github.com/jhbortol/gn/actions"
echo ""
echo "✔️  Após deploy, teste com:"
echo "  curl https://guianoivas.com/index.html | grep build-version"
echo ""
