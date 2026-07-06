param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3543 Video Provider Adapter Readiness Rate Guard Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-rate-guard-wiring.ps1' -Route 'video-provider-adapter-readiness-rate-guard-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Rate Guard Wiring' -RouteHref '/video-provider-adapter-readiness-rate-guard-wiring' -Phase '3543' -Title 'Video Provider Adapter Readiness Rate Guard Wiring'