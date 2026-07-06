param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3458 Video Provider Runtime Replay Block Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-replay-block-wiring.ps1' -Route 'video-provider-runtime-replay-block-wiring' -CommandLabel 'Go to Video Provider Runtime Replay Block Wiring' -RouteHref '/video-provider-runtime-replay-block-wiring' -Phase '3458' -Title 'Video Provider Runtime Replay Block Wiring'

