param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-first-real-provider-call-guard-batch-smoke-helper.ps1')

Invoke-CodexForgeFirstRealProviderCallGuardBatchSmoke `
  -SmokeName 'Phase 3029 First Real Provider Call Prompt Redaction Preview Wiring' `
  -ScriptFile 'smoke-codexforge-first-real-provider-call-prompt-redaction-preview-wiring.ps1' `
  -Route 'first-real-provider-call-prompt-redaction-preview-wiring' `
  -CommandLabel 'Go to First Real Provider Call Prompt Redaction Preview Wiring' `
  -RouteHref '/first-real-provider-call-prompt-redaction-preview-wiring' `
  -Phase '3029' `
  -Title 'First Real Provider Call Prompt Redaction Preview Wiring'
