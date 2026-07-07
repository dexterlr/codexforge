param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3716 Jarvis Status Dashboard Kill Switch Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-kill-switch-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-kill-switch-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Kill Switch Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-kill-switch-status-wiring' `
  -Phase '3716' `
  -Title 'Jarvis Status Dashboard Kill Switch Status Wiring'
