param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3541 Video Provider Adapter Readiness Prompt Redaction Gate Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-prompt-redaction-gate-wiring.ps1' -Route 'video-provider-adapter-readiness-prompt-redaction-gate-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Prompt Redaction Gate Wiring' -RouteHref '/video-provider-adapter-readiness-prompt-redaction-gate-wiring' -Phase '3541' -Title 'Video Provider Adapter Readiness Prompt Redaction Gate Wiring'