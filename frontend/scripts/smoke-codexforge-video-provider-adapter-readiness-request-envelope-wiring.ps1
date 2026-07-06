param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3538 Video Provider Adapter Readiness Request Envelope Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-request-envelope-wiring.ps1' -Route 'video-provider-adapter-readiness-request-envelope-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Request Envelope Wiring' -RouteHref '/video-provider-adapter-readiness-request-envelope-wiring' -Phase '3538' -Title 'Video Provider Adapter Readiness Request Envelope Wiring'