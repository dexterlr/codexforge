param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3383 Controlled Render Artifact Export Lineage Packet Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-lineage-packet-wiring.ps1' -Route 'controlled-render-artifact-export-lineage-packet-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Lineage Packet Wiring' -RouteHref '/controlled-render-artifact-export-lineage-packet-wiring' -Phase '3383' -Title 'Controlled Render Artifact Export Lineage Packet Wiring'