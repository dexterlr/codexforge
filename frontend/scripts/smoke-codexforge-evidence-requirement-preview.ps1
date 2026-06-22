param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1428 Evidence Requirement Preview" `
  -ScriptFile "smoke-codexforge-evidence-requirement-preview.ps1" `
  -Domain "src\lib\codexforge\evidence-requirement-preview" `
  -Route "src\app\evidence-requirement-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Evidence Requirement Preview" `
  -RouteHref "/evidence-requirement-preview" `
  -Markers @("Evidence requirement preview", "Evidence requirement preview does not persist evidence from the UI", "Evidence requirement preview requires explicit operator approval", "Evidence requirement preview lists required diff command stdout stderr exit code approval result audit and recovery evidence", "Denied evidence requirement paths remain blocked", "Evidence requirement checklist")
