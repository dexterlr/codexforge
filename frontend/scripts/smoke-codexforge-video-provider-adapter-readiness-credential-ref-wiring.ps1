param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3534 Video Provider Adapter Readiness Credential Ref Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-credential-ref-wiring.ps1' -Route 'video-provider-adapter-readiness-credential-ref-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Credential Ref Wiring' -RouteHref '/video-provider-adapter-readiness-credential-ref-wiring' -Phase '3534' -Title 'Video Provider Adapter Readiness Credential Ref Wiring'