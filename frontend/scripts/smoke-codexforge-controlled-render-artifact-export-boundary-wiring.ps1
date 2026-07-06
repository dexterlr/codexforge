param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3370 Controlled Render Artifact Export Boundary Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-boundary-wiring.ps1' -Route 'controlled-render-artifact-export-boundary-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Boundary Wiring' -RouteHref '/controlled-render-artifact-export-boundary-wiring' -Phase '3370' -Title 'Controlled Render Artifact Export Boundary Wiring'