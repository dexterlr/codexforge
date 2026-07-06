param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3497 Video Provider Dry Run Completion' -ScriptFile 'smoke-codexforge-video-provider-dry-run-completion.ps1' -Route 'video-provider-dry-run-completion' -CommandLabel 'Go to Video Provider Dry Run Completion' -RouteHref '/video-provider-dry-run-completion' -Phase '3497' -Title 'Video Provider Dry Run Completion'
