param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3398 Controlled Render Artifact Export Fallback Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-fallback-policy-wiring.ps1' -Route 'controlled-render-artifact-export-fallback-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Fallback Policy Wiring' -RouteHref '/controlled-render-artifact-export-fallback-policy-wiring' -Phase '3398' -Title 'Controlled Render Artifact Export Fallback Policy Wiring'