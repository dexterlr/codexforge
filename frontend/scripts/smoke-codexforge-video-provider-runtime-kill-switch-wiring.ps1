param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3455 Video Provider Runtime Kill Switch Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-kill-switch-wiring.ps1' -Route 'video-provider-runtime-kill-switch-wiring' -CommandLabel 'Go to Video Provider Runtime Kill Switch Wiring' -RouteHref '/video-provider-runtime-kill-switch-wiring' -Phase '3455' -Title 'Video Provider Runtime Kill Switch Wiring'

