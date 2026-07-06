param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3480 Video Provider Dry Run Privacy Gate Snapshot Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-privacy-gate-snapshot-wiring.ps1' -Route 'video-provider-dry-run-privacy-gate-snapshot-wiring' -CommandLabel 'Go to Video Provider Dry Run Privacy Gate Snapshot Wiring' -RouteHref '/video-provider-dry-run-privacy-gate-snapshot-wiring' -Phase '3480' -Title 'Video Provider Dry Run Privacy Gate Snapshot Wiring'
