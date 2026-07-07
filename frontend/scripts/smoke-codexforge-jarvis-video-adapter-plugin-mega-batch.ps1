param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'

& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-intent-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-capability-registration-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-workspace-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-shared-contract-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-permission-policy-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-planner-route-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-audit-status-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-dry-run-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-approval-packet-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-runtime-readiness-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-backend-only-posture-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-provider-ref-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-credential-ref-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-token-ref-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-request-envelope-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-response-envelope-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-error-envelope-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-prompt-redaction-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-guard-snapshot-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-cost-rate-timeout-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-duration-resolution-size-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-privacy-safety-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-result-placeholder-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-artifact-handoff-placeholder-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-kill-switch-lock-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-idempotency-replay-block-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-blocked-action-summary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-operator-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-jarvis-video-workspace-readiness-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-no-execution-guard-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-adapter-plugin-completion.ps1') -BaseUrl $BaseUrl

Write-Host "[OK] CodexForge First Jarvis-Controlled Video Adapter Plug-in Mega Batch smoke passed."
