param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3440 Video Provider Runtime Request Envelope Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-request-envelope-wiring.ps1' -Route 'video-provider-runtime-request-envelope-wiring' -CommandLabel 'Go to Video Provider Runtime Request Envelope Wiring' -RouteHref '/video-provider-runtime-request-envelope-wiring' -Phase '3440' -Title 'Video Provider Runtime Request Envelope Wiring'

