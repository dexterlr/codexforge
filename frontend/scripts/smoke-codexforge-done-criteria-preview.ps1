param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1429 Done Criteria Preview" `
  -ScriptFile "smoke-codexforge-done-criteria-preview.ps1" `
  -Domain "src\lib\codexforge\done-criteria-preview" `
  -Route "src\app\done-criteria-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Done Criteria Preview" `
  -RouteHref "/done-criteria-preview" `
  -Markers @("Done criteria preview", "Done criteria preview does not claim execution happened", "Done criteria preview requires explicit operator approval before execution", "Done criteria preview defines expected success blocked denied failed manual-review retryable recovered and operator-accepted outcomes", "Denied done criteria paths remain blocked", "Done criteria checklist")
