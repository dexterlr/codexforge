param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3547 Video Provider Adapter Readiness Safety Gate Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-safety-gate-wiring.ps1' -Route 'video-provider-adapter-readiness-safety-gate-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Safety Gate Wiring' -RouteHref '/video-provider-adapter-readiness-safety-gate-wiring' -Phase '3547' -Title 'Video Provider Adapter Readiness Safety Gate Wiring'