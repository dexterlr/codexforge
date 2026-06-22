param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1427 Approval Scope Preview" `
  -ScriptFile "smoke-codexforge-approval-scope-preview.ps1" `
  -Domain "src\lib\codexforge\approval-scope-preview" `
  -Route "src\app\approval-scope-preview" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Approval Scope Preview" `
  -RouteHref "/approval-scope-preview" `
  -Markers @("Approval scope preview", "Approval scope preview does not persist approvals", "Approval scope preview requires explicit human approval", "Approval scope preview defines operator identity scope expiry touched files command candidates model/tool needs and denied paths", "Denied approval scope paths remain blocked", "Approval scope checklist")
