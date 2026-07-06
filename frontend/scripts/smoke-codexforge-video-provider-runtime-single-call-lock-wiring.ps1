param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3456 Video Provider Runtime Single Call Lock Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-single-call-lock-wiring.ps1' -Route 'video-provider-runtime-single-call-lock-wiring' -CommandLabel 'Go to Video Provider Runtime Single Call Lock Wiring' -RouteHref '/video-provider-runtime-single-call-lock-wiring' -Phase '3456' -Title 'Video Provider Runtime Single Call Lock Wiring'

