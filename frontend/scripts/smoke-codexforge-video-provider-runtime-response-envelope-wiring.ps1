param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3441 Video Provider Runtime Response Envelope Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-response-envelope-wiring.ps1' -Route 'video-provider-runtime-response-envelope-wiring' -CommandLabel 'Go to Video Provider Runtime Response Envelope Wiring' -RouteHref '/video-provider-runtime-response-envelope-wiring' -Phase '3441' -Title 'Video Provider Runtime Response Envelope Wiring'

