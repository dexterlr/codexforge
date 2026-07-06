param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3488 Video Provider Dry Run Artifact Handoff Readiness Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-artifact-handoff-readiness-wiring.ps1' -Route 'video-provider-dry-run-artifact-handoff-readiness-wiring' -CommandLabel 'Go to Video Provider Dry Run Artifact Handoff Readiness Wiring' -RouteHref '/video-provider-dry-run-artifact-handoff-readiness-wiring' -Phase '3488' -Title 'Video Provider Dry Run Artifact Handoff Readiness Wiring'
