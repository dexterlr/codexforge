param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3386 Controlled Render Artifact Export Result Preview Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-result-preview-wiring.ps1' -Route 'controlled-render-artifact-export-result-preview-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Result Preview Wiring' -RouteHref '/controlled-render-artifact-export-result-preview-wiring' -Phase '3386' -Title 'Controlled Render Artifact Export Result Preview Wiring'