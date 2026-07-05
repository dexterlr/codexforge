param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3049 First Real Provider Call Guard Completion' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-guard-completion.ps1' `
  -Route 'first-real-provider-call-guard-completion' `
  -CommandLabel 'Go to First Real Provider Call Guard Completion' `
  -RouteHref '/first-real-provider-call-guard-completion' `
  -Phase '3049' `
  -Title 'First Real Provider Call Guard Completion'
