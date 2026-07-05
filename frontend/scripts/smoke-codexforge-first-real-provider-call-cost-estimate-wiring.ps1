param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3030 First Real Provider Call Cost Estimate Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-cost-estimate-wiring.ps1' `
  -Route 'first-real-provider-call-cost-estimate-wiring' `
  -CommandLabel 'Go to First Real Provider Call Cost Estimate Wiring' `
  -RouteHref '/first-real-provider-call-cost-estimate-wiring' `
  -Phase '3030' `
  -Title 'First Real Provider Call Cost Estimate Wiring'
