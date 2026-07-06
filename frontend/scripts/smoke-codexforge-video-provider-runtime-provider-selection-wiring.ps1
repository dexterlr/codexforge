param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3437 Video Provider Runtime Provider Selection Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-provider-selection-wiring.ps1' -Route 'video-provider-runtime-provider-selection-wiring' -CommandLabel 'Go to Video Provider Runtime Provider Selection Wiring' -RouteHref '/video-provider-runtime-provider-selection-wiring' -Phase '3437' -Title 'Video Provider Runtime Provider Selection Wiring'

