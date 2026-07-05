param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3035 First Real Provider Call Data Retention Policy Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-data-retention-policy-wiring.ps1' `
  -Route 'first-real-provider-call-data-retention-policy-wiring' `
  -CommandLabel 'Go to First Real Provider Call Data Retention Policy Wiring' `
  -RouteHref '/first-real-provider-call-data-retention-policy-wiring' `
  -Phase '3035' `
  -Title 'First Real Provider Call Data Retention Policy Wiring'
