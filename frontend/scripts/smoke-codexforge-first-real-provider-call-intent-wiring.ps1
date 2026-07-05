param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3019 First Real Provider Call Intent Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-intent-wiring.ps1' `
  -Route 'first-real-provider-call-intent-wiring' `
  -CommandLabel 'Go to First Real Provider Call Intent Wiring' `
  -RouteHref '/first-real-provider-call-intent-wiring' `
  -Phase '3019' `
  -Title 'First Real Provider Call Intent Wiring'
