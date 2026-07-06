param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3463 Video Provider Runtime Execution Block Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-execution-block-wiring.ps1' -Route 'video-provider-runtime-execution-block-wiring' -CommandLabel 'Go to Video Provider Runtime Execution Block Wiring' -RouteHref '/video-provider-runtime-execution-block-wiring' -Phase '3463' -Title 'Video Provider Runtime Execution Block Wiring'

