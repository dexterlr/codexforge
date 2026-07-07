param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3705 Jarvis Status Dashboard Workspace Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-workspace-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-workspace-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Workspace Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-workspace-status-wiring' `
  -Phase '3705' `
  -Title 'Jarvis Status Dashboard Workspace Status Wiring'
