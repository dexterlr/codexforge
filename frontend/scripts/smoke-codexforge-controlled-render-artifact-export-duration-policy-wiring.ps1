param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3378 Controlled Render Artifact Export Duration Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-duration-policy-wiring.ps1' -Route 'controlled-render-artifact-export-duration-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Duration Policy Wiring' -RouteHref '/controlled-render-artifact-export-duration-policy-wiring' -Phase '3378' -Title 'Controlled Render Artifact Export Duration Policy Wiring'