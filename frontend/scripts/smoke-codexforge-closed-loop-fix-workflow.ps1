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
Write-Host "=== CodexForge Closed Loop Fix Workflow smoke ==="
Write-Host "Base URL: $BaseUrl"

$consolidationPath = "src\lib\codexforge\consolidation\workflow-entrypoints.ts"
$productReadinessPath = "src\lib\codexforge\product-readiness-audit\functional-workflow-audit.ts"
$stabilizationPath = "src\lib\codexforge\stabilization-command-center\stabilization-readiness.ts"

Assert-FileExists $consolidationPath
Assert-FileExists $productReadinessPath
Assert-FileExists $stabilizationPath

$source = (Get-Content -Raw $consolidationPath) + "`n" + (Get-Content -Raw $productReadinessPath) + "`n" + (Get-Content -Raw $stabilizationPath)

Assert-Contains $source "Closed Loop Fix Workflow" "Closed Loop Fix Workflow reference"
Assert-Contains $source "regression triage" "Regression Triage handoff reference"
Assert-Contains $source "regression fix queue" "Regression Fix Queue handoff reference"
Assert-Contains $source "no auto-fix" "no auto-fix safety boundary"
Assert-Contains $source "no auto-rollback" "no auto-rollback safety boundary"

Write-Host "[OK] CodexForge Closed Loop Fix Workflow smoke passed."
