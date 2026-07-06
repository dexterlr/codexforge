param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3453 Video Provider Runtime Result Capture Readiness Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-result-capture-readiness-wiring.ps1' -Route 'video-provider-runtime-result-capture-readiness-wiring' -CommandLabel 'Go to Video Provider Runtime Result Capture Readiness Wiring' -RouteHref '/video-provider-runtime-result-capture-readiness-wiring' -Phase '3453' -Title 'Video Provider Runtime Result Capture Readiness Wiring'

