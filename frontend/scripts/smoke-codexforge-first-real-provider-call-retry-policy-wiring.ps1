param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3037 First Real Provider Call Retry Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-retry-policy-wiring.ps1' `
  -Route 'first-real-provider-call-retry-policy-wiring' `
  -CommandLabel 'Go to First Real Provider Call Retry Policy Wiring' `
  -RouteHref '/first-real-provider-call-retry-policy-wiring' `
  -Phase '3037' `
  -Title 'First Real Provider Call Retry Policy Wiring'
