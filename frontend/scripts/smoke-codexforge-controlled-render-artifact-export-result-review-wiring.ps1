param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3387 Controlled Render Artifact Export Result Review Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-result-review-wiring.ps1' -Route 'controlled-render-artifact-export-result-review-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Result Review Wiring' -RouteHref '/controlled-render-artifact-export-result-review-wiring' -Phase '3387' -Title 'Controlled Render Artifact Export Result Review Wiring'