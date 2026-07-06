param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3449 Video Provider Runtime Safety Gate Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-safety-gate-wiring.ps1' -Route 'video-provider-runtime-safety-gate-wiring' -CommandLabel 'Go to Video Provider Runtime Safety Gate Wiring' -RouteHref '/video-provider-runtime-safety-gate-wiring' -Phase '3449' -Title 'Video Provider Runtime Safety Gate Wiring'

