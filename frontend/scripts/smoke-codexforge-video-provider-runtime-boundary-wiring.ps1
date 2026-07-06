param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3434 Video Provider Runtime Boundary Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-boundary-wiring.ps1' -Route 'video-provider-runtime-boundary-wiring' -CommandLabel 'Go to Video Provider Runtime Boundary Wiring' -RouteHref '/video-provider-runtime-boundary-wiring' -Phase '3434' -Title 'Video Provider Runtime Boundary Wiring'

