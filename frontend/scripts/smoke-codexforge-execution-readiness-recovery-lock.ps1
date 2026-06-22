param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1282 Execution Readiness Recovery Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-recovery-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-recovery-lock" `
  -Route "src\app\execution-readiness-recovery-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Recovery Lock" `
  -RouteHref "/execution-readiness-recovery-lock" `
  -Markers @("Execution readiness recovery lock", "Execution readiness recovery lock does not execute recovery", "Execution readiness recovery lock requires explicit operator approval", "Recovery lock confirms rollback retry stop restore explain-failure and manual-review options before execution readiness can pass", "Denied execution readiness recovery paths remain blocked", "Execution readiness recovery lock checklist")
