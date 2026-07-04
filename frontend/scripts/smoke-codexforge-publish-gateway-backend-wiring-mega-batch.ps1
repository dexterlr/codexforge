param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge Publish Gateway Backend Wiring Mega Batch smoke ==="
$smokes = @(
  "smoke-codexforge-publish-gateway-intake-boundary-wiring.ps1",
  "smoke-codexforge-publish-gateway-contract-wiring.ps1",
  "smoke-codexforge-publish-gateway-job-envelope-wiring.ps1",
  "smoke-codexforge-publish-gateway-channel-policy-wiring.ps1",
  "smoke-codexforge-publish-gateway-destination-policy-wiring.ps1",
  "smoke-codexforge-publish-gateway-asset-handoff-wiring.ps1",
  "smoke-codexforge-publish-gateway-artifact-handoff-wiring.ps1",
  "smoke-codexforge-publish-gateway-metadata-policy-wiring.ps1",
  "smoke-codexforge-publish-gateway-caption-policy-wiring.ps1",
  "smoke-codexforge-publish-gateway-thumbnail-policy-wiring.ps1",
  "smoke-codexforge-publish-gateway-schedule-block-boundary-wiring.ps1",
  "smoke-codexforge-publish-gateway-upload-block-boundary-wiring.ps1",
  "smoke-codexforge-publish-gateway-external-account-block-wiring.ps1",
  "smoke-codexforge-publish-gateway-oauth-token-isolation-wiring.ps1",
  "smoke-codexforge-publish-gateway-signed-url-block-wiring.ps1",
  "smoke-codexforge-publish-gateway-publish-handoff-guard-wiring.ps1",
  "smoke-codexforge-publish-gateway-persistence-guard-wiring.ps1",
  "smoke-codexforge-publish-gateway-provider-import-guard-wiring.ps1",
  "smoke-codexforge-publish-gateway-network-egress-guard-wiring.ps1",
  "smoke-codexforge-publish-gateway-approval-boundary-wiring.ps1",
  "smoke-codexforge-publish-gateway-audit-boundary-wiring.ps1",
  "smoke-codexforge-publish-gateway-redaction-boundary-wiring.ps1",
  "smoke-codexforge-publish-gateway-observability-trace-wiring.ps1",
  "smoke-codexforge-publish-gateway-retry-policy-wiring.ps1",
  "smoke-codexforge-publish-gateway-fallback-policy-wiring.ps1",
  "smoke-codexforge-publish-gateway-rate-guard-wiring.ps1",
  "smoke-codexforge-publish-gateway-cost-guard-wiring.ps1",
  "smoke-codexforge-publish-gateway-privacy-guard-wiring.ps1",
  "smoke-codexforge-publish-gateway-safety-guard-wiring.ps1",
  "smoke-codexforge-publish-gateway-operator-review-wiring.ps1",
  "smoke-codexforge-publish-gateway-cockpit-alignment-wiring.ps1",
  "smoke-codexforge-publish-gateway-backend-wiring-completion.ps1"
)
foreach ($smoke in $smokes) {
  & (Join-Path $PSScriptRoot $smoke) -BaseUrl $BaseUrl
}
Write-Host "[OK] CodexForge Publish Gateway Backend Wiring Mega Batch smoke passed."
