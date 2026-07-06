param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3561 Video Provider Adapter Readiness Completion' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-completion.ps1' -Route 'video-provider-adapter-readiness-completion' -CommandLabel 'Go to Video Provider Adapter Readiness Completion' -RouteHref '/video-provider-adapter-readiness-completion' -Phase '3561' -Title 'Video Provider Adapter Readiness Completion'