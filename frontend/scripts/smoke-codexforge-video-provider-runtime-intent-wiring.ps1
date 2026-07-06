param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3435 Video Provider Runtime Intent Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-intent-wiring.ps1' -Route 'video-provider-runtime-intent-wiring' -CommandLabel 'Go to Video Provider Runtime Intent Wiring' -RouteHref '/video-provider-runtime-intent-wiring' -Phase '3435' -Title 'Video Provider Runtime Intent Wiring'

