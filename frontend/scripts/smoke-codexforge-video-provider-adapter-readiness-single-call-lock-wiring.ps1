param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3554 Video Provider Adapter Readiness Single Call Lock Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-single-call-lock-wiring.ps1' -Route 'video-provider-adapter-readiness-single-call-lock-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Single Call Lock Wiring' -RouteHref '/video-provider-adapter-readiness-single-call-lock-wiring' -Phase '3554' -Title 'Video Provider Adapter Readiness Single Call Lock Wiring'