param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1434 Plan Diff Command Composer Boundary" `
  -ScriptFile "smoke-codexforge-plan-diff-command-composer-boundary.ps1" `
  -Domain "src\lib\codexforge\plan-diff-command-composer-boundary" `
  -Route "src\app\plan-diff-command-composer-boundary" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Plan Diff Command Composer Boundary" `
  -RouteHref "/plan-diff-command-composer-boundary" `
  -Markers @("Plan diff command composer boundary", "Plan diff command composer boundary does not execute plans", "Plan diff command composer requires explicit operator approval before execution", "Plan diff command composer prepares work proposals without broad execution", "Denied plan diff command composer paths remain blocked", "Plan diff command composer checklist")
