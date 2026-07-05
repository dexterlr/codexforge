param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3025 First Real Provider Call Error Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-error-envelope-wiring.ps1' `
  -Route 'first-real-provider-call-error-envelope-wiring' `
  -CommandLabel 'Go to First Real Provider Call Error Envelope Wiring' `
  -RouteHref '/first-real-provider-call-error-envelope-wiring' `
  -Phase '3025' `
  -Title 'First Real Provider Call Error Envelope Wiring'
