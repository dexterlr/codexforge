param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3719 Jarvis Status Dashboard Operator Review Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-operator-review-wiring.ps1' `
  -Route 'jarvis-status-dashboard-operator-review-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Operator Review Wiring' `
  -RouteHref '/jarvis-status-dashboard-operator-review-wiring' `
  -Phase '3719' `
  -Title 'Jarvis Status Dashboard Operator Review Wiring'
