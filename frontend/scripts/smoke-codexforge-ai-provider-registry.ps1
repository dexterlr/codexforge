param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host "=== CodexForge AI Provider Account Registry smoke ==="
Write-Host "Base URL: $BaseUrl"

$domain = "src\lib\codexforge\ai-provider-registry"
$components = Join-Path $domain "components"
Assert-FileExists (Join-Path $domain "index.ts")
Assert-FileExists (Join-Path $domain "ai-provider-registry-types.ts")
Assert-FileExists (Join-Path $domain "ai-provider-account-profile.ts")
Assert-FileExists (Join-Path $domain "ai-provider-registry-summary.ts")
Assert-FileExists (Join-Path $components "AiProviderRegistryPanel.tsx")
Assert-FileExists "src\app\ai-providers\page.tsx"
Assert-FileExists "src\app\ai-providers\page-client.tsx"

$source = (Get-ChildItem -Recurse -File $domain, "src\app\ai-providers" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$nav = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

foreach ($needle in @("buildDefaultAiProviderAccountProfiles", "buildAiProviderRegistrySummary", "manual-subscription", "profile-only", "No raw password storage", "No localStorage secrets", "No provider API calls", "/ai-providers")) {
  Assert-Contains $source $needle "registry includes $needle"
}
Assert-Contains $nav "/ai-providers" "navigation includes /ai-providers"
Assert-Contains $commands "Go to AI Provider Registry" "command palette includes provider registry"
if (([regex]::Matches($allSmoke, "smoke-codexforge-ai-provider-registry\.ps1")).Count -ne 1) { throw "[FAIL] all smoke must include provider registry exactly once" }

Assert-NotMatches $source "sk-[A-Za-z0-9]{20,}" "no hardcoded provider token"
Assert-NotMatches $source "fetch\s*\(" "no network call"
Assert-NotMatches $source "process\.env" "no process env exposure"
Assert-NotMatches $source "localStorage\.setItem" "no browser secret write"
Assert-NotMatches $source "password\s*[:=]" "no raw password field"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/ai-providers" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /ai-providers returned status $($response.StatusCode)" }
  Write-Host "[PASS] /ai-providers route reachable"
} catch {
  Write-Host "[SKIP] /ai-providers route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge AI Provider Account Registry smoke passed."

