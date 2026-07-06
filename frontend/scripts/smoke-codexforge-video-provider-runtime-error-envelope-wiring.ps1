param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3442 Video Provider Runtime Error Envelope Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-error-envelope-wiring.ps1' -Route 'video-provider-runtime-error-envelope-wiring' -CommandLabel 'Go to Video Provider Runtime Error Envelope Wiring' -RouteHref '/video-provider-runtime-error-envelope-wiring' -Phase '3442' -Title 'Video Provider Runtime Error Envelope Wiring'

