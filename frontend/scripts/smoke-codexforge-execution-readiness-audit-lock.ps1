param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1283 Execution Readiness Audit Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-audit-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-audit-lock" `
  -Route "src\app\execution-readiness-audit-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Audit Lock" `
  -RouteHref "/execution-readiness-audit-lock" `
  -Markers @("Execution readiness audit lock", "Execution readiness audit lock does not persist audit logs", "Execution readiness audit lock requires explicit operator approval", "Audit lock confirms goal plan diff command approval evidence result recovery safety and signoff placeholders before execution readiness can pass", "Denied execution readiness audit paths remain blocked", "Execution readiness audit lock checklist")
