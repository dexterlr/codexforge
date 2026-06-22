param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1424 File Impact Expectation Preview" `
  -ScriptFile "smoke-codexforge-file-impact-expectation-preview.ps1" `
  -Domain "src\lib\codexforge\file-impact-expectation-preview" `
  -Route "src\app\file-impact-expectation-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to File Impact Expectation Preview" `
  -RouteHref "/file-impact-expectation-preview" `
  -Markers @("File impact expectation preview", "File impact expectation preview does not write files", "File impact expectation preview requires explicit operator approval", "File impact expectation preview describes likely new modified reviewed blocked and rollback-relevant files", "Denied file impact expectation paths remain blocked", "File impact expectation checklist")
