param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2985 First Approved Provider Execution Bridge Completion' `
  -ScriptFile 'smoke-codexforge-first-approved-provider-execution-bridge-completion.ps1' `
  -Route 'first-approved-provider-execution-bridge-completion' `
  -CommandLabel 'Go to First Approved Provider Execution Bridge Completion' `
  -RouteHref '/first-approved-provider-execution-bridge-completion' `
  -Phase '2985' `
  -Title 'First Approved Provider Execution Bridge Completion'
