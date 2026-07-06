param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3460 Video Provider Runtime Fallback Policy Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-fallback-policy-wiring.ps1' -Route 'video-provider-runtime-fallback-policy-wiring' -CommandLabel 'Go to Video Provider Runtime Fallback Policy Wiring' -RouteHref '/video-provider-runtime-fallback-policy-wiring' -Phase '3460' -Title 'Video Provider Runtime Fallback Policy Wiring'

