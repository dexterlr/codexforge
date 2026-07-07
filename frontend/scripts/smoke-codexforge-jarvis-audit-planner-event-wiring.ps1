param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3695 Jarvis Audit Planner Event Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-audit-planner-event-wiring.ps1' `
  -Route 'jarvis-audit-planner-event-wiring' `
  -CommandLabel 'Go to Jarvis Audit Planner Event Wiring' `
  -RouteHref '/jarvis-audit-planner-event-wiring' `
  -Phase '3695' `
  -Title 'Jarvis Audit Planner Event Wiring'
