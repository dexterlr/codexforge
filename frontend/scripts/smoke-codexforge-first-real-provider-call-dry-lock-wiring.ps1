param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3026 First Real Provider Call Dry Lock Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-dry-lock-wiring.ps1' `
  -Route 'first-real-provider-call-dry-lock-wiring' `
  -CommandLabel 'Go to First Real Provider Call Dry Lock Wiring' `
  -RouteHref '/first-real-provider-call-dry-lock-wiring' `
  -Phase '3026' `
  -Title 'First Real Provider Call Dry Lock Wiring'
