param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3550 Video Provider Adapter Readiness Observability Trace Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-observability-trace-wiring.ps1' -Route 'video-provider-adapter-readiness-observability-trace-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Observability Trace Wiring' -RouteHref '/video-provider-adapter-readiness-observability-trace-wiring' -Phase '3550' -Title 'Video Provider Adapter Readiness Observability Trace Wiring'