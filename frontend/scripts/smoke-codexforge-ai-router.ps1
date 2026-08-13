param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name marker: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )
  if ($Haystack.Contains($Needle)) { throw "[FAIL] Forbidden $Name marker: $Needle" }
  Write-Host "[PASS] no $Name"
}

function Assert-Count {
  param(
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][int]$Expected,
    [Parameter(Mandatory = $true)][string]$Name
  )
  $count = ([regex]::Matches($Haystack, [regex]::Escape($Needle))).Count
  if ($count -ne $Expected) { throw "[FAIL] Expected $Expected $Name occurrence(s), found $count" }
  Write-Host "[PASS] $Name count $Expected"
}

Write-Host "=== CodexForge AI Router smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\ai-router"
$componentDir = Join-Path $domainDir "components"
$routePath = "src\app\ai-router\page.tsx"
$clientPath = "src\app\ai-router\page-client.tsx"
$aiPagePath = "src\app\ai\page.tsx"
$executionSuitePath = "scripts\smoke-codexforge-execution-suite.ps1"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

if (-not (Test-Path $domainDir -PathType Container)) { throw "[FAIL] Missing ai-router domain directory" }
Write-Host "[PASS] ai-router domain directory exists"

$modules = @(
  "ai-router-types.ts",
  "ai-provider-profile.ts",
  "ai-model-catalog.ts",
  "ai-subscription-tier.ts",
  "ai-task-classifier.ts",
  "ai-token-budget.ts",
  "ai-routing-policy.ts",
  "ai-route-recommendation.ts",
  "ai-usage-ledger.ts",
  "ai-router-summary.ts",
  "index.ts"
)

foreach ($module in $modules) {
  Assert-FileExists (Join-Path $domainDir $module)
}

$components = @(
  "AiRouterCockpit.tsx",
  "AiProviderProfilePanel.tsx",
  "AiModelCatalogPanel.tsx",
  "AiSubscriptionTierPanel.tsx",
  "AiRoutingPolicyPanel.tsx",
  "AiTokenBudgetPanel.tsx",
  "AiRouteRecommendationPanel.tsx",
  "AiUsageLedgerPanel.tsx",
  "AiRouterSafetyNotice.tsx"
)

foreach ($component in $components) {
  Assert-FileExists (Join-Path $componentDir $component)
}

Assert-FileExists $routePath
Assert-FileExists $clientPath

$domainText = (Get-ChildItem -Path $domainDir -File -Filter "*.ts" | Get-Content -Raw) -join "`n"
$componentText = (Get-ChildItem -Path $componentDir -File -Filter "*.tsx" | Get-Content -Raw) -join "`n"
$routeText = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $clientPath)
$aiPageText = Get-Content -Raw $aiPagePath
$executionSuite = Get-Content -Raw $executionSuitePath
$allSmoke = Get-Content -Raw $allSmokePath
$allRouterText = $domainText + "`n" + $componentText + "`n" + $routeText + "`n" + $aiPageText

$exports = @(
  "buildAiProviderProfile",
  "buildDefaultAiProviderProfiles",
  "buildAiModelCatalog",
  "buildAiSubscriptionTier",
  "classifyAiTask",
  "buildAiTokenBudget",
  "buildAiRoutingPolicy",
  "buildAiRouteRecommendation",
  "selectBestAiRoute",
  "buildAiUsageLedger"
)

foreach ($export in $exports) {
  Assert-Contains $domainText $export "export $export"
}

Assert-Contains $componentText "No API keys stored" "UI no API keys stored"
Assert-Contains $componentText "Estimates are approximate" "UI approximate estimates"
Assert-Contains $componentText "Local-first" "UI local-first"
Assert-Contains $componentText "Subscription-efficient" "UI subscription-efficient"
Assert-Contains $componentText "Fallback route" "UI fallback route"
Assert-Contains $routeText "AiRouterCockpit" "/ai-router imports/renders AiRouterCockpit"
Assert-Contains $componentText "Route recommendation" "/ai-router retains route recommendation guidance"
Assert-Contains $aiPageText 'redirect("/jarvis")' "/ai redirects to canonical Jarvis"
Assert-NotContains $aiPageText "AiRouterCockpit" "/ai mounts no competing AI Router cockpit"

if ($allRouterText -match "sk-[A-Za-z0-9]{20,}") {
  throw "[FAIL] Forbidden hardcoded API key-like token"
}
Write-Host "[PASS] no hardcoded API key-like token"
Assert-NotContains $allRouterText "process.env" "process.env value printed in UI"
Assert-NotContains $allRouterText "localStorage.setItem(`"api" "localStorage API key storage"
Assert-NotContains $allRouterText "localStorage.setItem('api" "localStorage API key storage"
Assert-NotContains $domainText "fetch(" "external network dependency in deterministic ai-router domain"
Assert-NotContains $domainText "Math.random" "Math.random"
Assert-NotContains $domainText "Date.now" "Date.now deterministic IDs/layout"
Assert-NotContains $allRouterText "d3-force" "d3-force dependency"
Assert-NotContains $allRouterText "vector database" "vector database dependency"
Assert-NotContains $allRouterText "???" "mojibake"
Assert-Count $executionSuite "smoke-codexforge-ai-router.ps1" 1 "managed AI Router smoke"
Assert-Count $allSmoke "smoke-codexforge-execution-suite.ps1" 1 "all-smoke execution suite"

Write-Host "[OK] CodexForge AI Router smoke passed."
