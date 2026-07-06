param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3391 Controlled Render Artifact Export Platform Upload Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-platform-upload-block-wiring.ps1' -Route 'controlled-render-artifact-export-platform-upload-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Platform Upload Block Wiring' -RouteHref '/controlled-render-artifact-export-platform-upload-block-wiring' -Phase '3391' -Title 'Controlled Render Artifact Export Platform Upload Block Wiring'