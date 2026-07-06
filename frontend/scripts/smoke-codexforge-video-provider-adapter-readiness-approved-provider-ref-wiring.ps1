param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3533 Video Provider Adapter Readiness Approved Provider Ref Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-approved-provider-ref-wiring.ps1' -Route 'video-provider-adapter-readiness-approved-provider-ref-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Approved Provider Ref Wiring' -RouteHref '/video-provider-adapter-readiness-approved-provider-ref-wiring' -Phase '3533' -Title 'Video Provider Adapter Readiness Approved Provider Ref Wiring'