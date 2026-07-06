param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
Write-Host '=== CodexForge First Backend-Owned Video Provider Execution Approval Packet Mega Batch smoke ==='
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-intent-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-dry-run-ref-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-provider-ref-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-credential-ref-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-token-ref-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-request-envelope-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-prompt-redaction-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-guard-snapshot-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-cost-cap-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-rate-cap-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-timeout-cap-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-duration-resolution-size-cap-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-privacy-gate-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-safety-gate-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-lineage-packet-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-audit-packet-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-observability-trace-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-synthetic-response-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-synthetic-error-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-result-capture-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-artifact-handoff-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-kill-switch-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-single-call-lock-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-idempotency-key-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-replay-block-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-retry-policy-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-fallback-policy-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-backend-runtime-check-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-server-only-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-operator-final-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-video-provider-approval-packet-completion.ps1') -BaseUrl $BaseUrl
Write-Host '[OK] CodexForge First Backend-Owned Video Provider Execution Approval Packet Mega Batch smoke passed.'