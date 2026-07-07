param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3699 Jarvis Result Ledger Dry Run Record Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-result-ledger-dry-run-record-wiring.ps1' `
  -Route 'jarvis-result-ledger-dry-run-record-wiring' `
  -CommandLabel 'Go to Jarvis Result Ledger Dry Run Record Wiring' `
  -RouteHref '/jarvis-result-ledger-dry-run-record-wiring' `
  -Phase '3699' `
  -Title 'Jarvis Result Ledger Dry Run Record Wiring'
