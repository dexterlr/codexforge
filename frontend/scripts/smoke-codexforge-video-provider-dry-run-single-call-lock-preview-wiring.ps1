param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3490 Video Provider Dry Run Single Call Lock Preview Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-single-call-lock-preview-wiring.ps1' -Route 'video-provider-dry-run-single-call-lock-preview-wiring' -CommandLabel 'Go to Video Provider Dry Run Single Call Lock Preview Wiring' -RouteHref '/video-provider-dry-run-single-call-lock-preview-wiring' -Phase '3490' -Title 'Video Provider Dry Run Single Call Lock Preview Wiring'
