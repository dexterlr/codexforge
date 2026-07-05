param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3021 First Real Provider Call Credential Reference Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-credential-reference-wiring.ps1' `
  -Route 'first-real-provider-call-credential-reference-wiring' `
  -CommandLabel 'Go to First Real Provider Call Credential Reference Wiring' `
  -RouteHref '/first-real-provider-call-credential-reference-wiring' `
  -Phase '3021' `
  -Title 'First Real Provider Call Credential Reference Wiring'
