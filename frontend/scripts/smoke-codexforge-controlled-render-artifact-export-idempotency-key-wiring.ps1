param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-controlled-render-artifact-export-review-trial-batch-smoke-helper.ps1')
Invoke-CodexForgeControlledRenderArtifactExportReviewTrialBatchSmoke -SmokeName 'Phase 3395 Controlled Render Artifact Export Idempotency Key Wiring' -ScriptFile 'smoke-codexforge-controlled-render-artifact-export-idempotency-key-wiring.ps1' -Route 'controlled-render-artifact-export-idempotency-key-wiring' -CommandLabel 'Go to Controlled Render Artifact Export Idempotency Key Wiring' -RouteHref '/controlled-render-artifact-export-idempotency-key-wiring' -Phase '3395' -Title 'Controlled Render Artifact Export Idempotency Key Wiring'