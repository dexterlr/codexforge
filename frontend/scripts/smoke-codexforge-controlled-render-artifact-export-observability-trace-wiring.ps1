param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3385 Controlled Render Artifact Export Observability Trace Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-observability-trace-wiring.ps1' -Route 'controlled-render-artifact-export-observability-trace-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Observability Trace Wiring' -RouteHref '/controlled-render-artifact-export-observability-trace-wiring' -Phase '3385' -Title 'Controlled Render Artifact Export Observability Trace Wiring'