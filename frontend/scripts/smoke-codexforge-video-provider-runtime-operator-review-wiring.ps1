param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-runtime-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderRuntimeReadinessBatchSmoke -SmokeName 'Phase 3464 Video Provider Runtime Operator Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-runtime-operator-review-wiring.ps1' -Route 'video-provider-runtime-operator-review-wiring' -CommandLabel 'Go to Video Provider Runtime Operator Review Wiring' -RouteHref '/video-provider-runtime-operator-review-wiring' -Phase '3464' -Title 'Video Provider Runtime Operator Review Wiring'

