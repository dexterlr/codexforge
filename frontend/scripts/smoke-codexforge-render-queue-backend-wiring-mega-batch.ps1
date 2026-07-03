param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge Render Queue Backend Wiring Mega Batch smoke ==="
$smokes = @(
  "smoke-codexforge-render-queue-intake-boundary-wiring.ps1",
  "smoke-codexforge-render-queue-contract-wiring.ps1",
  "smoke-codexforge-render-queue-job-envelope-wiring.ps1",
  "smoke-codexforge-render-queue-validation-boundary-wiring.ps1",
  "smoke-codexforge-render-queue-asset-dependency-wiring.ps1",
  "smoke-codexforge-render-queue-audio-dependency-wiring.ps1",
  "smoke-codexforge-render-queue-timeline-dependency-wiring.ps1",
  "smoke-codexforge-render-queue-priority-policy-wiring.ps1",
  "smoke-codexforge-render-queue-scheduling-policy-wiring.ps1",
  "smoke-codexforge-render-queue-dispatch-block-boundary-wiring.ps1",
  "smoke-codexforge-render-queue-worker-block-boundary-wiring.ps1",
  "smoke-codexforge-render-queue-job-execution-block-wiring.ps1",
  "smoke-codexforge-render-queue-scheduler-block-wiring.ps1",
  "smoke-codexforge-render-queue-render-execution-block-wiring.ps1",
  "smoke-codexforge-render-queue-persistence-guard-wiring.ps1",
  "smoke-codexforge-render-queue-credential-isolation-wiring.ps1",
  "smoke-codexforge-render-queue-token-isolation-wiring.ps1",
  "smoke-codexforge-render-queue-provider-import-guard-wiring.ps1",
  "smoke-codexforge-render-queue-network-egress-guard-wiring.ps1",
  "smoke-codexforge-render-queue-audit-boundary-wiring.ps1",
  "smoke-codexforge-render-queue-approval-boundary-wiring.ps1",
  "smoke-codexforge-render-queue-redaction-boundary-wiring.ps1",
  "smoke-codexforge-render-queue-observability-trace-wiring.ps1",
  "smoke-codexforge-render-queue-retry-policy-wiring.ps1",
  "smoke-codexforge-render-queue-fallback-policy-wiring.ps1",
  "smoke-codexforge-render-queue-rate-guard-wiring.ps1",
  "smoke-codexforge-render-queue-cost-guard-wiring.ps1",
  "smoke-codexforge-render-queue-privacy-guard-wiring.ps1",
  "smoke-codexforge-render-queue-safety-guard-wiring.ps1",
  "smoke-codexforge-render-queue-recovery-snapshot-wiring.ps1",
  "smoke-codexforge-render-queue-cockpit-alignment-wiring.ps1",
  "smoke-codexforge-render-queue-backend-wiring-completion.ps1"
)
foreach ($smoke in $smokes) {
  & (Join-Path $PSScriptRoot $smoke) -BaseUrl $BaseUrl
}
Write-Host "[OK] CodexForge Render Queue Backend Wiring Mega Batch smoke passed."
