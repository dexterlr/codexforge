param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3462 Video Provider Runtime Server Only Boundary Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-server-only-boundary-wiring.ps1' -Route 'video-provider-runtime-server-only-boundary-wiring' -CommandLabel 'Go to Video Provider Runtime Server Only Boundary Wiring' -RouteHref '/video-provider-runtime-server-only-boundary-wiring' -Phase '3462' -Title 'Video Provider Runtime Server Only Boundary Wiring'

