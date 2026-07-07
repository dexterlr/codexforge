param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3690 Jarvis Audit Result Status Boundary Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-audit-result-status-boundary-wiring.ps1' `
  -Route 'jarvis-audit-result-status-boundary-wiring' `
  -CommandLabel 'Go to Jarvis Audit Result Status Boundary Wiring' `
  -RouteHref '/jarvis-audit-result-status-boundary-wiring' `
  -Phase '3690' `
  -Title 'Jarvis Audit Result Status Boundary Wiring'
