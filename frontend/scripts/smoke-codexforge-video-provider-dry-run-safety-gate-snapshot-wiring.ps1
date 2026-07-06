param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3481 Video Provider Dry Run Safety Gate Snapshot Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-safety-gate-snapshot-wiring.ps1' -Route 'video-provider-dry-run-safety-gate-snapshot-wiring' -CommandLabel 'Go to Video Provider Dry Run Safety Gate Snapshot Wiring' -RouteHref '/video-provider-dry-run-safety-gate-snapshot-wiring' -Phase '3481' -Title 'Video Provider Dry Run Safety Gate Snapshot Wiring'
