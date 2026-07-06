param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3461 Video Provider Runtime Backend Check Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-backend-check-wiring.ps1' -Route 'video-provider-runtime-backend-check-wiring' -CommandLabel 'Go to Video Provider Runtime Backend Check Wiring' -RouteHref '/video-provider-runtime-backend-check-wiring' -Phase '3461' -Title 'Video Provider Runtime Backend Check Wiring'

