param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3718 Jarvis Status Dashboard Replay Block Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-replay-block-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-replay-block-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Replay Block Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-replay-block-status-wiring' `
  -Phase '3718' `
  -Title 'Jarvis Status Dashboard Replay Block Status Wiring'
