param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1430 Goal Recovery Implication Preview" `
  -ScriptFile "smoke-codexforge-goal-recovery-implication-preview.ps1" `
  -Domain "src\lib\codexforge\goal-recovery-implication-preview" `
  -Route "src\app\goal-recovery-implication-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Goal Recovery Implication Preview" `
  -RouteHref "/goal-recovery-implication-preview" `
  -Markers @("Goal recovery implication preview", "Goal recovery implication preview does not execute recovery", "Goal recovery implication preview requires explicit operator approval", "Goal recovery implication preview explains rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery implications", "Denied goal recovery implication paths remain blocked", "Goal recovery implication checklist")
