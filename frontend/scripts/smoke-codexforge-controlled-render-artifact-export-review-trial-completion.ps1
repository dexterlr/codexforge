param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3401 Controlled Render Artifact Export Review Trial Completion' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-review-trial-completion.ps1' -Route 'controlled-render-artifact-export-review-trial-completion' -CommandLabel 'Go to Controlled Render Artifact Export Review Trial Completion' -RouteHref '/controlled-render-artifact-export-review-trial-completion' -Phase '3401' -Title 'Controlled Render Artifact Export Review Trial Completion'