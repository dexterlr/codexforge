param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3544 Video Provider Adapter Readiness Timeout Guard Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-timeout-guard-wiring.ps1' -Route 'video-provider-adapter-readiness-timeout-guard-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Timeout Guard Wiring' -RouteHref '/video-provider-adapter-readiness-timeout-guard-wiring' -Phase '3544' -Title 'Video Provider Adapter Readiness Timeout Guard Wiring'