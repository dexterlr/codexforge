param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3046 First Real Provider Call Runner Handoff Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-runner-handoff-wiring.ps1' `
  -Route 'first-real-provider-call-runner-handoff-wiring' `
  -CommandLabel 'Go to First Real Provider Call Runner Handoff Wiring' `
  -RouteHref '/first-real-provider-call-runner-handoff-wiring' `
  -Phase '3046' `
  -Title 'First Real Provider Call Runner Handoff Wiring'
