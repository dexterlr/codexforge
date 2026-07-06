param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3371 Controlled Render Artifact Export Intent Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-intent-wiring.ps1' -Route 'controlled-render-artifact-export-intent-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Intent Wiring' -RouteHref '/controlled-render-artifact-export-intent-wiring' -Phase '3371' -Title 'Controlled Render Artifact Export Intent Wiring'