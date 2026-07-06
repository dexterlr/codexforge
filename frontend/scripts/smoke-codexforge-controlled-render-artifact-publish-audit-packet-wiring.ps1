param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3416 Controlled Render Artifact Publish Audit Packet Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-audit-packet-wiring.ps1' -Route 'controlled-render-artifact-publish-audit-packet-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Audit Packet Wiring' -RouteHref '/controlled-render-artifact-publish-audit-packet-wiring' -Phase '3416' -Title 'Controlled Render Artifact Publish Audit Packet Wiring'
