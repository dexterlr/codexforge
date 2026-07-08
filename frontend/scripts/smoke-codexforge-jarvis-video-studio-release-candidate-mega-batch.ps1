param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'

& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-hero-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-mission-brief-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-production-timeline-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-readiness-score-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-script-storyboard-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-asset-audio-caption-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-approval-packet-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-dry-run-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-backend-readiness-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-controlled-trial-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-backend-runner-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-result-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-safety-rail-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-audit-rail-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-blocked-action-deck-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-next-action-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-workspace-navigation-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-product-ia-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-jarvis-home-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-cockpit-link-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-release-summary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-developer-diagnostics-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-no-generation-guard-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-no-execution-guard-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-no-persistence-guard-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-no-provider-network-guard-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-regression-coverage-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-operator-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-readiness-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-ux-polish-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-jarvis-video-studio-release-candidate-completion.ps1') -BaseUrl $BaseUrl

Write-Host "[OK] CodexForge Jarvis Video Studio Release Candidate Mega Batch smoke passed."
