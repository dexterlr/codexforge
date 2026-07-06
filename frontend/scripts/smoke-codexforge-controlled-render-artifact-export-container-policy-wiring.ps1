param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3375 Controlled Render Artifact Export Container Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-container-policy-wiring.ps1' -Route 'controlled-render-artifact-export-container-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Container Policy Wiring' -RouteHref '/controlled-render-artifact-export-container-policy-wiring' -Phase '3375' -Title 'Controlled Render Artifact Export Container Policy Wiring'