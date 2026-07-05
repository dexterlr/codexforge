param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3041 First Real Provider Call Observability Trace Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-observability-trace-wiring.ps1' `
  -Route 'first-real-provider-call-observability-trace-wiring' `
  -CommandLabel 'Go to First Real Provider Call Observability Trace Wiring' `
  -RouteHref '/first-real-provider-call-observability-trace-wiring' `
  -Phase '3041' `
  -Title 'First Real Provider Call Observability Trace Wiring'
