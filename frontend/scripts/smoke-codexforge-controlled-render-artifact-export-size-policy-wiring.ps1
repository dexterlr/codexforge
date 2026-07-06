param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3379 Controlled Render Artifact Export Size Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-size-policy-wiring.ps1' -Route 'controlled-render-artifact-export-size-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Size Policy Wiring' -RouteHref '/controlled-render-artifact-export-size-policy-wiring' -Phase '3379' -Title 'Controlled Render Artifact Export Size Policy Wiring'