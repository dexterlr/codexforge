param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3018 First Real Provider Call Guard Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-guard-boundary-wiring.ps1' `
  -Route 'first-real-provider-call-guard-boundary-wiring' `
  -CommandLabel 'Go to First Real Provider Call Guard Boundary Wiring' `
  -RouteHref '/first-real-provider-call-guard-boundary-wiring' `
  -Phase '3018' `
  -Title 'First Real Provider Call Guard Boundary Wiring'
