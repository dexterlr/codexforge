param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1448 First Plan Diff Command Composer Candidate" `
  -ScriptFile "smoke-codexforge-first-plan-diff-command-composer-candidate.ps1" `
  -Domain "src\lib\codexforge\first-plan-diff-command-composer-candidate" `
  -Route "src\app\first-plan-diff-command-composer-candidate" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to First Plan Diff Command Composer Candidate" `
  -RouteHref "/first-plan-diff-command-composer-candidate" `
  -Markers @("First plan diff command composer candidate", "First plan diff command composer candidate does not execute composed work", "First plan diff command composer candidate requires explicit operator approval", "Candidate combines plan steps file impact diff preview command preview risk approval hold evidence result recovery audit and model tool handoff", "Denied first plan diff command composer paths remain blocked", "First plan diff command composer checklist")
