param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3465 Video Provider Runtime Readiness Completion' -ScriptFile 'smoke-codexforge-video-provider-runtime-readiness-completion.ps1' -Route 'video-provider-runtime-readiness-completion' -CommandLabel 'Go to Video Provider Runtime Readiness Completion' -RouteHref '/video-provider-runtime-readiness-completion' -Phase '3465' -Title 'Video Provider Runtime Readiness Completion'

