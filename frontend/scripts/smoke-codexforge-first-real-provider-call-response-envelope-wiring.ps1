param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3024 First Real Provider Call Response Envelope Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-response-envelope-wiring.ps1' `
  -Route 'first-real-provider-call-response-envelope-wiring' `
  -CommandLabel 'Go to First Real Provider Call Response Envelope Wiring' `
  -RouteHref '/first-real-provider-call-response-envelope-wiring' `
  -Phase '3024' `
  -Title 'First Real Provider Call Response Envelope Wiring'
