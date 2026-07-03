param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Read-RequiredFile {
  param([string]$Path)
  Assert-FileExists $Path
  return Get-Content -Raw $Path
}

function Read-OptionalFile {
  param([string]$Path)
  if (Test-Path $Path) { return Get-Content -Raw $Path }
  return ""
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

function Assert-AnyContains {
  param([string[]]$Sources, [string]$Needle, [string]$Name)
  $joined = $Sources -join "`n"
  Assert-Contains $joined $Needle $Name
}

Write-Host ""
Write-Host "=== CodexForge Main Pages God Tier UX smoke ==="
Write-Host "Base URL: $BaseUrl"

$sharedDir = "src\lib\codexforge\main-pages-god-tier-ux"
$sharedComponentPath = Join-Path $sharedDir "components\MainPagesGodTierUx.tsx"
$sharedDataPath = Join-Path $sharedDir "main-pages-god-tier-ux-data.ts"
$sharedTypesPath = Join-Path $sharedDir "main-pages-god-tier-ux-types.ts"
$sharedIndexPath = Join-Path $sharedDir "index.ts"
$rootRoutePath = "src\app\page.tsx"
$rootPageClientPath = "src\app\page-client.tsx"
$operatorDashboardPath = "src\lib\codexforge\operator-home\components\OperatorHomeDashboard.tsx"
$operatorHeroPath = "src\lib\codexforge\operator-home\components\OperatorHomeHero.tsx"
$navigationShellPath = "src\lib\codexforge\navigation-shell\components\CodexForgeAppShell.tsx"
$navigationRegistryPath = "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypesPath = "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandPalettePath = "src\lib\codexforge\command-palette\components\CodexForgeCommandPalette.tsx"
$commandRegistryPath = "src\lib\codexforge\command-palette\command-registry.ts"
$cockpitPagePath = "src\app\codexforge-cockpit\page-client.tsx"
$unifiedCockpitPath = "src\lib\codexforge\unified-cockpit\components\UnifiedCockpitPanel.tsx"
$jarvisPanelPath = "src\lib\codexforge\jarvis-cockpit-visual-system\components\JarvisCockpitVisualPanel.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

$requiredFiles = @(
  $sharedComponentPath
  $sharedDataPath
  $sharedTypesPath
  $sharedIndexPath
  $rootRoutePath
  $rootPageClientPath
  $operatorDashboardPath
  $operatorHeroPath
  $navigationShellPath
  $navigationRegistryPath
  $navigationTypesPath
  $commandPalettePath
  $commandRegistryPath
  $cockpitPagePath
  $unifiedCockpitPath
  $allSmokePath
)

foreach ($path in $requiredFiles) {
  Assert-FileExists $path
}

if (Test-Path $jarvisPanelPath) {
  Assert-FileExists $jarvisPanelPath
}

$sharedSource = (Read-RequiredFile $sharedComponentPath) + "`n" + (Read-RequiredFile $sharedDataPath) + "`n" + (Read-RequiredFile $sharedTypesPath) + "`n" + (Read-RequiredFile $sharedIndexPath)
$rootSource = (Read-RequiredFile $rootRoutePath) + "`n" + (Read-RequiredFile $rootPageClientPath)
$operatorSource = (Read-RequiredFile $operatorDashboardPath) + "`n" + (Read-RequiredFile $operatorHeroPath)
$navigationSource = (Read-RequiredFile $navigationShellPath) + "`n" + (Read-RequiredFile $navigationRegistryPath) + "`n" + (Read-RequiredFile $navigationTypesPath)
$commandSource = (Read-RequiredFile $commandPalettePath) + "`n" + (Read-RequiredFile $commandRegistryPath)
$cockpitSource = (Read-RequiredFile $cockpitPagePath) + "`n" + (Read-RequiredFile $unifiedCockpitPath)
$jarvisSource = Read-OptionalFile $jarvisPanelPath
$allSmokeSource = Read-RequiredFile $allSmokePath

$mainPagePaths = @(
  "src\app\start\page-client.tsx"
  "src\app\onboarding\page-client.tsx"
  "src\app\first-task\page-client.tsx"
  "src\app\assist\page-client.tsx"
  "src\app\ai-providers\page-client.tsx"
  "src\app\ai-router\page-client.tsx"
  "src\app\local-machine\page-client.tsx"
  "src\app\local-creative\page-client.tsx"
  "src\app\video-projects\page-client.tsx"
  "src\app\storyboard\page-client.tsx"
  "src\app\video-jobs\page-client.tsx"
  "src\app\render-queue\page-client.tsx"
  "src\app\video-export\page-client.tsx"
  "src\app\video-review\page-client.tsx"
  "src\app\artifacts\review\page-client.tsx"
  "src\app\review-inbox\page-client.tsx"
  "src\app\workflow-results\page-client.tsx"
  "src\app\run-history\page-client.tsx"
  "src\app\result-history\page-client.tsx"
)

$mainPagesSource = ""
foreach ($path in $mainPagePaths) {
  if (Test-Path $path) {
    $mainPagesSource = $mainPagesSource + "`n" + (Get-Content -Raw $path)
    Write-Host "[PASS] optional upgraded page present: $path"
  } else {
    Write-Host "[SKIP] optional page missing: $path"
  }
}

foreach ($marker in @(
  "Main Pages God Tier UX Upgrade"
  "premium command center"
  "operator-grade navigation"
  "guarded video pipeline"
  "Jarvis-ready cockpit"
  "review-only UX upgrade"
  "no live provider calls"
  "no model calls"
  "no network egress"
  "no command execution from the app"
  "no browser storage writes"
)) {
  Assert-Contains $sharedSource $marker "shared UX marker $marker"
}

Assert-Contains ($rootSource + "`n" + $operatorSource + "`n" + $sharedSource) "Main Pages God Tier UX Upgrade" "root or shared home marker"
Assert-Contains ($navigationSource + "`n" + $operatorSource) "operator-grade navigation" "navigation or operator dashboard marker"
Assert-Contains ($commandSource + "`n" + $cockpitSource) "premium command center" "command or cockpit marker"
if ($jarvisSource.Length -gt 0) {
  Assert-Contains $jarvisSource "Jarvis-ready cockpit" "Jarvis cockpit marker"
} else {
  Write-Host "[SKIP] Jarvis cockpit surface missing"
}
Assert-Contains ($sharedSource + "`n" + $mainPagesSource) "guarded video pipeline" "guarded video pipeline marker"

foreach ($marker in @(
  "no live provider calls"
  "no model calls"
  "no network egress"
  "no command execution from the app"
  "no browser storage writes"
)) {
  Assert-Contains ($sharedSource + "`n" + $navigationSource + "`n" + $commandSource + "`n" + $cockpitSource + "`n" + $jarvisSource) $marker "safety marker $marker"
}

Assert-NotMatches $sharedSource "localStorage\s*\.\s*setItem|sessionStorage\s*\.\s*setItem|indexedDB\s*\.|document\s*\.\s*cookie\s*=" "no browser storage writes in newly created UX files"
Assert-Contains $commandRegistryPath "command-registry.ts" "command palette registry path still exists"
Assert-Contains $commandSource "buildCodexForgeCommands" "command palette registry still exists"
Assert-Contains $navigationRegistryPath "navigation-route-registry.ts" "navigation route registry path still exists"
Assert-Contains $navigationSource "buildCodexForgeNavigationRoutes" "navigation route registry still exists"
Assert-Contains $navigationSource "export type CodexForgeAppShellProps" "navigation shell types still exist"

foreach ($coverage in @(
  "smoke-codexforge-operator-home-dashboard.ps1"
  "smoke-codexforge-navigation-shell.ps1"
  "smoke-codexforge-command-palette.ps1"
  "smoke-codexforge-home-grade-unified-shell.ps1"
  "smoke-codexforge-checkpoint-docs.ps1"
  "Phase 2043 Provider Selection Policy Preview"
  "Phase 2793 Artifact Export Backend Wiring Completion"
)) {
  Assert-Contains $allSmokeSource $coverage "all-smoke keeps previous coverage $coverage"
}

Assert-Contains $allSmokeSource "smoke-codexforge-main-pages-god-tier-ux.ps1" "all-smoke includes Main Pages God Tier UX smoke"

Write-Host "[OK] CodexForge Main Pages God Tier UX smoke passed."
