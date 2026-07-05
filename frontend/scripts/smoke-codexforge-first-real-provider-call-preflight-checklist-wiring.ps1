param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3028 First Real Provider Call Preflight Checklist Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-preflight-checklist-wiring.ps1' `
  -Route 'first-real-provider-call-preflight-checklist-wiring' `
  -CommandLabel 'Go to First Real Provider Call Preflight Checklist Wiring' `
  -RouteHref '/first-real-provider-call-preflight-checklist-wiring' `
  -Phase '3028' `
  -Title 'First Real Provider Call Preflight Checklist Wiring'
