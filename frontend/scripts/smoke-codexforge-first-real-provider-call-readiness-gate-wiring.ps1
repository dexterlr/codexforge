param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3048 First Real Provider Call Readiness Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-readiness-gate-wiring.ps1' `
  -Route 'first-real-provider-call-readiness-gate-wiring' `
  -CommandLabel 'Go to First Real Provider Call Readiness Gate Wiring' `
  -RouteHref '/first-real-provider-call-readiness-gate-wiring' `
  -Phase '3048' `
  -Title 'First Real Provider Call Readiness Gate Wiring'
