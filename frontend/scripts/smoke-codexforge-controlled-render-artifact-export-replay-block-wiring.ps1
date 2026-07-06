param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3396 Controlled Render Artifact Export Replay Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-replay-block-wiring.ps1' -Route 'controlled-render-artifact-export-replay-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Replay Block Wiring' -RouteHref '/controlled-render-artifact-export-replay-block-wiring' -Phase '3396' -Title 'Controlled Render Artifact Export Replay Block Wiring'