param()

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
$repoRoot = Resolve-Path (Join-Path $root "..")
Set-Location $root

function Add-Blocker {
  param(
    [System.Collections.Generic.List[string]]$List,
    [string]$Message
  )

  $List.Add($Message) | Out-Null
}

Write-Host "=== CodexForge Jarvis Video manual provider trial harness ==="
Write-Host "Batch: 4362-4393 - Jarvis Video First Real Provider Adapter Wiring and Manual Gated Trial"
Write-Host "Mode: manual gated trial path only"
Write-Host "Execution posture: disabled by default"

$serverModelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-first-real-provider-adapter-wiring-manual-gated-trial.ts"
$blockers = New-Object 'System.Collections.Generic.List[string]'

if (-not (Test-Path $serverModelPath)) {
  Add-Blocker -List $blockers -Message "Server-only provider adapter wiring model file is missing."
} else {
  $serverModelSource = Get-Content -Raw $serverModelPath
  if ($serverModelSource.IndexOf("provider adapter not wired yet", [StringComparison]::OrdinalIgnoreCase) -ge 0) {
    Add-Blocker -List $blockers -Message "provider adapter not wired yet"
  }
}

if ($env:CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_ENABLED -ne "1") {
  Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_ENABLED=1 before using this manual harness."
}

if ($env:CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_CONFIRM -ne "I_UNDERSTAND_PROVIDER_COSTS_AND_APPROVE") {
  Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_CONFIRM=I_UNDERSTAND_PROVIDER_COSTS_AND_APPROVE before using this manual harness."
}

$manualDryRunMode = $env:CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_DRY_RUN
if ([string]::IsNullOrWhiteSpace($manualDryRunMode)) {
  $manualDryRunMode = "1"
}
if ($manualDryRunMode -ne "1") {
  Add-Blocker -List $blockers -Message "Manual dry-run mode is the only supported mode in 4362-4393. Set CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_DRY_RUN=1."
}

if ([string]::IsNullOrWhiteSpace($env:CODEXFORGE_JARVIS_VIDEO_PROVIDER_CREDENTIAL_SLOT_LABEL)) {
  Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_PROVIDER_CREDENTIAL_SLOT_LABEL to the approved opaque credential slot label."
}

if ([string]::IsNullOrWhiteSpace($env:CODEXFORGE_JARVIS_VIDEO_OPERATOR_APPROVAL_REFERENCE)) {
  Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_OPERATOR_APPROVAL_REFERENCE to the approved operator approval reference."
}

if ($blockers.Count -gt 0) {
  Write-Host "Manual dry-run remains blocked. Review the blockers below:"
  foreach ($blocker in $blockers) {
    Write-Host "[BLOCKED] $blocker"
  }
  Write-Host ""
  Write-Host "No provider call was attempted."
  Write-Host "No queue, worker, or job was dispatched."
  Write-Host "No result, audit, approval, or artifact state was persisted."
  exit 1
}

Write-Host "[BLOCKED] provider adapter not wired yet"
Write-Host "Manual dry-run gate checks passed, but this batch does not include a concrete provider adapter call path."
Write-Host "No provider call was attempted."
Write-Host "No queue, worker, or job was dispatched."
Write-Host "No result, audit, approval, or artifact state was persisted."
exit 1
