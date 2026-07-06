param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3447 Video Provider Runtime Duration Resolution Size Cap Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-duration-resolution-size-cap-wiring.ps1' -Route 'video-provider-runtime-duration-resolution-size-cap-wiring' -CommandLabel 'Go to Video Provider Runtime Duration Resolution Size Cap Wiring' -RouteHref '/video-provider-runtime-duration-resolution-size-cap-wiring' -Phase '3447' -Title 'Video Provider Runtime Duration Resolution Size Cap Wiring'

