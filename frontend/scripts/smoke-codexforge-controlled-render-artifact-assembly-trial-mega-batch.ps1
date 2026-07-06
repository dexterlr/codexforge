param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
Write-Host '=== CodexForge Controlled Render Artifact Assembly Trial Mega Batch smoke ==='
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-intent-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-approval-gate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-source-refs-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-text-plan-ref-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-image-asset-ref-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-audio-asset-ref-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-video-clip-ref-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-timeline-manifest-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-scene-order-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-duration-budget-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-resolution-budget-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-size-budget-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-cost-budget-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-privacy-gate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-safety-gate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-lineage-packet-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-audit-packet-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-observability-trace-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-result-preview-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-result-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-export-block-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-publish-block-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-worker-dispatch-block-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-render-execution-block-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-idempotency-key-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-replay-block-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-retry-policy-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-fallback-policy-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-backend-runtime-check-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-operator-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-controlled-render-artifact-assembly-trial-completion.ps1') -BaseUrl $BaseUrl
Write-Host '[OK] CodexForge Controlled Render Artifact Assembly Trial Mega Batch smoke passed.'
