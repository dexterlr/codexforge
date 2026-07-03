param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge Provider Gateway Hardening Mega Batch smoke ==="
$smokes = @(
  "smoke-codexforge-provider-gateway-request-envelope-hardening.ps1",
  "smoke-codexforge-provider-gateway-response-envelope-hardening.ps1",
  "smoke-codexforge-provider-gateway-approval-boundary-hardening.ps1",
  "smoke-codexforge-provider-gateway-audit-boundary-hardening.ps1",
  "smoke-codexforge-provider-gateway-denial-handling-hardening.ps1",
  "smoke-codexforge-provider-gateway-redaction-boundary-hardening.ps1",
  "smoke-codexforge-provider-gateway-observability-marker-hardening.ps1",
  "smoke-codexforge-provider-gateway-trace-review-hardening.ps1",
  "smoke-codexforge-provider-gateway-retry-policy-hardening.ps1",
  "smoke-codexforge-provider-gateway-fallback-policy-hardening.ps1",
  "smoke-codexforge-provider-gateway-rate-guard-hardening.ps1",
  "smoke-codexforge-provider-gateway-cost-guard-hardening.ps1",
  "smoke-codexforge-provider-gateway-safety-guard-hardening.ps1",
  "smoke-codexforge-provider-gateway-privacy-guard-hardening.ps1",
  "smoke-codexforge-provider-gateway-credential-isolation-hardening.ps1",
  "smoke-codexforge-provider-gateway-token-isolation-hardening.ps1",
  "smoke-codexforge-provider-gateway-prompt-egress-guard-hardening.ps1",
  "smoke-codexforge-provider-gateway-network-egress-guard-hardening.ps1",
  "smoke-codexforge-provider-gateway-provider-sdk-import-guard-hardening.ps1",
  "smoke-codexforge-provider-gateway-state-snapshot-hardening.ps1",
  "smoke-codexforge-provider-gateway-recovery-snapshot-hardening.ps1",
  "smoke-codexforge-provider-gateway-operator-review-hardening.ps1",
  "smoke-codexforge-provider-gateway-completion-guard-hardening.ps1",
  "smoke-codexforge-provider-gateway-blocked-action-matrix-hardening.ps1",
  "smoke-codexforge-provider-gateway-protected-action-matrix-hardening.ps1",
  "smoke-codexforge-provider-gateway-dry-run-contract-hardening.ps1",
  "smoke-codexforge-provider-gateway-result-review-handoff-hardening.ps1",
  "smoke-codexforge-provider-gateway-recovery-handoff-hardening.ps1",
  "smoke-codexforge-provider-gateway-checkpoint-alignment-hardening.ps1",
  "smoke-codexforge-provider-gateway-smoke-coverage-hardening.ps1",
  "smoke-codexforge-provider-gateway-cockpit-alignment-hardening.ps1",
  "smoke-codexforge-provider-gateway-hardening-completion.ps1"
)
foreach ($smoke in $smokes) {
  & (Join-Path $PSScriptRoot $smoke) -BaseUrl $BaseUrl
}
Write-Host "[OK] CodexForge Provider Gateway Hardening Mega Batch smoke passed."
