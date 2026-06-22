param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1423 Context Requirement Preview" `
  -ScriptFile "smoke-codexforge-context-requirement-preview.ps1" `
  -Domain "src\lib\codexforge\context-requirement-preview" `
  -Route "src\app\context-requirement-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Context Requirement Preview" `
  -RouteHref "/context-requirement-preview" `
  -Markers @("Context requirement preview", "Context requirement preview does not browse arbitrary files from the UI", "Context requirement preview requires explicit operator approval", "Context requirement preview lists workspace project stack files commands risks evidence and confidence needs", "Denied context requirement paths remain blocked", "Context requirement checklist")
