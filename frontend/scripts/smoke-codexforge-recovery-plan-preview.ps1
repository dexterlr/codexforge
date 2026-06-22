param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1444 Recovery Plan Preview" `
  -ScriptFile "smoke-codexforge-recovery-plan-preview.ps1" `
  -Domain "src\lib\codexforge\recovery-plan-preview" `
  -Route "src\app\recovery-plan-preview" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Recovery Plan Preview" `
  -RouteHref "/recovery-plan-preview" `
  -Markers @("Recovery plan preview", "Recovery plan preview does not execute recovery", "Recovery plan preview requires explicit operator approval", "Recovery plan preview explains rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery paths", "Denied recovery plan paths remain blocked", "Recovery plan checklist")
