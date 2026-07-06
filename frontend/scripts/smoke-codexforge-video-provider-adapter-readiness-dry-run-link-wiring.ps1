param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-adapter-readiness-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionAdapterReadinessBatchSmoke -SmokeName 'Phase 3536 Video Provider Adapter Readiness Dry Run Link Wiring' -ScriptFile 'smoke-codexforge-video-provider-adapter-readiness-dry-run-link-wiring.ps1' -Route 'video-provider-adapter-readiness-dry-run-link-wiring' -CommandLabel 'Go to Video Provider Adapter Readiness Dry Run Link Wiring' -RouteHref '/video-provider-adapter-readiness-dry-run-link-wiring' -Phase '3536' -Title 'Video Provider Adapter Readiness Dry Run Link Wiring'