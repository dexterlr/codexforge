param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3693 Jarvis Audit Approval Event Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-audit-approval-event-wiring.ps1' `
  -Route 'jarvis-audit-approval-event-wiring' `
  -CommandLabel 'Go to Jarvis Audit Approval Event Wiring' `
  -RouteHref '/jarvis-audit-approval-event-wiring' `
  -Phase '3693' `
  -Title 'Jarvis Audit Approval Event Wiring'
