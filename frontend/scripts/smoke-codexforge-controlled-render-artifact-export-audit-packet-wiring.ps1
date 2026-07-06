param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3384 Controlled Render Artifact Export Audit Packet Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-audit-packet-wiring.ps1' -Route 'controlled-render-artifact-export-audit-packet-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Audit Packet Wiring' -RouteHref '/controlled-render-artifact-export-audit-packet-wiring' -Phase '3384' -Title 'Controlled Render Artifact Export Audit Packet Wiring'