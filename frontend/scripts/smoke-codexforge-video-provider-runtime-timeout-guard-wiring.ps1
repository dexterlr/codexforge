param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3446 Video Provider Runtime Timeout Guard Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-timeout-guard-wiring.ps1' -Route 'video-provider-runtime-timeout-guard-wiring' -CommandLabel 'Go to Video Provider Runtime Timeout Guard Wiring' -RouteHref '/video-provider-runtime-timeout-guard-wiring' -Phase '3446' -Title 'Video Provider Runtime Timeout Guard Wiring'

