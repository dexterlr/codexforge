param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3700 Jarvis Result Ledger Approval Record Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-result-ledger-approval-record-wiring.ps1' `
  -Route 'jarvis-result-ledger-approval-record-wiring' `
  -CommandLabel 'Go to Jarvis Result Ledger Approval Record Wiring' `
  -RouteHref '/jarvis-result-ledger-approval-record-wiring' `
  -Phase '3700' `
  -Title 'Jarvis Result Ledger Approval Record Wiring'
