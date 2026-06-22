param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1280 Execution Readiness Evidence Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-evidence-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-evidence-lock" `
  -Route "src\app\execution-readiness-evidence-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Evidence Lock" `
  -RouteHref "/execution-readiness-evidence-lock" `
  -Markers @("Execution readiness evidence lock", "Execution readiness evidence lock does not persist evidence", "Execution readiness evidence lock requires explicit operator approval", "Evidence lock confirms diff command stdout stderr exit code approval timestamp and audit placeholders before execution readiness can pass", "Denied execution readiness evidence paths remain blocked", "Execution readiness evidence lock checklist")
