param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1425 Command Expectation Preview" `
  -ScriptFile "smoke-codexforge-command-expectation-preview.ps1" `
  -Domain "src\lib\codexforge\command-expectation-preview" `
  -Route "src\app\command-expectation-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Command Expectation Preview" `
  -RouteHref "/command-expectation-preview" `
  -Markers @("Command expectation preview", "Command expectation preview does not run commands", "Command expectation preview requires explicit operator approval", "Command expectation preview lists likely build smoke validation lint test and hygiene command candidates as review-only expectations", "Denied command expectation paths remain blocked", "Command expectation checklist")
