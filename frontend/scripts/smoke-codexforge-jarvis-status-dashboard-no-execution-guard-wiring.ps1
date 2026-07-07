param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3720 Jarvis Status Dashboard No Execution Guard Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-no-execution-guard-wiring.ps1' `
  -Route 'jarvis-status-dashboard-no-execution-guard-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard No Execution Guard Wiring' `
  -RouteHref '/jarvis-status-dashboard-no-execution-guard-wiring' `
  -Phase '3720' `
  -Title 'Jarvis Status Dashboard No Execution Guard Wiring'
