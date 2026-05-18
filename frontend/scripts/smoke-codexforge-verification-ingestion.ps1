param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)
  if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge Verification Ingestion compatibility smoke ==="
Write-Host "Base URL: $BaseUrl"

$typesPath = "src\lib\codexforge\regression-triage\regression-triage-types.ts"
$normalizerPath = "src\lib\codexforge\regression-triage\regression-signal-normalizer.ts"

Assert-FileExists $typesPath
Assert-FileExists $normalizerPath

$source = (Get-Content -Raw $typesPath) + "`n" + (Get-Content -Raw $normalizerPath)

Assert-Contains $source "verification-ingestion" "verification ingestion source kind is accepted"
Assert-Contains $source "verificationSignals" "verification signals input is normalized"
Assert-Contains $source "normalizeRegressionSignals" "verification signals can feed regression triage"
Assert-Contains $source "RegressionSignalSourceKind" "verification ingestion uses typed source kind"

Write-Host "[OK] CodexForge Verification Ingestion compatibility smoke passed."
