param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge End-to-End Video Creation Dry Run Mega Batch smoke ==="
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-intake-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-idea-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-prompt-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-provider-gateway-handoff-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-asset-storage-handoff-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-audio-storage-handoff-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-storyboard-plan-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-keyframe-plan-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-timeline-plan-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-render-queue-handoff-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-worker-orchestration-handoff-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-artifact-export-handoff-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-publish-gateway-handoff-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-operator-approval-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-execution-block-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-persistence-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-credential-isolation-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-token-isolation-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-provider-import-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-network-egress-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-audit-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-approval-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-redaction-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-observability-trace-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-retry-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-fallback-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-rate-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-cost-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-privacy-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-video-dry-run-safety-guard-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-end-to-end-video-creation-dry-run-completion.ps1") -BaseUrl $BaseUrl
Write-Host "[OK] CodexForge End-to-End Video Creation Dry Run Mega Batch smoke passed."
