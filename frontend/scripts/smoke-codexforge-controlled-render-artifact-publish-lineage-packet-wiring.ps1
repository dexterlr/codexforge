param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3415 Controlled Render Artifact Publish Lineage Packet Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-lineage-packet-wiring.ps1' -Route 'controlled-render-artifact-publish-lineage-packet-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Lineage Packet Wiring' -RouteHref '/controlled-render-artifact-publish-lineage-packet-wiring' -Phase '3415' -Title 'Controlled Render Artifact Publish Lineage Packet Wiring'
