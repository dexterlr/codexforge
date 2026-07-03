param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge Asset Storage Backend Wiring Mega Batch smoke ==="
$smokes = @(
  "smoke-codexforge-asset-storage-intake-boundary-wiring.ps1",
  "smoke-codexforge-asset-storage-contract-wiring.ps1",
  "smoke-codexforge-asset-storage-metadata-envelope-wiring.ps1",
  "smoke-codexforge-asset-storage-validation-boundary-wiring.ps1",
  "smoke-codexforge-asset-storage-classification-boundary-wiring.ps1",
  "smoke-codexforge-asset-storage-path-policy-wiring.ps1",
  "smoke-codexforge-asset-storage-namespace-guard-wiring.ps1",
  "smoke-codexforge-asset-storage-upload-block-boundary-wiring.ps1",
  "smoke-codexforge-asset-storage-download-block-boundary-wiring.ps1",
  "smoke-codexforge-asset-storage-persistence-guard-wiring.ps1",
  "smoke-codexforge-asset-storage-credential-isolation-wiring.ps1",
  "smoke-codexforge-asset-storage-token-isolation-wiring.ps1",
  "smoke-codexforge-asset-storage-provider-import-guard-wiring.ps1",
  "smoke-codexforge-asset-storage-network-egress-guard-wiring.ps1",
  "smoke-codexforge-asset-storage-fetch-guard-wiring.ps1",
  "smoke-codexforge-asset-storage-audit-boundary-wiring.ps1",
  "smoke-codexforge-asset-storage-approval-boundary-wiring.ps1",
  "smoke-codexforge-asset-storage-redaction-boundary-wiring.ps1",
  "smoke-codexforge-asset-storage-observability-trace-wiring.ps1",
  "smoke-codexforge-asset-storage-retry-policy-wiring.ps1",
  "smoke-codexforge-asset-storage-fallback-policy-wiring.ps1",
  "smoke-codexforge-asset-storage-rate-guard-wiring.ps1",
  "smoke-codexforge-asset-storage-cost-guard-wiring.ps1",
  "smoke-codexforge-asset-storage-privacy-guard-wiring.ps1",
  "smoke-codexforge-asset-storage-safety-guard-wiring.ps1",
  "smoke-codexforge-asset-storage-state-snapshot-wiring.ps1",
  "smoke-codexforge-asset-storage-recovery-snapshot-wiring.ps1",
  "smoke-codexforge-asset-storage-operator-review-wiring.ps1",
  "smoke-codexforge-asset-storage-checkpoint-alignment-wiring.ps1",
  "smoke-codexforge-asset-storage-smoke-coverage-wiring.ps1",
  "smoke-codexforge-asset-storage-cockpit-alignment-wiring.ps1",
  "smoke-codexforge-asset-storage-backend-wiring-completion.ps1"
)
foreach ($smoke in $smokes) {
  & (Join-Path $PSScriptRoot $smoke) -BaseUrl $BaseUrl
}
Write-Host "[OK] CodexForge Asset Storage Backend Wiring Mega Batch smoke passed."
