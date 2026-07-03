param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge Artifact Export Backend Wiring Mega Batch smoke ==="
$smokes = @(
  "smoke-codexforge-artifact-export-intake-boundary-wiring.ps1",
  "smoke-codexforge-artifact-export-contract-wiring.ps1",
  "smoke-codexforge-artifact-export-job-envelope-wiring.ps1",
  "smoke-codexforge-artifact-export-validation-boundary-wiring.ps1",
  "smoke-codexforge-artifact-export-format-policy-wiring.ps1",
  "smoke-codexforge-artifact-export-manifest-policy-wiring.ps1",
  "smoke-codexforge-artifact-export-packaging-policy-wiring.ps1",
  "smoke-codexforge-artifact-export-asset-linkage-wiring.ps1",
  "smoke-codexforge-artifact-export-audio-linkage-wiring.ps1",
  "smoke-codexforge-artifact-export-render-linkage-wiring.ps1",
  "smoke-codexforge-artifact-export-worker-handoff-wiring.ps1",
  "smoke-codexforge-artifact-export-file-creation-block-wiring.ps1",
  "smoke-codexforge-artifact-export-download-block-boundary-wiring.ps1",
  "smoke-codexforge-artifact-export-archive-block-boundary-wiring.ps1",
  "smoke-codexforge-artifact-export-signed-url-block-wiring.ps1",
  "smoke-codexforge-artifact-export-publish-handoff-guard-wiring.ps1",
  "smoke-codexforge-artifact-export-persistence-guard-wiring.ps1",
  "smoke-codexforge-artifact-export-credential-isolation-wiring.ps1",
  "smoke-codexforge-artifact-export-token-isolation-wiring.ps1",
  "smoke-codexforge-artifact-export-provider-import-guard-wiring.ps1",
  "smoke-codexforge-artifact-export-network-egress-guard-wiring.ps1",
  "smoke-codexforge-artifact-export-audit-boundary-wiring.ps1",
  "smoke-codexforge-artifact-export-approval-boundary-wiring.ps1",
  "smoke-codexforge-artifact-export-redaction-boundary-wiring.ps1",
  "smoke-codexforge-artifact-export-observability-trace-wiring.ps1",
  "smoke-codexforge-artifact-export-retry-policy-wiring.ps1",
  "smoke-codexforge-artifact-export-fallback-policy-wiring.ps1",
  "smoke-codexforge-artifact-export-rate-guard-wiring.ps1",
  "smoke-codexforge-artifact-export-cost-guard-wiring.ps1",
  "smoke-codexforge-artifact-export-privacy-guard-wiring.ps1",
  "smoke-codexforge-artifact-export-safety-guard-wiring.ps1",
  "smoke-codexforge-artifact-export-backend-wiring-completion.ps1"
)
foreach ($smoke in $smokes) {
  & (Join-Path $PSScriptRoot $smoke) -BaseUrl $BaseUrl
}
Write-Host "[OK] CodexForge Artifact Export Backend Wiring Mega Batch smoke passed."

