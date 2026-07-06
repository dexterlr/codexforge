param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3400 Controlled Render Artifact Export Operator Review Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-operator-review-wiring.ps1' -Route 'controlled-render-artifact-export-operator-review-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Operator Review Wiring' -RouteHref '/controlled-render-artifact-export-operator-review-wiring' -Phase '3400' -Title 'Controlled Render Artifact Export Operator Review Wiring'