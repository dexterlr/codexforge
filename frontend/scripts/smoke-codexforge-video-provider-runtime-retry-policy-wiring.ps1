param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3459 Video Provider Runtime Retry Policy Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-retry-policy-wiring.ps1' -Route 'video-provider-runtime-retry-policy-wiring' -CommandLabel 'Go to Video Provider Runtime Retry Policy Wiring' -RouteHref '/video-provider-runtime-retry-policy-wiring' -Phase '3459' -Title 'Video Provider Runtime Retry Policy Wiring'

