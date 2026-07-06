param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3427 Controlled Render Artifact Publish Idempotency Key Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-idempotency-key-wiring.ps1' -Route 'controlled-render-artifact-publish-idempotency-key-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Idempotency Key Wiring' -RouteHref '/controlled-render-artifact-publish-idempotency-key-wiring' -Phase '3427' -Title 'Controlled Render Artifact Publish Idempotency Key Wiring'
