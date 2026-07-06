param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3439 Video Provider Runtime Token Reference Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-token-reference-wiring.ps1' -Route 'video-provider-runtime-token-reference-wiring' -CommandLabel 'Go to Video Provider Runtime Token Reference Wiring' -RouteHref '/video-provider-runtime-token-reference-wiring' -Phase '3439' -Title 'Video Provider Runtime Token Reference Wiring'

