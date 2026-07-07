param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3698 Jarvis Result Ledger Model Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-result-ledger-model-wiring.ps1' `
  -Route 'jarvis-result-ledger-model-wiring' `
  -CommandLabel 'Go to Jarvis Result Ledger Model Wiring' `
  -RouteHref '/jarvis-result-ledger-model-wiring' `
  -Phase '3698' `
  -Title 'Jarvis Result Ledger Model Wiring'
