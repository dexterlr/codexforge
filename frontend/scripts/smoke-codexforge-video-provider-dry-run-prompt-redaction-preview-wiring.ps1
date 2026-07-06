param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3474 Video Provider Dry Run Prompt Redaction Preview Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-prompt-redaction-preview-wiring.ps1' -Route 'video-provider-dry-run-prompt-redaction-preview-wiring' -CommandLabel 'Go to Video Provider Dry Run Prompt Redaction Preview Wiring' -RouteHref '/video-provider-dry-run-prompt-redaction-preview-wiring' -Phase '3474' -Title 'Video Provider Dry Run Prompt Redaction Preview Wiring'
