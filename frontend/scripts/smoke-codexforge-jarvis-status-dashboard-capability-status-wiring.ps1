param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3704 Jarvis Status Dashboard Capability Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-capability-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-capability-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Capability Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-capability-status-wiring' `
  -Phase '3704' `
  -Title 'Jarvis Status Dashboard Capability Status Wiring'
