# Build script for DEVELOPMENT environment
# This script ensures dev.guianoivas.com is NOT indexed by search engines

Write-Host "🔨 Building Guia Noivas - DEVELOPMENT Environment" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ Cleaned dist folder" -ForegroundColor Green
}
Write-Host ""

# Step 2: Build with development configuration
Write-Host "📦 Building application (development mode)..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build completed successfully" -ForegroundColor Green
Write-Host ""

# Step 3: Replace robots.txt with dev version
Write-Host "🤖 Replacing robots.txt with DEV version (blocks all crawlers)..." -ForegroundColor Yellow
$devRobots = "public/robots-dev.txt"
$distRobots = "dist/guia-noivas/browser/robots.txt"

if (Test-Path $devRobots) {
    Copy-Item $devRobots $distRobots -Force
    Write-Host "✓ robots.txt replaced - ALL SEARCH ENGINES BLOCKED" -ForegroundColor Green
    
    # Show content for verification
    Write-Host ""
    Write-Host "📄 Current robots.txt content:" -ForegroundColor Cyan
    Write-Host "--------------------------------" -ForegroundColor Gray
    Get-Content $distRobots | ForEach-Object { Write-Host $_ -ForegroundColor Gray }
    Write-Host "--------------------------------" -ForegroundColor Gray
} else {
    Write-Host "⚠️  Warning: robots-dev.txt not found!" -ForegroundColor Red
    Write-Host "   Search engines might still index this site!" -ForegroundColor Red
}
Write-Host ""

# Step 4: Verify environment settings
Write-Host "🔍 Verifying environment configuration..." -ForegroundColor Yellow
$envFile = "src/environments/environment.ts"
$envContent = Get-Content $envFile -Raw

if ($envContent -match 'production:\s*false') {
    Write-Host "✓ environment.production = false (noindex meta tag will be injected)" -ForegroundColor Green
} else {
    Write-Host "⚠️  WARNING: environment.production is not set to false!" -ForegroundColor Red
    Write-Host "   The noindex meta tag might not be injected!" -ForegroundColor Red
}
Write-Host ""

# Step 5: Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ DEVELOPMENT BUILD READY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "SEO Protection Applied:" -ForegroundColor Yellow
Write-Host "  1. robots.txt blocks all crawlers" -ForegroundColor White
Write-Host "  2. Meta tag 'noindex' will be injected at runtime" -ForegroundColor White
Write-Host "  3. Environment set to development mode" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Deploy the contents of 'dist/guia-noivas/browser' to dev.guianoivas.com" -ForegroundColor White
Write-Host "  2. Submit URL removal request in Google Search Console" -ForegroundColor White
Write-Host "  3. Verify with: curl https://dev.guianoivas.com/robots.txt" -ForegroundColor White
Write-Host ""
Write-Host "📖 See DEPLOY-SEO-BLOCKER.md for detailed instructions" -ForegroundColor Cyan
Write-Host ""
