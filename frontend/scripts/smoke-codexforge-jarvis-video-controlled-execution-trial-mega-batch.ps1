param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'

& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-intent-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-console-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-readiness-state-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-dry-run-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-approval-packet-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-adapter-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-backend-readiness-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-operator-preflight-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-provider-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-credential-token-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-request-envelope-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-response-envelope-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-error-envelope-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-prompt-redaction-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-cost-rate-timeout-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-duration-resolution-size-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-privacy-safety-gate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-audit-observability-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-result-placeholder-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-artifact-handoff-placeholder-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-kill-switch-lock-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-idempotency-replay-block-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-disabled-launch-lane-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-blocked-action-summary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-jarvis-video-update-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-product-ia-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-no-execution-guard-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-regression-coverage-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-operator-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-readiness-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-controlled-execution-trial-completion.ps1') -BaseUrl $BaseUrl

Write-Host "[OK] CodexForge First Jarvis-Controlled Video Controlled Execution Trial Mega Batch smoke passed."
