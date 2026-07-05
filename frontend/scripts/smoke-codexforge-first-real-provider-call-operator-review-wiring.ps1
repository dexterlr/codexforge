param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3047 First Real Provider Call Operator Review Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-operator-review-wiring.ps1' `
  -Route 'first-real-provider-call-operator-review-wiring' `
  -CommandLabel 'Go to First Real Provider Call Operator Review Wiring' `
  -RouteHref '/first-real-provider-call-operator-review-wiring' `
  -Phase '3047' `
  -Title 'First Real Provider Call Operator Review Wiring'
