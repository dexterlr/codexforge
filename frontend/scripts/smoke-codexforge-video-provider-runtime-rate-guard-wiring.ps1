param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3445 Video Provider Runtime Rate Guard Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-rate-guard-wiring.ps1' -Route 'video-provider-runtime-rate-guard-wiring' -CommandLabel 'Go to Video Provider Runtime Rate Guard Wiring' -RouteHref '/video-provider-runtime-rate-guard-wiring' -Phase '3445' -Title 'Video Provider Runtime Rate Guard Wiring'

