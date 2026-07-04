param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2964 Approved Provider Replay Block Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-replay-block-wiring.ps1' `
  -Route 'approved-provider-replay-block-wiring' `
  -CommandLabel 'Go to Approved Provider Replay Block Wiring' `
  -RouteHref '/approved-provider-replay-block-wiring' `
  -Phase '2964' `
  -Title 'Approved Provider Replay Block Wiring'
