param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3043 First Real Provider Call Provider Registry Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-provider-registry-handoff-wiring.ps1' `
  -Route 'first-real-provider-call-provider-registry-handoff-wiring' `
  -CommandLabel 'Go to First Real Provider Call Provider Registry Handoff Wiring' `
  -RouteHref '/first-real-provider-call-provider-registry-handoff-wiring' `
  -Phase '3043' `
  -Title 'First Real Provider Call Provider Registry Handoff Wiring'
