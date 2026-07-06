param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3399 Controlled Render Artifact Export Backend Runtime Check Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-backend-runtime-check-wiring.ps1' -Route 'controlled-render-artifact-export-backend-runtime-check-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Backend Runtime Check Wiring' -RouteHref '/controlled-render-artifact-export-backend-runtime-check-wiring' -Phase '3399' -Title 'Controlled Render Artifact Export Backend Runtime Check Wiring'