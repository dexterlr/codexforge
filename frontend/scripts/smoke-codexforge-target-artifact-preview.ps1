param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1422 Target Artifact Preview" `
  -ScriptFile "smoke-codexforge-target-artifact-preview.ps1" `
  -Domain "src\lib\codexforge\target-artifact-preview" `
  -Route "src\app\target-artifact-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Target Artifact Preview" `
  -RouteHref "/target-artifact-preview" `
  -Markers @("Target artifact preview", "Target artifact preview does not create artifacts", "Target artifact preview requires explicit operator approval before execution", "Target artifact preview identifies expected files app surfaces reports configs dashboards game server plans docs or creative packs", "Denied target artifact paths remain blocked", "Target artifact checklist")
