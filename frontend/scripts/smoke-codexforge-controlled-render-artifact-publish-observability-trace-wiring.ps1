param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3417 Controlled Render Artifact Publish Observability Trace Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-observability-trace-wiring.ps1' -Route 'controlled-render-artifact-publish-observability-trace-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Observability Trace Wiring' -RouteHref '/controlled-render-artifact-publish-observability-trace-wiring' -Phase '3417' -Title 'Controlled Render Artifact Publish Observability Trace Wiring'
