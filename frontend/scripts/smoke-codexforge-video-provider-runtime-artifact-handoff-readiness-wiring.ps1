param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3454 Video Provider Runtime Artifact Handoff Readiness Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-artifact-handoff-readiness-wiring.ps1' -Route 'video-provider-runtime-artifact-handoff-readiness-wiring' -CommandLabel 'Go to Video Provider Runtime Artifact Handoff Readiness Wiring' -RouteHref '/video-provider-runtime-artifact-handoff-readiness-wiring' -Phase '3454' -Title 'Video Provider Runtime Artifact Handoff Readiness Wiring'

