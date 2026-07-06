param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3531 Video Provider Adapter Readiness Intent Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-intent-wiring.ps1' -Route 'video-provider-adapter-readiness-intent-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Intent Wiring' -RouteHref '/video-provider-adapter-readiness-intent-wiring' -Phase '3531' -Title 'Video Provider Adapter Readiness Intent Wiring'