param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1276 Execution Readiness Plan Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-plan-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-plan-lock" `
  -Route "src\app\execution-readiness-plan-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Plan Lock" `
  -RouteHref "/execution-readiness-plan-lock" `
  -Markers @("Execution readiness plan lock", "Execution readiness plan lock does not execute plans", "Execution readiness plan lock requires explicit operator approval", "Plan lock confirms planned file and command actions are reviewed before execution readiness can pass", "Denied execution readiness plan paths remain blocked", "Execution readiness plan lock checklist")
