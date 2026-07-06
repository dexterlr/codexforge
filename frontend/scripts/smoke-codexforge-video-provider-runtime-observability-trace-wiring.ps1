param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3452 Video Provider Runtime Observability Trace Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-observability-trace-wiring.ps1' -Route 'video-provider-runtime-observability-trace-wiring' -CommandLabel 'Go to Video Provider Runtime Observability Trace Wiring' -RouteHref '/video-provider-runtime-observability-trace-wiring' -Phase '3452' -Title 'Video Provider Runtime Observability Trace Wiring'

