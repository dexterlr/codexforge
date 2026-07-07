param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3697 Jarvis Audit Blocked Action Event Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-audit-blocked-action-event-wiring.ps1' `
  -Route 'jarvis-audit-blocked-action-event-wiring' `
  -CommandLabel 'Go to Jarvis Audit Blocked Action Event Wiring' `
  -RouteHref '/jarvis-audit-blocked-action-event-wiring' `
  -Phase '3697' `
  -Title 'Jarvis Audit Blocked Action Event Wiring'
