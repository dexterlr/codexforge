param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3404 Controlled Render Artifact Publish Approval Gate Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-approval-gate-wiring.ps1' -Route 'controlled-render-artifact-publish-approval-gate-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Approval Gate Wiring' -RouteHref '/controlled-render-artifact-publish-approval-gate-wiring' -Phase '3404' -Title 'Controlled Render Artifact Publish Approval Gate Wiring'
