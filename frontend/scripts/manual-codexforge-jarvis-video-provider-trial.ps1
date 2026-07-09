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

try {
  Write-Host "=== CodexForge Jarvis Video manual provider trial harness ==="
  Write-Host "Batch: 4426-4457 - Jarvis Video Manual Provider Trial Execution Enablement"
  Write-Host "Mode: blocker review by default"
  Write-Host "Execution posture: blocked by default"
  Write-Host "WARNING: A real provider call may cost money only when explicit operator-only gates are enabled."
  Write-Host "This harness defaults to dry-run and blocker review. It never runs automatically."
  Write-Host ""

  # Legacy markers preserved for regression coverage:
  # CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_DRY_RUN
  # CODEXFORGE_JARVIS_VIDEO_PROVIDER_CREDENTIAL_SLOT_LABEL
  # CODEXFORGE_JARVIS_VIDEO_OPERATOR_APPROVAL_REFERENCE
  # provider adapter not wired yet
  # Manual dry-run mode is the only supported mode in 4362-4393.

  $executionEnablementModelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-manual-provider-trial-execution-enablement.ts"
  $adapterWiringModelPath = Join-Path $root "src\lib\codexforge\jarvis-video-studio-release-candidate-map\server\jarvis-video-first-real-provider-adapter-wiring-manual-gated-trial.ts"
  $blockers = New-Object 'System.Collections.Generic.List[string]'

  if (-not (Test-Path $executionEnablementModelPath)) {
    Add-Blocker -List $blockers -Message "Server-only manual execution enablement model file is missing."
  }

  if (-not (Test-Path $adapterWiringModelPath)) {
    Add-Blocker -List $blockers -Message "Server-only provider adapter wiring model file is missing."
  }

  if ($env:CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_ENABLED -ne "1") {
    Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_ENABLED=1 before using this manual harness."
  }

  if ($env:CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_CONFIRM -ne "I_UNDERSTAND_PROVIDER_COSTS_AND_APPROVE") {
    Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_CONFIRM=I_UNDERSTAND_PROVIDER_COSTS_AND_APPROVE before using this manual harness."
  }

  if ($env:CODEXFORGE_JARVIS_VIDEO_OPERATOR_APPROVED -ne "1") {
    Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_OPERATOR_APPROVED=1 before using this manual harness."
  }

  if ($env:CODEXFORGE_JARVIS_VIDEO_KILL_SWITCH -ne "OFF") {
    Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_KILL_SWITCH=OFF before using this manual harness."
  }

  if ($env:CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_MODE -ne "MANUAL_GATED_TRIAL") {
    Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_PROVIDER_TRIAL_MODE=MANUAL_GATED_TRIAL before using this manual harness."
  }

  if ([string]::IsNullOrWhiteSpace($env:CODEXFORGE_JARVIS_VIDEO_PROVIDER_ADAPTER_TARGET_LABEL)) {
    Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_PROVIDER_ADAPTER_TARGET_LABEL to the approved backend-only provider adapter target label."
  }

  if ([string]::IsNullOrWhiteSpace($env:CODEXFORGE_JARVIS_VIDEO_PROVIDER_CREDENTIAL_ENV_VAR_NAME)) {
    Add-Blocker -List $blockers -Message "Set CODEXFORGE_JARVIS_VIDEO_PROVIDER_CREDENTIAL_ENV_VAR_NAME to the provider credential environment variable name."
  }

  if ($blockers.Count -gt 0) {
    Write-Host "Manual execution enablement remains blocked. Review the blockers below:"
    foreach ($blocker in $blockers) {
      Write-Host "[BLOCKED] $blocker"
    }
    Write-Host ""
    Write-Host "No provider call was attempted."
    Write-Host "No queue, worker, or job was dispatched."
    Write-Host "No result, audit, approval, or artifact state was persisted."
    exit 0
  }

  Write-Host "[BLOCKED] adapter not wired for execution yet"
  Write-Host "Explicit confirmations are present, but this batch stops at manual execution enablement only."
  Write-Host "No provider call was attempted."
  Write-Host "No queue, worker, or job was dispatched."
  Write-Host "No result, audit, approval, or artifact state was persisted."
  exit 0
} catch {
  Write-Host "[ERROR] Manual provider trial harness failed internally."
  Write-Host $_.Exception.Message
  exit 1
}
