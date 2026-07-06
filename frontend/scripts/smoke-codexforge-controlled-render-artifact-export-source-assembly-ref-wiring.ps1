param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3373 Controlled Render Artifact Export Source Assembly Ref Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-source-assembly-ref-wiring.ps1' -Route 'controlled-render-artifact-export-source-assembly-ref-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Source Assembly Ref Wiring' -RouteHref '/controlled-render-artifact-export-source-assembly-ref-wiring' -Phase '3373' -Title 'Controlled Render Artifact Export Source Assembly Ref Wiring'