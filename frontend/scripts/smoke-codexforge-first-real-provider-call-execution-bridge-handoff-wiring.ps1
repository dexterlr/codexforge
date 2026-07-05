param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3045 First Real Provider Call Execution Bridge Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-execution-bridge-handoff-wiring.ps1' `
  -Route 'first-real-provider-call-execution-bridge-handoff-wiring' `
  -CommandLabel 'Go to First Real Provider Call Execution Bridge Handoff Wiring' `
  -RouteHref '/first-real-provider-call-execution-bridge-handoff-wiring' `
  -Phase '3045' `
  -Title 'First Real Provider Call Execution Bridge Handoff Wiring'
