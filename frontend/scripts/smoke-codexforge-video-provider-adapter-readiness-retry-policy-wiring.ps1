param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3557 Video Provider Adapter Readiness Retry Policy Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-retry-policy-wiring.ps1' -Route 'video-provider-adapter-readiness-retry-policy-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Retry Policy Wiring' -RouteHref '/video-provider-adapter-readiness-retry-policy-wiring' -Phase '3557' -Title 'Video Provider Adapter Readiness Retry Policy Wiring'