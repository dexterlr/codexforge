param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3559 Video Provider Adapter Readiness Backend Runtime Check Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-backend-runtime-check-wiring.ps1' -Route 'video-provider-adapter-readiness-backend-runtime-check-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Backend Runtime Check Wiring' -RouteHref '/video-provider-adapter-readiness-backend-runtime-check-wiring' -Phase '3559' -Title 'Video Provider Adapter Readiness Backend Runtime Check Wiring'