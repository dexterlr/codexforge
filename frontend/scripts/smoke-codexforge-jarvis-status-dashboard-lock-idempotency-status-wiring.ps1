param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
. (Join-Path $PSScriptRoot 'codexforge-jarvis-audit-result-status-smoke-helper.ps1')

Invoke-CodexForgeJarvisAuditResultStatusSmoke `
  -SmokeName 'Phase 3717 Jarvis Status Dashboard Lock Idempotency Status Wiring' `
  -ScriptFile 'smoke-codexforge-jarvis-status-dashboard-lock-idempotency-status-wiring.ps1' `
  -Route 'jarvis-status-dashboard-lock-idempotency-status-wiring' `
  -CommandLabel 'Go to Jarvis Status Dashboard Lock Idempotency Status Wiring' `
  -RouteHref '/jarvis-status-dashboard-lock-idempotency-status-wiring' `
  -Phase '3717' `
  -Title 'Jarvis Status Dashboard Lock Idempotency Status Wiring'
