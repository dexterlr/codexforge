param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3468 Video Provider Dry Run Approval Gate Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-approval-gate-wiring.ps1' -Route 'video-provider-dry-run-approval-gate-wiring' -CommandLabel 'Go to Video Provider Dry Run Approval Gate Wiring' -RouteHref '/video-provider-dry-run-approval-gate-wiring' -Phase '3468' -Title 'Video Provider Dry Run Approval Gate Wiring'
