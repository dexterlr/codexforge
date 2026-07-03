param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge Worker Orchestration Backend Wiring Mega Batch smoke ==="
$smokes = @(
  "smoke-codexforge-worker-orchestration-intake-boundary-wiring.ps1",
  "smoke-codexforge-worker-orchestration-contract-wiring.ps1",
  "smoke-codexforge-worker-orchestration-job-envelope-wiring.ps1",
  "smoke-codexforge-worker-orchestration-validation-boundary-wiring.ps1",
  "smoke-codexforge-worker-orchestration-capability-policy-wiring.ps1",
  "smoke-codexforge-worker-orchestration-isolation-policy-wiring.ps1",
  "smoke-codexforge-worker-orchestration-queue-handoff-wiring.ps1",
  "smoke-codexforge-worker-orchestration-scheduler-handoff-wiring.ps1",
  "smoke-codexforge-worker-orchestration-dispatch-block-boundary-wiring.ps1",
  "smoke-codexforge-worker-orchestration-execution-block-boundary-wiring.ps1",
  "smoke-codexforge-worker-orchestration-process-spawn-block-wiring.ps1",
  "smoke-codexforge-worker-orchestration-service-creation-block-wiring.ps1",
  "smoke-codexforge-worker-orchestration-port-binding-block-wiring.ps1",
  "smoke-codexforge-worker-orchestration-runtime-deploy-block-wiring.ps1",
  "smoke-codexforge-worker-orchestration-persistence-guard-wiring.ps1",
  "smoke-codexforge-worker-orchestration-credential-isolation-wiring.ps1",
  "smoke-codexforge-worker-orchestration-token-isolation-wiring.ps1",
  "smoke-codexforge-worker-orchestration-provider-import-guard-wiring.ps1",
  "smoke-codexforge-worker-orchestration-network-egress-guard-wiring.ps1",
  "smoke-codexforge-worker-orchestration-audit-boundary-wiring.ps1",
  "smoke-codexforge-worker-orchestration-approval-boundary-wiring.ps1",
  "smoke-codexforge-worker-orchestration-redaction-boundary-wiring.ps1",
  "smoke-codexforge-worker-orchestration-observability-trace-wiring.ps1",
  "smoke-codexforge-worker-orchestration-retry-policy-wiring.ps1",
  "smoke-codexforge-worker-orchestration-fallback-policy-wiring.ps1",
  "smoke-codexforge-worker-orchestration-rate-guard-wiring.ps1",
  "smoke-codexforge-worker-orchestration-cost-guard-wiring.ps1",
  "smoke-codexforge-worker-orchestration-privacy-guard-wiring.ps1",
  "smoke-codexforge-worker-orchestration-safety-guard-wiring.ps1",
  "smoke-codexforge-worker-orchestration-recovery-snapshot-wiring.ps1",
  "smoke-codexforge-worker-orchestration-cockpit-alignment-wiring.ps1",
  "smoke-codexforge-worker-orchestration-backend-wiring-completion.ps1"
)
foreach ($smoke in $smokes) {
  & (Join-Path $PSScriptRoot $smoke) -BaseUrl $BaseUrl
}
Write-Host "[OK] CodexForge Worker Orchestration Backend Wiring Mega Batch smoke passed."
