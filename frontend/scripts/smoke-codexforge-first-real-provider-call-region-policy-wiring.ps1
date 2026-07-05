param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3034 First Real Provider Call Region Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-region-policy-wiring.ps1' `
  -Route 'first-real-provider-call-region-policy-wiring' `
  -CommandLabel 'Go to First Real Provider Call Region Policy Wiring' `
  -RouteHref '/first-real-provider-call-region-policy-wiring' `
  -Phase '3034' `
  -Title 'First Real Provider Call Region Policy Wiring'
