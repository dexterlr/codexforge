param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3438 Video Provider Runtime Credential Reference Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-credential-reference-wiring.ps1' -Route 'video-provider-runtime-credential-reference-wiring' -CommandLabel 'Go to Video Provider Runtime Credential Reference Wiring' -RouteHref '/video-provider-runtime-credential-reference-wiring' -Phase '3438' -Title 'Video Provider Runtime Credential Reference Wiring'

