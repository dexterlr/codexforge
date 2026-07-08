param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'

& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-intent-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-result-envelope-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-result-receipt-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-safety-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-privacy-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-redaction-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-approval-audit-join-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-observability-trace-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-quality-checklist-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-failure-taxonomy-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-recovery-plan-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-retry-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-fallback-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-timeout-recovery-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-cost-rate-recovery-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-rollback-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-artifact-handoff-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-export-publish-blocker-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-operator-acceptance-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-disabled-promotion-lane-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-status-timeline-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-jarvis-video-update-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-backend-runner-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-controlled-trial-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-product-ia-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-no-persistence-guard-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-no-execution-guard-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-regression-coverage-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-operator-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-readiness-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-trial-result-review-recovery-completion.ps1') -BaseUrl $BaseUrl

Write-Host "[OK] CodexForge First Jarvis-Controlled Video Trial Result Review and Recovery Mega Batch smoke passed."
