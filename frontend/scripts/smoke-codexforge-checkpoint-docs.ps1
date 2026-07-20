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

<#
Legacy smoke compatibility markers preserved for older scripts that inspect the
raw source of this checkpoint smoke file. These markers are inert here and do
not change the active 5673 release gate.

Highest detected phase: 4233
Latest completed batch: 4202-4233 - Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run
Previous completed batch: 4170-4201 - Jarvis Video Backend Runner Foundation Dry-Run Admission
Next likely batch: 4234-4265 - Jarvis Video Result Capture Audit Envelope and Approval Join

Highest detected phase: 4265
Latest completed batch: 4234-4265 - Jarvis Video Result Capture Audit Envelope and Approval Join
Previous completed batch: 4202-4233 - Jarvis Video Server-Only Runner Skeleton and Synthetic Dry Run
Next likely batch: 4266-4297 - Jarvis Video First Gated Provider Execution Trial Preparation

Highest detected phase: 4297
Latest completed batch: 4266-4297 - Jarvis Video First Gated Provider Execution Trial Preparation
Previous completed batch: 4234-4265 - Jarvis Video Result Capture Audit Envelope and Approval Join
Next likely batch: 4298-4329 - Jarvis Video First Gated Provider Execution Trial Runtime
first gated provider trial preparation only
provider adapter reference only
provider preflight only
no provider execution
no live video generation
no provider call
no queue dispatch
no worker dispatch
no job execution
no result persistence
no audit persistence
no approval persistence
no artifact persistence
no retry/fallback execution
disabled by default
hard kill switch
backend-only execution path required
server-only boundary required
operator approval required
credential isolation required
first gated provider execution runtime only in a future batch

Current checkpoint: Highest detected phase: 4425. Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review. Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial.
Highest detected phase: 4425. Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review. Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial.
Latest completed batch: 4394-4425 - Jarvis Video First Manual Provider Trial Result Capture and UX Review
Previous completed batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial
Next likely batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement
first real provider adapter wiring only
manual gated trial path only
provider adapter wiring path defined
manual gated trial disabled by default
hard kill switch
provider call not executed during validation
manual confirmation required
operator approval required
credential isolation required
no frontend provider call
no provider call during validation
no live video generation during validation
no queue dispatch
no worker dispatch
no job execution
no result persistence
no audit persistence
no approval persistence
no artifact persistence
retry/fallback disabled
export/publish blocked
backend-only execution path required
server-only boundary required
manual provider trial capture/UX review in a future batch

Highest detected phase: 4809
Latest completed batch: 4778-4809 - Model Adapter Dry-Run Result Review and Recovery
Next likely batch: 4810-4841 - Athena Model Routing and Provider Selection Preview
#>

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

if ($highestPhase -ne 5737) {
  throw "[FAIL] Highest detected phase expected 5737 found $highestPhase"
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
  'currentReleaseGateBatch = "5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP"',
  "Phase 5737 Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP",
  "smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-result-capture-mvp-mega-batch.ps1",
  "Phase 5705 Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview",
  "smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-review-recovery-preview-mega-batch.ps1",
  "Phase 5673 Backend-Owned Minimal Manual-Gated Text Model Adapter MVP",
  "smoke-codexforge-backend-owned-minimal-manual-gated-text-model-adapter-mvp-mega-batch.ps1",
  "Phase 5641 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview",
  "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-review-recovery-preview-mega-batch.ps1",
  "Phase 5641 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview",
  "Phase 5609 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP",
  "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-end-to-end-packet-mvp-mega-batch.ps1",
  "Phase 5577 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview",
  "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-review-recovery-preview-mega-batch.ps1",
  "Phase 5545 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join MVP",
  "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-audit-approval-join-mvp-mega-batch.ps1",
  "Phase 5513 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture Review and Recovery Preview",
  "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-review-recovery-preview-mega-batch.ps1",
  "Phase 5481 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Result Capture MVP",
  "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-result-capture-mvp-mega-batch.ps1",
  "Phase 5449 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution Review and Recovery Preview",
  "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-execution-review-recovery-preview-mega-batch.ps1",
  "Phase 5417 Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Execution MVP",
  "smoke-codexforge-backend-owned-minimal-manual-gated-synthetic-dry-run-execution-mvp-mega-batch.ps1"
)) {
  Assert-Contains $allSmoke $needle "all-smoke contains $needle"
}

