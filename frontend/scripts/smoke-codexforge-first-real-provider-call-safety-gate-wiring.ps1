param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3033 First Real Provider Call Safety Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-safety-gate-wiring.ps1' `
  -Route 'first-real-provider-call-safety-gate-wiring' `
  -CommandLabel 'Go to First Real Provider Call Safety Gate Wiring' `
  -RouteHref '/first-real-provider-call-safety-gate-wiring' `
  -Phase '3033' `
  -Title 'First Real Provider Call Safety Gate Wiring'
