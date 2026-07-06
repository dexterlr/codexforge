param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3414 Controlled Render Artifact Publish Safety Gate Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-safety-gate-wiring.ps1' -Route 'controlled-render-artifact-publish-safety-gate-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Safety Gate Wiring' -RouteHref '/controlled-render-artifact-publish-safety-gate-wiring' -Phase '3414' -Title 'Controlled Render Artifact Publish Safety Gate Wiring'
