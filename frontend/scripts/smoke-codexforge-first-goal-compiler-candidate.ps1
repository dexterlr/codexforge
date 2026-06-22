param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1432 First Goal Compiler Candidate" `
  -ScriptFile "smoke-codexforge-first-goal-compiler-candidate.ps1" `
  -Domain "src\lib\codexforge\first-goal-compiler-candidate" `
  -Route "src\app\first-goal-compiler-candidate" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to First Goal Compiler Candidate" `
  -RouteHref "/first-goal-compiler-candidate" `
  -Markers @("First goal compiler candidate", "First goal compiler candidate does not execute compiled goals", "First goal compiler candidate requires explicit operator approval", "Candidate combines raw goal domain task target context files commands risk approval evidence done recovery and routing hints", "Denied first goal compiler paths remain blocked", "First goal compiler checklist")
