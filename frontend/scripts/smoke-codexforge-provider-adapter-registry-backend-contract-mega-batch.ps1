param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge Provider Adapter Registry Backend Contract Mega Batch smoke ==="
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-registry-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-registry-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-disabled-catalog-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-capability-map-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-text-capability-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-image-capability-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-audio-capability-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-video-capability-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-transcription-capability-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-editing-capability-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-metadata-capability-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-safety-capability-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-credential-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-token-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-request-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-response-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-error-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-approval-gate-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-audit-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-redaction-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-cost-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-rate-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-privacy-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-safety-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-region-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-data-retention-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-retry-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-fallback-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-observability-trace-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-runner-handoff-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-readiness-gate-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-provider-adapter-registry-backend-contract-completion.ps1") -BaseUrl $BaseUrl
Write-Host "[OK] CodexForge Provider Adapter Registry Backend Contract Mega Batch smoke passed."
