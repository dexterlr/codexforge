param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1279 Execution Readiness Approval Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-approval-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-approval-lock" `
  -Route "src\app\execution-readiness-approval-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Approval Lock" `
  -RouteHref "/execution-readiness-approval-lock" `
  -Markers @("Execution readiness approval lock", "Execution readiness approval lock does not approve actions or persist approvals", "Execution readiness approval lock requires explicit human approval", "Approval lock confirms approval scope operator signoff and blocked actions before execution readiness can pass", "Denied execution readiness approval paths remain blocked", "Execution readiness approval lock checklist")
