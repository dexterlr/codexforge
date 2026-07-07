param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3691 Jarvis Audit Result Status Intent Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-audit-result-status-intent-wiring.ps1' `
  -Route 'jarvis-audit-result-status-intent-wiring' `
  -CommandLabel 'Go to Jarvis Audit Result Status Intent Wiring' `
  -RouteHref '/jarvis-audit-result-status-intent-wiring' `
  -Phase '3691' `
  -Title 'Jarvis Audit Result Status Intent Wiring'
