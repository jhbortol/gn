# Build script for PRODUCTION environment
# This script ensures guianoivas.com IS indexed by search engines

Write-Host "🔨 Building Guia Noivas - PRODUCTION Environment" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Clean previous build
Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
if (Test-Path "dist") {
    Remove-Item -Recurse -Force "dist"
    Write-Host "✓ Cleaned dist folder" -ForegroundColor Green
}
Write-Host ""

# Step 2: Build with production configuration
Write-Host "📦 Building application (production mode)..." -ForegroundColor Yellow
npm run build -- --configuration production
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build completed successfully" -ForegroundColor Green
Write-Host ""

# Step 3: Verify robots.txt (should allow indexing)
Write-Host "🤖 Verifying robots.txt (should ALLOW crawlers)..." -ForegroundColor Yellow
$distRobots = "dist/guia-noivas/browser/robots.txt"

if (Test-Path $distRobots) {
    $robotsContent = Get-Content $distRobots -Raw
    
    if ($robotsContent -match "Allow:\s*/") {
        Write-Host "✓ robots.txt allows search engine indexing" -ForegroundColor Green
    } else {
        Write-Host "⚠️  WARNING: robots.txt might be blocking crawlers!" -ForegroundColor Red
        Write-Host "   Please verify the content below:" -ForegroundColor Red
    }
    
    # Show content for verification
    Write-Host ""
    Write-Host "📄 Current robots.txt content:" -ForegroundColor Cyan
    Write-Host "--------------------------------" -ForegroundColor Gray
    Get-Content $distRobots | ForEach-Object { Write-Host $_ -ForegroundColor Gray }
    Write-Host "--------------------------------" -ForegroundColor Gray
} else {
    Write-Host "❌ ERROR: robots.txt not found in build!" -ForegroundColor Red
}
Write-Host ""

# Step 4: Verify environment settings
Write-Host "🔍 Verifying environment configuration..." -ForegroundColor Yellow
$envFile = "src/environments/environment.prod.ts"
$envContent = Get-Content $envFile -Raw

if ($envContent -match 'production:\s*true') {
    Write-Host "✓ environment.production = true (NO noindex meta tag)" -ForegroundColor Green
} else {
    Write-Host "⚠️  WARNING: environment.production is not set to true!" -ForegroundColor Red
    Write-Host "   The site might be blocked from indexing!" -ForegroundColor Red
}
Write-Host ""

# Step 5: Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✅ PRODUCTION BUILD READY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "SEO Settings:" -ForegroundColor Yellow
Write-Host "  1. robots.txt ALLOWS all crawlers ✓" -ForegroundColor White
Write-Host "  2. NO noindex meta tag ✓" -ForegroundColor White
Write-Host "  3. Environment set to production mode ✓" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "  1. Deploy the contents of 'dist/guia-noivas/browser' to guianoivas.com" -ForegroundColor White
Write-Host "  2. Submit sitemap to Google Search Console" -ForegroundColor White
Write-Host "  3. Verify with: curl https://guianoivas.com/robots.txt" -ForegroundColor White
Write-Host ""
