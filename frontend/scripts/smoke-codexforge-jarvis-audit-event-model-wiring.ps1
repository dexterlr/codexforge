param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3692 Jarvis Audit Event Model Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-audit-event-model-wiring.ps1' `
  -Route 'jarvis-audit-event-model-wiring' `
  -CommandLabel 'Go to Jarvis Audit Event Model Wiring' `
  -RouteHref '/jarvis-audit-event-model-wiring' `
  -Phase '3692' `
  -Title 'Jarvis Audit Event Model Wiring'
