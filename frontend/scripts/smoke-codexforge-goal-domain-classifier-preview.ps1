param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1420 Goal Domain Classifier Preview" `
  -ScriptFile "smoke-codexforge-goal-domain-classifier-preview.ps1" `
  -Domain "src\lib\codexforge\goal-domain-classifier-preview" `
  -Route "src\app\goal-domain-classifier-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Goal Domain Classifier Preview" `
  -RouteHref "/goal-domain-classifier-preview" `
  -Markers @("Goal domain classifier preview", "Goal domain classifier preview does not call models", "Goal domain classifier preview requires explicit operator approval before execution", "Goal domain classifier previews app website dashboard game server research creative trading data docs integration and local project domains", "Denied goal domain classifier paths remain blocked", "Goal domain classifier checklist")
