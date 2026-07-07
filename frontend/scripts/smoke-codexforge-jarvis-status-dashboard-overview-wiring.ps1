param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3703 Jarvis Status Dashboard Overview Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-overview-wiring.ps1' `
  -Route 'jarvis-status-dashboard-overview-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Overview Wiring' `
  -RouteHref '/jarvis-status-dashboard-overview-wiring' `
  -Phase '3703' `
  -Title 'Jarvis Status Dashboard Overview Wiring'
