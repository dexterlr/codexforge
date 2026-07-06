param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3553 Video Provider Adapter Readiness Kill Switch Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-kill-switch-wiring.ps1' -Route 'video-provider-adapter-readiness-kill-switch-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Kill Switch Wiring' -RouteHref '/video-provider-adapter-readiness-kill-switch-wiring' -Phase '3553' -Title 'Video Provider Adapter Readiness Kill Switch Wiring'