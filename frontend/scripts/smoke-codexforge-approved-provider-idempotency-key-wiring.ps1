param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-approved-provider-execution-bridge-smoke-helper.ps1')

Invoke-CodexForgeFirstApprovedProviderExecutionBridgeSmoke `
  -SmokeName 'Phase 2965 Approved Provider Idempotency Key Wiring' `
  -ScriptFile 'smoke-codexforge-approved-provider-idempotency-key-wiring.ps1' `
  -Route 'approved-provider-idempotency-key-wiring' `
  -CommandLabel 'Go to Approved Provider Idempotency Key Wiring' `
  -RouteHref '/approved-provider-idempotency-key-wiring' `
  -Phase '2965' `
  -Title 'Approved Provider Idempotency Key Wiring'
