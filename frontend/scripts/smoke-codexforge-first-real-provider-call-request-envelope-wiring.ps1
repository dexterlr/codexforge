param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3023 First Real Provider Call Request Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-request-envelope-wiring.ps1' `
  -Route 'first-real-provider-call-request-envelope-wiring' `
  -CommandLabel 'Go to First Real Provider Call Request Envelope Wiring' `
  -RouteHref '/first-real-provider-call-request-envelope-wiring' `
  -Phase '3023' `
  -Title 'First Real Provider Call Request Envelope Wiring'
