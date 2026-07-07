param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3707 Jarvis Status Dashboard Permission Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-permission-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-permission-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Permission Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-permission-status-wiring' `
  -Phase '3707' `
  -Title 'Jarvis Status Dashboard Permission Status Wiring'
