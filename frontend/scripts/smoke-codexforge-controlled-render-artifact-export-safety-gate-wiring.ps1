param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3382 Controlled Render Artifact Export Safety Gate Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-safety-gate-wiring.ps1' -Route 'controlled-render-artifact-export-safety-gate-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Safety Gate Wiring' -RouteHref '/controlled-render-artifact-export-safety-gate-wiring' -Phase '3382' -Title 'Controlled Render Artifact Export Safety Gate Wiring'