param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3535 Video Provider Adapter Readiness Token Ref Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-token-ref-wiring.ps1' -Route 'video-provider-adapter-readiness-token-ref-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Token Ref Wiring' -RouteHref '/video-provider-adapter-readiness-token-ref-wiring' -Phase '3535' -Title 'Video Provider Adapter Readiness Token Ref Wiring'