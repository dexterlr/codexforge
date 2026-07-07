param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3711 Jarvis Status Dashboard Trading Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-trading-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-trading-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Trading Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-trading-status-wiring' `
  -Phase '3711' `
  -Title 'Jarvis Status Dashboard Trading Status Wiring'
