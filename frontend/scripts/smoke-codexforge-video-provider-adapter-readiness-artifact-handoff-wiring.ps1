param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3552 Video Provider Adapter Readiness Artifact Handoff Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-artifact-handoff-wiring.ps1' -Route 'video-provider-adapter-readiness-artifact-handoff-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Artifact Handoff Wiring' -RouteHref '/video-provider-adapter-readiness-artifact-handoff-wiring' -Phase '3552' -Title 'Video Provider Adapter Readiness Artifact Handoff Wiring'