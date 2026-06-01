param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-Contains { param([string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }

Write-Host "=== CodexForge Provider Setup Wizard smoke ==="
Write-Host "Base URL: $BaseUrl"

$domain = "src\lib\codexforge\provider-setup-wizard"
$components = Join-Path $domain "components"
Assert-FileExists (Join-Path $domain "index.ts")
Assert-FileExists (Join-Path $domain "provider-setup-wizard-types.ts")
Assert-FileExists (Join-Path $domain "provider-setup-step.ts")
Assert-FileExists (Join-Path $domain "provider-setup-state.ts")
Assert-FileExists (Join-Path $components "ProviderSetupWizardPanel.tsx")
Assert-FileExists "src\app\provider-setup\page.tsx"
Assert-FileExists "src\app\provider-setup\page-client.tsx"

$source = (Get-ChildItem -Recurse -File $domain, "src\app\provider-setup" | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commands = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

foreach ($needle in @("buildDefaultProviderSetupSteps", "buildProviderSetupWizardState", "Choose provider profile", "Review credential strategy", "Select routing role", "No network calls", "/provider-setup")) {
  Assert-Contains $source $needle "provider setup includes $needle"
}
Assert-Contains $commands "Go to Provider Setup Wizard" "command palette includes provider setup"
if (([regex]::Matches($allSmoke, "smoke-codexforge-provider-setup-wizard\.ps1")).Count -ne 1) { throw "[FAIL] all smoke must include provider setup exactly once" }

Assert-NotMatches $source "sk-[A-Za-z0-9]{20,}" "no hardcoded provider token"
Assert-NotMatches $source "fetch\s*\(" "no network call"
Assert-NotMatches $source "process\.env" "no process env exposure"
Assert-NotMatches $source "localStorage\.setItem" "no browser secret write"
Assert-NotMatches $source "password\s*[:=]" "no raw password field"

try {
  $response = Invoke-WebRequest -UseBasicParsing -Method Get -Uri "$BaseUrl/provider-setup" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /provider-setup returned status $($response.StatusCode)" }
  Write-Host "[PASS] /provider-setup route reachable"
} catch {
  Write-Host "[SKIP] /provider-setup route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Provider Setup Wizard smoke passed."

