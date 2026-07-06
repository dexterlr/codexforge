param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-video-provider-execution-dry-run-batch-smoke-helper.ps1')
Invoke-CodexForgeVideoProviderExecutionDryRunBatchSmoke -SmokeName 'Phase 3489 Video Provider Dry Run Kill Switch Enforcement Wiring' -ScriptFile 'smoke-codexforge-video-provider-dry-run-kill-switch-enforcement-wiring.ps1' -Route 'video-provider-dry-run-kill-switch-enforcement-wiring' -CommandLabel 'Go to Video Provider Dry Run Kill Switch Enforcement Wiring' -RouteHref '/video-provider-dry-run-kill-switch-enforcement-wiring' -Phase '3489' -Title 'Video Provider Dry Run Kill Switch Enforcement Wiring'
