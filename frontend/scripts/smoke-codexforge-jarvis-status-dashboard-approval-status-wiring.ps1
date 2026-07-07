param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3708 Jarvis Status Dashboard Approval Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-approval-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-approval-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Approval Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-approval-status-wiring' `
  -Phase '3708' `
  -Title 'Jarvis Status Dashboard Approval Status Wiring'
