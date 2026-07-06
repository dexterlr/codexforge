param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-publish-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactPublishReviewTrialBatchSmoke -SmokeName 'Phase 3405 Controlled Render Artifact Publish Source Export Ref Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-publish-source-export-ref-wiring.ps1' -Route 'controlled-render-artifact-publish-source-export-ref-wiring' -CommandLabel 'Go to Controlled Render Artifact Publish Source Export Ref Wiring' -RouteHref '/controlled-render-artifact-publish-source-export-ref-wiring' -Phase '3405' -Title 'Controlled Render Artifact Publish Source Export Ref Wiring'
