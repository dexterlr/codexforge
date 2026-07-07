param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3715 Jarvis Status Dashboard Memory Boundary Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-memory-boundary-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-memory-boundary-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Memory Boundary Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-memory-boundary-status-wiring' `
  -Phase '3715' `
  -Title 'Jarvis Status Dashboard Memory Boundary Status Wiring'
