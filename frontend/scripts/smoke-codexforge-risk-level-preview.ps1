param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1426 Risk Level Preview" `
  -ScriptFile "smoke-codexforge-risk-level-preview.ps1" `
  -Domain "src\lib\codexforge\risk-level-preview" `
  -Route "src\app\risk-level-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Risk Level Preview" `
  -RouteHref "/risk-level-preview" `
  -Markers @("Risk level preview", "Risk level preview does not execute safety scans from the UI", "Risk level preview requires explicit operator approval", "Risk level preview classifies low medium high and blocked risks across files commands models providers connectors runtimes secrets installs deploys persistence and recovery", "Denied risk level paths remain blocked", "Risk level checklist")
