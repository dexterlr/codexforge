param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3713 Jarvis Status Dashboard Website Avatar Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-website-avatar-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-website-avatar-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Website Avatar Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-website-avatar-status-wiring' `
  -Phase '3713' `
  -Title 'Jarvis Status Dashboard Website Avatar Status Wiring'
