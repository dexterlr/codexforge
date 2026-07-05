param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3031 First Real Provider Call Rate Estimate Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-rate-estimate-wiring.ps1' `
  -Route 'first-real-provider-call-rate-estimate-wiring' `
  -CommandLabel 'Go to First Real Provider Call Rate Estimate Wiring' `
  -RouteHref '/first-real-provider-call-rate-estimate-wiring' `
  -Phase '3031' `
  -Title 'First Real Provider Call Rate Estimate Wiring'
