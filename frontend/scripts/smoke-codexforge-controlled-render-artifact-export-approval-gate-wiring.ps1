param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3372 Controlled Render Artifact Export Approval Gate Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-approval-gate-wiring.ps1' -Route 'controlled-render-artifact-export-approval-gate-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Approval Gate Wiring' -RouteHref '/controlled-render-artifact-export-approval-gate-wiring' -Phase '3372' -Title 'Controlled Render Artifact Export Approval Gate Wiring'