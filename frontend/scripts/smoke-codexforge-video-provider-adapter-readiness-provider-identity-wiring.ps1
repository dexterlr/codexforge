param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3532 Video Provider Adapter Readiness Provider Identity Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-provider-identity-wiring.ps1' -Route 'video-provider-adapter-readiness-provider-identity-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Provider Identity Wiring' -RouteHref '/video-provider-adapter-readiness-provider-identity-wiring' -Phase '3532' -Title 'Video Provider Adapter Readiness Provider Identity Wiring'