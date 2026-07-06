param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3377 Controlled Render Artifact Export Resolution Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-resolution-policy-wiring.ps1' -Route 'controlled-render-artifact-export-resolution-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Resolution Policy Wiring' -RouteHref '/controlled-render-artifact-export-resolution-policy-wiring' -Phase '3377' -Title 'Controlled Render Artifact Export Resolution Policy Wiring'