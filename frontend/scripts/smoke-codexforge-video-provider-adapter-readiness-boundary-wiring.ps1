param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3530 Video Provider Adapter Readiness Boundary Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-boundary-wiring.ps1' -Route 'video-provider-adapter-readiness-boundary-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Boundary Wiring' -RouteHref '/video-provider-adapter-readiness-boundary-wiring' -Phase '3530' -Title 'Video Provider Adapter Readiness Boundary Wiring'