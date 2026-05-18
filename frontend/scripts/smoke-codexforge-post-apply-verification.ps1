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
Write-Host "=== CodexForge Post-Apply Verification compatibility smoke ==="
Write-Host "Base URL: $BaseUrl"

$typesPath = "src\lib\codexforge\regression-triage\regression-triage-types.ts"
$normalizerPath = "src\lib\codexforge\regression-triage\regression-signal-normalizer.ts"
$handoffPath = "src\lib\codexforge\regression-triage\regression-preview-handoff.ts"

Assert-FileExists $typesPath
Assert-FileExists $normalizerPath
Assert-FileExists $handoffPath

$source = (Get-Content -Raw $typesPath) + "`n" + (Get-Content -Raw $normalizerPath) + "`n" + (Get-Content -Raw $handoffPath)

Assert-Contains $source "post-apply-verification" "post-apply verification source kind is accepted"
Assert-Contains $source "postApplyResult" "post-apply result input is normalized"
Assert-Contains $source "Post-apply verification result" "post-apply result becomes a regression signal"
Assert-Contains $source "Inspect failed output first" "post-apply failure routes to reviewed handoff"

Write-Host "[OK] CodexForge Post-Apply Verification compatibility smoke passed."
