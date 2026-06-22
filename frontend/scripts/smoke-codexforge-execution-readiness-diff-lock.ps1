param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1277 Execution Readiness Diff Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-diff-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-diff-lock" `
  -Route "src\app\execution-readiness-diff-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Diff Lock" `
  -RouteHref "/execution-readiness-diff-lock" `
  -Markers @("Execution readiness diff lock", "Execution readiness diff lock does not write files or apply diffs", "Execution readiness diff lock requires explicit operator approval", "Diff lock confirms path guard before after diff rollback and denied mutation review before execution readiness can pass", "Denied execution readiness diff paths remain blocked", "Execution readiness diff lock checklist")
