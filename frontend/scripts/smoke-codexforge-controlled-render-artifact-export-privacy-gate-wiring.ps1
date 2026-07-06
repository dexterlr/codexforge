param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3381 Controlled Render Artifact Export Privacy Gate Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-privacy-gate-wiring.ps1' -Route 'controlled-render-artifact-export-privacy-gate-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Privacy Gate Wiring' -RouteHref '/controlled-render-artifact-export-privacy-gate-wiring' -Phase '3381' -Title 'Controlled Render Artifact Export Privacy Gate Wiring'