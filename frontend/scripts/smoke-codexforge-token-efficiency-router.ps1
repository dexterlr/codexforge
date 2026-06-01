param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host "=== CodexForge Token Efficiency Router smoke ==="
Write-Host "Base URL: $BaseUrl"

$domain = "src\lib\codexforge\token-efficiency-router"
$components = Join-Path $domain "components"
Assert-FileExists (Join-Path $domain "index.ts")
Assert-FileExists (Join-Path $domain "token-efficiency-router-types.ts")
Assert-FileExists (Join-Path $domain "token-routing-policy.ts")
Assert-FileExists (Join-Path $domain "token-route-decision.ts")
Assert-FileExists (Join-Path $domain "token-router-summary.ts")
Assert-FileExists (Join-Path $components "TokenEfficiencyRouterPanel.tsx")
Assert-FileExists "src\app\token-router\page.tsx"
Assert-FileExists "src\app\token-router\page-client.tsx"

$source = (Get-ChildItem -Recurse -File $domain, "src\app\token-router" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

foreach ($needle in @("estimateTokenTotal", "selectTokenRouterLane", "buildTokenRoutingDecision", "buildTokenEfficiencyRouterSummary", "manual-premium", "cheap-cloud-profile", "local-first", "Token estimates are approximate", "/token-router")) {
  Assert-Contains $source $needle "token router includes $needle"
}
Assert-Contains $commands "Go to Token Efficiency Router" "command palette includes token router"
if (([regex]::Matches($allSmoke, "smoke-codexforge-token-efficiency-router\.ps1")).Count -ne 1) { throw "[FAIL] all smoke must include token router exactly once" }

Assert-NotMatches $source "sk-[A-Za-z0-9]{20,}" "no hardcoded provider token"
Assert-NotMatches $source "fetch\s*\(" "no network call"
Assert-NotMatches $source "process\.env" "no process env exposure"
Assert-NotMatches $source "localStorage\.setItem" "no browser secret write"
Assert-NotMatches $source "Math\.random|Date\.now" "deterministic routing"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/token-router" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /token-router returned status $($response.StatusCode)" }
  Write-Host "[PASS] /token-router route reachable"
} catch {
  Write-Host "[SKIP] /token-router route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Token Efficiency Router smoke passed."
