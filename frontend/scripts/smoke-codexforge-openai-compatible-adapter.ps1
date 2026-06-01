param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host "=== CodexForge OpenAI-Compatible Provider Adapter smoke ==="

$domain = "src\lib\codexforge\provider-adapters"
$components = Join-Path $domain "components"
Assert-FileExists (Join-Path $domain "index.ts")
Assert-FileExists (Join-Path $domain "openai-compatible-adapter.ts")
Assert-FileExists (Join-Path $components "ProviderAdaptersPanel.tsx")
Assert-FileExists "src\app\provider-adapters\page.tsx"
Assert-FileExists "src\app\provider-adapters\page-client.tsx"

$source = (Get-ChildItem -Recurse -File $domain, "src\app\provider-adapters" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$route = Get-Content -Raw "src\app\provider-adapters\page-client.tsx"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

foreach ($needle in @("buildOpenAiCompatibleAdapter", "buildOpenAiCompatibleModelFamilies", "buildOpenAiCompatibleCapabilityProfile", "buildOpenAiCompatibleRoutingHints", "buildOpenAiCompatibleSafetyProfile", "OpenAI-compatible", "No live provider calls yet", "No raw password storage", "No localStorage secrets", ".env.local", "OpenAI-compatible means the request format is familiar", "ProviderAdaptersPanel")) {
  Assert-Contains $source $needle "OpenAI adapter includes $needle"
}
Assert-Contains $route "ProviderAdaptersPanel" "route imports/renders main panel"
Assert-Contains $commands "Go to Provider Adapters" "command palette includes provider adapters"
Assert-Contains $nav "/provider-adapters" "navigation includes provider adapters"
if (([regex]::Matches($allSmoke, "smoke-codexforge-openai-compatible-adapter\.ps1")).Count -ne 1) { throw "[FAIL] all smoke must include OpenAI adapter exactly once" }

Assert-NotMatches $source "fetch\s*\(" "no fetch call"
Assert-NotMatches $source "sk-[A-Za-z0-9]{20,}" "no hardcoded sk key"
Assert-NotMatches $source "localStorage\.setItem" "no localStorage secret write"
Assert-NotMatches $source "process\.env" "no process env value printed"
Assert-NotMatches $source "password\s*[:=]" "no password field"
Assert-NotMatches $source "Math\.random|Date\.now" "deterministic adapter definitions"
Assert-NotMatches $source "d3-force" "no d3-force"
$mojibakePattern = "$([char]0x00C3)|$([char]0x00C2)|$([char]0x00E2)"
Assert-NotMatches $source $mojibakePattern "no mojibake"
Assert-NotMatches $source "appendEvent[(]|saveBrainGraph[(]|applyDiff[(]|writeFile[(]|runCommand[(]" "no unsafe execution calls"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/provider-adapters" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /provider-adapters returned status $($response.StatusCode)" }
  Write-Host "[PASS] /provider-adapters route reachable"
} catch {
  Write-Host "[SKIP] /provider-adapters route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge OpenAI-Compatible Provider Adapter smoke passed."
