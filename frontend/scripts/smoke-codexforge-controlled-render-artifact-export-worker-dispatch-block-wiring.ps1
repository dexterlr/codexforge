param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3393 Controlled Render Artifact Export Worker Dispatch Block Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-worker-dispatch-block-wiring.ps1' -Route 'controlled-render-artifact-export-worker-dispatch-block-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Worker Dispatch Block Wiring' -RouteHref '/controlled-render-artifact-export-worker-dispatch-block-wiring' -Phase '3393' -Title 'Controlled Render Artifact Export Worker Dispatch Block Wiring'