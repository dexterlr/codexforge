param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3709 Jarvis Status Dashboard Dry Run Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-dry-run-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-dry-run-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Dry Run Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-dry-run-status-wiring' `
  -Phase '3709' `
  -Title 'Jarvis Status Dashboard Dry Run Status Wiring'
