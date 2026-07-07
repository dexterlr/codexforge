param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3714 Jarvis Status Dashboard Workflow Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-workflow-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-workflow-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Workflow Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-workflow-status-wiring' `
  -Phase '3714' `
  -Title 'Jarvis Status Dashboard Workflow Status Wiring'
