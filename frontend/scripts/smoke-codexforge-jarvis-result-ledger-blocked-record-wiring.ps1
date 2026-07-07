param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3701 Jarvis Result Ledger Blocked Record Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-result-ledger-blocked-record-wiring.ps1' `
  -Route 'jarvis-result-ledger-blocked-record-wiring' `
  -CommandLabel 'Go to Jarvis Result Ledger Blocked Record Wiring' `
  -RouteHref '/jarvis-result-ledger-blocked-record-wiring' `
  -Phase '3701' `
  -Title 'Jarvis Result Ledger Blocked Record Wiring'
