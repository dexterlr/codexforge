param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3560 Video Provider Adapter Readiness Operator Review Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-operator-review-wiring.ps1' -Route 'video-provider-adapter-readiness-operator-review-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Operator Review Wiring' -RouteHref '/video-provider-adapter-readiness-operator-review-wiring' -Phase '3560' -Title 'Video Provider Adapter Readiness Operator Review Wiring'