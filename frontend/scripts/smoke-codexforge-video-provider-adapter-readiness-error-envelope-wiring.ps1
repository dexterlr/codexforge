param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3540 Video Provider Adapter Readiness Error Envelope Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-error-envelope-wiring.ps1' -Route 'video-provider-adapter-readiness-error-envelope-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Error Envelope Wiring' -RouteHref '/video-provider-adapter-readiness-error-envelope-wiring' -Phase '3540' -Title 'Video Provider Adapter Readiness Error Envelope Wiring'