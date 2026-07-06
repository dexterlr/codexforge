param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3448 Video Provider Runtime Privacy Gate Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-privacy-gate-wiring.ps1' -Route 'video-provider-runtime-privacy-gate-wiring' -CommandLabel 'Go to Video Provider Runtime Privacy Gate Wiring' -RouteHref '/video-provider-runtime-privacy-gate-wiring' -Phase '3448' -Title 'Video Provider Runtime Privacy Gate Wiring'

