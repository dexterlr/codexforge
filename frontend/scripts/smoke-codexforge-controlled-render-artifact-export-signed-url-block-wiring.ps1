param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3390 Controlled Render Artifact Export Signed URL Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-signed-url-block-wiring.ps1' -Route 'controlled-render-artifact-export-signed-url-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Signed URL Block Wiring' -RouteHref '/controlled-render-artifact-export-signed-url-block-wiring' -Phase '3390' -Title 'Controlled Render Artifact Export Signed URL Block Wiring'