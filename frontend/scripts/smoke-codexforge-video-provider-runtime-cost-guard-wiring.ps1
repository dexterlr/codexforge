param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3444 Video Provider Runtime Cost Guard Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-cost-guard-wiring.ps1' -Route 'video-provider-runtime-cost-guard-wiring' -CommandLabel 'Go to Video Provider Runtime Cost Guard Wiring' -RouteHref '/video-provider-runtime-cost-guard-wiring' -Phase '3444' -Title 'Video Provider Runtime Cost Guard Wiring'

