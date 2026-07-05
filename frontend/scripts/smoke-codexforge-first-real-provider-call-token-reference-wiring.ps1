param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3022 First Real Provider Call Token Reference Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-token-reference-wiring.ps1' `
  -Route 'first-real-provider-call-token-reference-wiring' `
  -CommandLabel 'Go to First Real Provider Call Token Reference Wiring' `
  -RouteHref '/first-real-provider-call-token-reference-wiring' `
  -Phase '3022' `
  -Title 'First Real Provider Call Token Reference Wiring'
