param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3044 First Real Provider Call Routing Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-routing-handoff-wiring.ps1' `
  -Route 'first-real-provider-call-routing-handoff-wiring' `
  -CommandLabel 'Go to First Real Provider Call Routing Handoff Wiring' `
  -RouteHref '/first-real-provider-call-routing-handoff-wiring' `
  -Phase '3044' `
  -Title 'First Real Provider Call Routing Handoff Wiring'
