param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1418 Goal Compiler Boundary" `
  -ScriptFile "smoke-codexforge-goal-compiler-boundary.ps1" `
  -Domain "src\lib\codexforge\goal-compiler-boundary" `
  -Route "src\app\goal-compiler-boundary" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Goal Compiler Boundary" `
  -RouteHref "/goal-compiler-boundary" `
  -Markers @("Goal compiler boundary", "Goal compiler boundary does not call models", "Goal compiler requires explicit operator approval before execution", "Goal compiler prepares structured intent without broad execution", "Denied goal compiler paths remain blocked", "Goal compiler checklist")
