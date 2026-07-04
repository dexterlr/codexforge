param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge First Controlled Video Workflow Trial Mega Batch smoke ==="
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-intake-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-scenario-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-operator-brief-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-prompt-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-provider-gateway-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-asset-storage-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-audio-storage-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-storyboard-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-keyframe-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-timeline-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-render-queue-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-worker-orchestration-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-artifact-export-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-publish-gateway-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-approval-checkpoint-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-execution-lock-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-replay-block-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-persistence-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-credential-isolation-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-token-isolation-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-provider-import-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-network-egress-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-audit-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-approval-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-redaction-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-observability-trace-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-retry-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-fallback-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-privacy-safety-cost-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-video-trial-operator-readiness-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-first-controlled-video-workflow-trial-completion.ps1") -BaseUrl $BaseUrl
Write-Host "[OK] CodexForge First Controlled Video Workflow Trial Mega Batch smoke passed."
