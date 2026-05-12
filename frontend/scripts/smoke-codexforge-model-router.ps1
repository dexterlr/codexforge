param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge model router smoke ==="
Write-Host "Base URL: $BaseUrl"

$routerPath = "src\lib\codexforge\ai\model-router.ts"
$routePath = "src\app\api\codexforge\models\route.ts"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-FileExists $routerPath
Assert-FileExists $routePath
Assert-FileExists $allSmokePath

$router = Get-Content -Raw $routerPath
$route = Get-Content -Raw $routePath
$allSmoke = Get-Content -Raw $allSmokePath

Assert-Contains $router "CODEXFORGE_MODEL_ROUTER_VERSION" "router version"
Assert-Contains $router "gpt-5.2" "primary reasoning model"
Assert-Contains $router "gpt-5-mini" "fast model"
Assert-Contains $router "gpt-5-nano" "economy model"
Assert-Contains $router "planner" "planner profile"
Assert-Contains $router "self-upgrade" "self-upgrade profile"
Assert-Contains $router "safety-review" "safety review profile"
Assert-Contains $router "vision-inspection" "vision inspection profile"
Assert-Contains $router "computer-use-gated" "computer use gated profile"
Assert-Contains $router "explicit-session-consent" "explicit session consent gate"
Assert-Contains $router "blocked" "blocked model profile gate"
Assert-Contains $router "buildCodexForgeModelRouterSummary" "router summary builder"
Assert-Contains $route "buildCodexForgeModelRouterSummary" "model route uses router summary"
Assert-Contains $route "computerUse" "model route exposes computer use safety"
Assert-Contains $route "brokerExecution" "model route exposes broker blocked safety"
Assert-Contains $allSmoke "smoke-codexforge-model-router.ps1" "managed smoke includes model router"

$response = Invoke-RestMethod -Method Get -Uri "$BaseUrl/api/codexforge/models" -TimeoutSec 5
$json = $response | ConvertTo-Json -Depth 12

if ($response.ok -ne $true) {
  throw "[FAIL] model router GET route did not return ok true"
}

Assert-Contains $json "gpt-5.2" "model API includes primary model"
Assert-Contains $json "planner" "model API includes planner profile"
Assert-Contains $json "self-upgrade" "model API includes self-upgrade profile"
Assert-Contains $json "computer-use-gated" "model API includes gated computer use profile"
Assert-Contains $json "blocked-until-local-bridge-consent-and-audit" "model API preserves computer use blocked gate"

Write-Host "[OK] CodexForge model router smoke passed."
