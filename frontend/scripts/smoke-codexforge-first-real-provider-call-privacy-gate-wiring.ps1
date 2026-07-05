param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3032 First Real Provider Call Privacy Gate Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-privacy-gate-wiring.ps1' `
  -Route 'first-real-provider-call-privacy-gate-wiring' `
  -CommandLabel 'Go to First Real Provider Call Privacy Gate Wiring' `
  -RouteHref '/first-real-provider-call-privacy-gate-wiring' `
  -Phase '3032' `
  -Title 'First Real Provider Call Privacy Gate Wiring'
