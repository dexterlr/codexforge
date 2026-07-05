param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3042 First Real Provider Call Result Review Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-result-review-wiring.ps1' `
  -Route 'first-real-provider-call-result-review-wiring' `
  -CommandLabel 'Go to First Real Provider Call Result Review Wiring' `
  -RouteHref '/first-real-provider-call-result-review-wiring' `
  -Phase '3042' `
  -Title 'First Real Provider Call Result Review Wiring'
