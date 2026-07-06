param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3539 Video Provider Adapter Readiness Response Envelope Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-response-envelope-wiring.ps1' -Route 'video-provider-adapter-readiness-response-envelope-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Response Envelope Wiring' -RouteHref '/video-provider-adapter-readiness-response-envelope-wiring' -Phase '3539' -Title 'Video Provider Adapter Readiness Response Envelope Wiring'