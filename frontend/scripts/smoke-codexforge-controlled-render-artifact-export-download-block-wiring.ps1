param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3388 Controlled Render Artifact Export Download Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-download-block-wiring.ps1' -Route 'controlled-render-artifact-export-download-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Download Block Wiring' -RouteHref '/controlled-render-artifact-export-download-block-wiring' -Phase '3388' -Title 'Controlled Render Artifact Export Download Block Wiring'