param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3027 First Real Provider Call Execution Block Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-execution-block-wiring.ps1' `
  -Route 'first-real-provider-call-execution-block-wiring' `
  -CommandLabel 'Go to First Real Provider Call Execution Block Wiring' `
  -RouteHref '/first-real-provider-call-execution-block-wiring' `
  -Phase '3027' `
  -Title 'First Real Provider Call Execution Block Wiring'
