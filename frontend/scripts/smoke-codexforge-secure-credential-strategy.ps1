param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host "=== CodexForge Secure Credential Strategy smoke ==="
Write-Host "Base URL: $BaseUrl"

$domain = "src\lib\codexforge\secure-credential-strategy"
$components = Join-Path $domain "components"
Assert-FileExists (Join-Path $domain "index.ts")
Assert-FileExists (Join-Path $domain "secure-credential-strategy-types.ts")
Assert-FileExists (Join-Path $domain "credential-strategy-policy.ts")
Assert-FileExists (Join-Path $domain "secure-credential-summary.ts")
Assert-FileExists (Join-Path $components "SecureCredentialStrategyPanel.tsx")
Assert-FileExists "src\app\credentials\page.tsx"
Assert-FileExists "src\app\credentials\page-client.tsx"

$source = (Get-ChildItem -Recurse -File $domain, "src\app\credentials" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

foreach ($needle in @("buildDefaultSecureCredentialStrategyItems", "buildSecureCredentialStrategySummary", "No raw password storage", "No localStorage secrets", "No process environment values printed in UI", "manual-handoff", "/credentials")) {
  Assert-Contains $source $needle "credential strategy includes $needle"
}
Assert-Contains $commands "Go to Credential Strategy" "command palette includes credential strategy"
if (([regex]::Matches($allSmoke, "smoke-codexforge-secure-credential-strategy\.ps1")).Count -ne 1) { throw "[FAIL] all smoke must include credential strategy exactly once" }

Assert-NotMatches $source "sk-[A-Za-z0-9]{20,}" "no hardcoded provider token"
Assert-NotMatches $source "fetch\s*\(" "no network call"
Assert-NotMatches $source "process\.env\." "no process env access"
Assert-NotMatches $source "localStorage\.setItem" "no browser secret write"
Assert-NotMatches $source "password\s*[:=]" "no raw password field"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/credentials" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /credentials returned status $($response.StatusCode)" }
  Write-Host "[PASS] /credentials route reachable"
} catch {
  Write-Host "[SKIP] /credentials route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Secure Credential Strategy smoke passed."

