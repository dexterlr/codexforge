param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3710 Jarvis Status Dashboard Risk Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-risk-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-risk-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Risk Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-risk-status-wiring' `
  -Phase '3710' `
  -Title 'Jarvis Status Dashboard Risk Status Wiring'
