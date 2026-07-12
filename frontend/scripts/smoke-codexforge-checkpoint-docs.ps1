param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$parentRoot = Resolve-Path (Join-Path $root "..")
if (Test-Path (Join-Path $parentRoot "README.md")) {
  $repoRoot = $parentRoot
} else {
  $repoRoot = Resolve-Path $root
}
Set-Location $root

function Assert-FileExists {
  param([string]$Path)
  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }
  Write-Host "[PASS] file exists: $Path"
}

function Assert-Contains {
  param(
    [AllowEmptyString()][string]$Haystack,
    [string]$Needle,
    [string]$Name
  )
  if ($Haystack.IndexOf($Needle, [StringComparison]::OrdinalIgnoreCase) -lt 0) {
    throw "[FAIL] Missing $Name`: $Needle"
  }
  Write-Host "[PASS] $Name"
}

Write-Host "=== CodexForge Checkpoint Documentation smoke ==="

$rootReadmePath = Join-Path $repoRoot "README.md"
$frontendReadmePath = Join-Path $root "README.md"
$checkpointPath = Join-Path $root "docs\codexforge-checkpoint-current.md"
$runbookPath = Join-Path $root "docs\codexforge-operator-checkpoint-runbook.md"
$allSmokePath = Join-Path $scriptRoot "smoke-codexforge-all.ps1"

foreach ($path in @(
  $rootReadmePath,
  $frontendReadmePath,
  $checkpointPath,
  $runbookPath,
  $allSmokePath
)) {
  Assert-FileExists $path
}

$rootReadme = Get-Content -Raw $rootReadmePath
$frontendReadme = Get-Content -Raw $frontendReadmePath
$checkpointDoc = Get-Content -Raw $checkpointPath
$runbookDoc = Get-Content -Raw $runbookPath
$allSmoke = Get-Content -Raw $allSmokePath
$docsCombined = @($checkpointDoc, $runbookDoc) -join "`n"

$phaseMatches = [regex]::Matches($allSmoke, "Phase\s+(\d+)")
if ($phaseMatches.Count -eq 0) {
  throw "[FAIL] No Phase N entries found in all-smoke"
}

$highestPhase = $phaseMatches |
  ForEach-Object { [int]$_.Groups[1].Value } |
  Sort-Object -Descending |
  Select-Object -First 1

if ($highestPhase -ne 4809) {
  throw "[FAIL] Highest detected phase expected 4809 found $highestPhase"
}
Write-Host "[PASS] highest detected phase from all-smoke: $highestPhase"

foreach ($needle in @(
  "CodexForge",
  "Current State",
  "Current checkpoint"
)) {
  Assert-Contains $rootReadme $needle "root README contains $needle"
}

Assert-Contains $frontendReadme "Operational Checkpoint" "frontend README contains Operational Checkpoint"

foreach ($needle in @(
  'currentReleaseGateBatch = "4778-4809 - Model Adapter Dry-Run Result Review and Recovery"',
  "Phase 4777 Manual Gated Model Adapter Dry-Run Harness",
  "Phase 4809 Model Adapter Dry-Run Result Review and Recovery",
  "smoke-codexforge-manual-gated-model-adapter-dry-run-harness-mega-batch.ps1",
  "smoke-codexforge-model-adapter-dry-run-result-review-recovery-mega-batch.ps1"
)) {
  Assert-Contains $allSmoke $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 4809. Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery. Previous completed batch: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness.",
  "Highest detected phase: 4809. Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery. Previous completed batch: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness. /jarvis remains Athena Command Center",
  "Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery",
  "Previous completed batch: 4746-4777 - Manual Gated Model Adapter Dry-Run Harness",
  "Next likely batch: 4810-4841 - Athena Model Routing and Provider Selection Preview",
  "model adapter dry-run result review and recovery only",
  "dry-run result review is fixture-only",
  "quality review is static preview only",
  "safety review is static preview only",
  "redaction review is static preview only",
  "recovery is manual review only",
  "dry-run acceptance matrix is preview-only",
  "no prompt sending",
  "no LLM/model calls",
  "no frontend provider call",
  "no frontend fetch/network call",
  "no provider SDK imports",
  "no provider execution",
  "no plugin execution",
  "no autonomous execution",
  "no live video generation",
  "no queue dispatch",
  "no worker dispatch",
  "no job execution",
  "no retry execution",
  "no fallback execution",
  "no result persistence",
  "no audit persistence",
  "no approval persistence",
  "no persistent memory",
  "no browser storage",
  "no database writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval required",
  "manual confirmation required",
  "kill switch required",
  "audit required",
  "opaque credential references only",
  "no plaintext secrets",
  "Athena model routing and provider selection preview next"
)) {
  Assert-Contains $docsCombined $needle "checkpoint docs contain $needle"
}

Write-Host "[OK] CodexForge Checkpoint Documentation smoke passed."
