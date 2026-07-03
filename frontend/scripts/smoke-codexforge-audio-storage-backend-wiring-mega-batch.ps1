param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge Audio Storage Backend Wiring Mega Batch smoke ==="
$smokes = @(
  "smoke-codexforge-audio-storage-intake-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-contract-wiring.ps1",
  "smoke-codexforge-audio-storage-metadata-envelope-wiring.ps1",
  "smoke-codexforge-audio-storage-validation-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-classification-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-codec-policy-wiring.ps1",
  "smoke-codexforge-audio-storage-duration-guard-wiring.ps1",
  "smoke-codexforge-audio-storage-waveform-metadata-wiring.ps1",
  "smoke-codexforge-audio-storage-transcript-linkage-wiring.ps1",
  "smoke-codexforge-audio-storage-asset-linkage-wiring.ps1",
  "smoke-codexforge-audio-storage-upload-block-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-download-block-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-persistence-guard-wiring.ps1",
  "smoke-codexforge-audio-storage-recording-block-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-playback-block-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-transcoding-block-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-credential-isolation-wiring.ps1",
  "smoke-codexforge-audio-storage-token-isolation-wiring.ps1",
  "smoke-codexforge-audio-storage-provider-import-guard-wiring.ps1",
  "smoke-codexforge-audio-storage-network-egress-guard-wiring.ps1",
  "smoke-codexforge-audio-storage-audit-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-approval-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-redaction-boundary-wiring.ps1",
  "smoke-codexforge-audio-storage-observability-trace-wiring.ps1",
  "smoke-codexforge-audio-storage-retry-policy-wiring.ps1",
  "smoke-codexforge-audio-storage-fallback-policy-wiring.ps1",
  "smoke-codexforge-audio-storage-rate-guard-wiring.ps1",
  "smoke-codexforge-audio-storage-cost-guard-wiring.ps1",
  "smoke-codexforge-audio-storage-privacy-guard-wiring.ps1",
  "smoke-codexforge-audio-storage-safety-guard-wiring.ps1",
  "smoke-codexforge-audio-storage-cockpit-alignment-wiring.ps1",
  "smoke-codexforge-audio-storage-backend-wiring-completion.ps1"
)
foreach ($smoke in $smokes) {
  & (Join-Path $PSScriptRoot $smoke) -BaseUrl $BaseUrl
}
Write-Host "[OK] CodexForge Audio Storage Backend Wiring Mega Batch smoke passed."
