param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3712 Jarvis Status Dashboard Provider Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-provider-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-provider-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Provider Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-provider-status-wiring' `
  -Phase '3712' `
  -Title 'Jarvis Status Dashboard Provider Status Wiring'
