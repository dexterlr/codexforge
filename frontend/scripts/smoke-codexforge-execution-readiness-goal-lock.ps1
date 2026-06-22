param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1275 Execution Readiness Goal Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-goal-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-goal-lock" `
  -Route "src\app\execution-readiness-goal-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Goal Lock" `
  -RouteHref "/execution-readiness-goal-lock" `
  -Markers @("Execution readiness goal lock", "Execution readiness goal lock does not call models or send prompts", "Execution readiness goal lock requires explicit operator approval before future model routing", "Goal lock confirms the operator goal is reviewed before execution readiness can pass", "Denied execution readiness goal paths remain blocked", "Execution readiness goal lock checklist")
