param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3036 First Real Provider Call Timeout Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-timeout-policy-wiring.ps1' `
  -Route 'first-real-provider-call-timeout-policy-wiring' `
  -CommandLabel 'Go to First Real Provider Call Timeout Policy Wiring' `
  -RouteHref '/first-real-provider-call-timeout-policy-wiring' `
  -Phase '3036' `
  -Title 'First Real Provider Call Timeout Policy Wiring'