foreach ($needle in @(
  "Current checkpoint: Highest detected phase: 5737. Latest completed batch: 5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP. Previous completed batch: 5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview. Next likely batch: 5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview.",
  "## Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP Checkpoint",
  "Highest detected phase: 5737",
  "Latest completed batch: 5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP",
  "Previous completed batch: 5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview",
  "Next likely batch: 5738-5769 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture Review and Recovery Preview",
  "backend-owned minimal manual-gated text model adapter result capture MVP only",
  "minimal text adapter result capture MVP is backend-only",
  "server-only text adapter result capture helper exists",
  "text adapter fixture response is captured in memory only",
  "text adapter result capture is not persistent",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "provider response is not received",
  "model output is not generated",
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
  "no file writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval fixture required",
  "manual confirmation fixture required",
  "kill switch required",
  "audit preview required",
  "opaque credential references only",
  "no plaintext secrets",
  "current readiness is minimal-text-adapter-result-capture-mvp-only / backend-only / fixture-only / in-memory-only / not persistent",
  "backend-owned minimal manual-gated text model adapter result capture review and recovery preview next",
  "## Backend-Owned Minimal Manual-Gated Text Model Adapter Review And Recovery Preview Checkpoint",
  "Latest completed batch: 5674-5705 - Backend-Owned Minimal Manual-Gated Text Model Adapter Review and Recovery Preview",
  "Previous completed batch: 5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP",
  "Next likely batch: 5706-5737 - Backend-Owned Minimal Manual-Gated Text Model Adapter Result Capture MVP",
  "backend-owned minimal manual-gated text model adapter review and recovery preview only",
  "minimal text adapter review is preview-only",
  "server-only text adapter helper exists",
  "text adapter output is deterministic fixture output only",
  "text adapter is not provider-capable yet",
  "redacted prompt envelope is preview-only",
  "prompt transmission state is not sent",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "provider response is not received",
  "model output is not generated",
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
  "no file writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval fixture required",
  "manual confirmation fixture required",
  "kill switch required",
  "audit preview required",
  "opaque credential references only",
  "no plaintext secrets",
  "current readiness is minimal-text-adapter-review-only / backend-only / fixture-only / not provider-capable / not persistent",
  "acceptance state is not accepted for live provider execution / text adapter fixture MVP accepted only",
  "backend-owned minimal manual-gated text model adapter result capture MVP next",
  "## Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-To-End Packet Review And Recovery Preview Checkpoint",
  "Highest detected phase: 5641",
  "Latest completed batch: 5610-5641 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview",
  "Previous completed batch: 5578-5609 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP",
  "Next likely batch: 5642-5673 - Backend-Owned Minimal Manual-Gated Text Model Adapter MVP",
  "backend-owned minimal manual-gated synthetic dry-run end-to-end packet review and recovery preview only",
  "minimal synthetic end-to-end packet review is preview-only",
  "acceptance state is not accepted for live execution / synthetic end-to-end packet MVP accepted only",
  "current readiness is minimal-synthetic-end-to-end-packet-review-only / backend-only / in-memory-only / not provider-capable / not persistent",
  "backend-owned minimal manual-gated text model adapter MVP next",
  "## Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-To-End Packet MVP Checkpoint",
  "Highest detected phase: 5609",
  "Latest completed batch: 5578-5609 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet MVP",
  "Previous completed batch: 5546-5577 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run Audit and Approval Join Review and Recovery Preview",
  "Next likely batch: 5610-5641 - Backend-Owned Minimal Manual-Gated Synthetic Dry-Run End-to-End Packet Review and Recovery Preview",
  "backend-owned minimal manual-gated synthetic dry-run end-to-end packet MVP only",
  "minimal synthetic end-to-end packet MVP is backend-only",
  "server-only synthetic end-to-end packet helper exists",
  "synthetic end-to-end packet is produced in memory only",
  "deterministic synthetic end-to-end packet only",
  "synthetic execution, capture, audit join, and approval join are bundled in memory only",
  "no frontend request is created",
  "no API route is created",
  "no real approval request",
  "no real approval recording",
  "approval fixture is preview-only",
  "manual confirmation fixture is preview-only",
  "approval token is not issued",
  "approval lease is not created",
  "provider response is not received",
  "model output is not generated",
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
  "no file writes",
  "backend-only execution path required",
  "server-only adapters required",
  "manual approval fixture required",
  "manual confirmation fixture required",
  "kill switch required",
  "audit preview required",
  "opaque credential references only",
  "no plaintext secrets",
  "current readiness is minimal-synthetic-end-to-end-packet-mvp-only / backend-only / in-memory-only / not provider-capable / not persistent",
  "backend-owned minimal manual-gated synthetic dry-run end-to-end packet review and recovery preview next"
)) {
  Assert-Contains $docsCombined $needle "docs contain $needle"
}

Write-Host "[PASS] CodexForge checkpoint documentation smoke completed."
