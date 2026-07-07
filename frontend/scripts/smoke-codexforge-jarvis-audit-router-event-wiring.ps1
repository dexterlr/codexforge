param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3696 Jarvis Audit Router Event Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-audit-router-event-wiring.ps1' `
  -Route 'jarvis-audit-router-event-wiring' `
  -CommandLabel 'Go to Jarvis Audit Router Event Wiring' `
  -RouteHref '/jarvis-audit-router-event-wiring' `
  -Phase '3696' `
  -Title 'Jarvis Audit Router Event Wiring'
