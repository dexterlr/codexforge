param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3546 Video Provider Adapter Readiness Privacy Gate Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-privacy-gate-wiring.ps1' -Route 'video-provider-adapter-readiness-privacy-gate-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Privacy Gate Wiring' -RouteHref '/video-provider-adapter-readiness-privacy-gate-wiring' -Phase '3546' -Title 'Video Provider Adapter Readiness Privacy Gate Wiring'