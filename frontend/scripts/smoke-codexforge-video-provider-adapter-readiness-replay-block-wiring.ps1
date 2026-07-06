param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3556 Video Provider Adapter Readiness Replay Block Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-replay-block-wiring.ps1' -Route 'video-provider-adapter-readiness-replay-block-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Replay Block Wiring' -RouteHref '/video-provider-adapter-readiness-replay-block-wiring' -Phase '3556' -Title 'Video Provider Adapter Readiness Replay Block Wiring'