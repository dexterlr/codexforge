param([switch]$ListAll)

$ErrorActionPreference = "Stop"
$scriptRoot = $PSScriptRoot
$root = Split-Path -Parent $scriptRoot
Set-Location $root

$currentReleaseGateFiles = @(
  "smoke-codexforge-all.ps1",
  "smoke-codexforge-full-smoke-harness-triage-required-release-gate-mega-batch.ps1",
  "smoke-codexforge-jarvis-video-first-provider-trial-result-review-recovery-mega-batch.ps1",
  "smoke-codexforge-jarvis-video-first-real-provider-adapter-wiring-manual-gated-trial-mega-batch.ps1",
  "smoke-codexforge-jarvis-video-first-manual-provider-trial-result-capture-ux-review-mega-batch.ps1",
  "smoke-codexforge-jarvis-video-manual-provider-trial-execution-enablement-mega-batch.ps1",
  "smoke-codexforge-athena-unified-chat-control-plane-foundation-mega-batch.ps1",
  "smoke-codexforge-athena-plugin-registry-command-router-mega-batch.ps1",
  "smoke-codexforge-athena-approval-gated-tool-execution-bridge-mega-batch.ps1",
  "smoke-codexforge-athena-cross-workspace-run-timeline-audit-memory-mega-batch.ps1",
  "smoke-codexforge-athena-product-ux-polish-operator-home-takeover-mega-batch.ps1",
  "smoke-codexforge-athena-conversational-command-composer-approval-drafts-mega-batch.ps1",
  "smoke-codexforge-jarvis-product-experience-god-tier-ux-mega-batch.ps1",
  "smoke-codexforge-jarvis-unified-product-ia-god-tier-ux-mega-batch.ps1",
  "smoke-codexforge-checkpoint-docs.ps1",
  "smoke-codexforge-historical-archive-inventory.ps1"
)

$archiveScripts = @(
  Get-ChildItem -Path $scriptRoot -Filter "smoke-codexforge-*.ps1" -File |
    Where-Object { $currentReleaseGateFiles -notcontains $_.Name } |
    Sort-Object -Property Name
)

Write-Host "=== CodexForge historical smoke archive inventory ==="
Write-Host "Historical phase smokes are preserved as evidence."
Write-Host "Historical phase smokes are non-gating by default."
Write-Host "Current release gate: scripts/smoke-codexforge-all.ps1"
Write-Host "This inventory never executes archived historical smokes."
Write-Host "If you manually run any archived historical smoke, set CODEXFORGE_RUN_HISTORICAL_SMOKES=1 in that shell first."
Write-Host ("Archive count: {0}" -f $archiveScripts.Count)
Write-Host ""

if ($archiveScripts.Count -eq 0) {
  Write-Host "[PASS] No archived historical smoke scripts were detected outside the current release gate."
  return
}

$scriptsToPrint = $archiveScripts
if (-not $ListAll) {
  $scriptsToPrint = $archiveScripts | Select-Object -First 40
}

foreach ($script in $scriptsToPrint) {
  Write-Host (" - {0}" -f $script.Name)
}

if ((-not $ListAll) -and $archiveScripts.Count -gt $scriptsToPrint.Count) {
  Write-Host ""
  Write-Host ("[INFO] Showing first {0} archived smoke scripts. Re-run with -ListAll to print the full archive inventory." -f $scriptsToPrint.Count)
}
