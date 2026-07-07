param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3706 Jarvis Status Dashboard Adapter Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-adapter-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-adapter-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Adapter Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-adapter-status-wiring' `
  -Phase '3706' `
  -Title 'Jarvis Status Dashboard Adapter Status Wiring'
