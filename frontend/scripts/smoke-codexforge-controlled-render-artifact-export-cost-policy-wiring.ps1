param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3380 Controlled Render Artifact Export Cost Policy Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-cost-policy-wiring.ps1' -Route 'controlled-render-artifact-export-cost-policy-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Cost Policy Wiring' -RouteHref '/controlled-render-artifact-export-cost-policy-wiring' -Phase '3380' -Title 'Controlled Render Artifact Export Cost Policy Wiring'