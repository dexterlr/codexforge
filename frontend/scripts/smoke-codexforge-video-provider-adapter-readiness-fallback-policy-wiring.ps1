param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3558 Video Provider Adapter Readiness Fallback Policy Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-fallback-policy-wiring.ps1' -Route 'video-provider-adapter-readiness-fallback-policy-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Fallback Policy Wiring' -RouteHref '/video-provider-adapter-readiness-fallback-policy-wiring' -Phase '3558' -Title 'Video Provider Adapter Readiness Fallback Policy Wiring'