param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3694 Jarvis Audit Permission Event Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-audit-permission-event-wiring.ps1' `
  -Route 'jarvis-audit-permission-event-wiring' `
  -CommandLabel 'Go to Jarvis Audit Permission Event Wiring' `
  -RouteHref '/jarvis-audit-permission-event-wiring' `
  -Phase '3694' `
  -Title 'Jarvis Audit Permission Event Wiring'
