param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3551 Video Provider Adapter Readiness Result Capture Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-result-capture-wiring.ps1' -Route 'video-provider-adapter-readiness-result-capture-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Result Capture Wiring' -RouteHref '/video-provider-adapter-readiness-result-capture-wiring' -Phase '3551' -Title 'Video Provider Adapter Readiness Result Capture Wiring'