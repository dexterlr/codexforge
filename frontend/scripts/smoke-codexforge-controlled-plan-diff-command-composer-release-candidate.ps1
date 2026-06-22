param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1449 Controlled Plan Diff Command Composer Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-plan-diff-command-composer-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-plan-diff-command-composer-release-candidate" `
  -Route "src\app\controlled-plan-diff-command-composer-release-candidate" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Controlled Plan Diff Command Composer Release Candidate" `
  -RouteHref "/controlled-plan-diff-command-composer-release-candidate" `
  -Markers @("Controlled plan diff command composer release candidate", "Controlled plan diff command composer release candidate does not call models providers connectors write files apply diffs run commands persist approvals create queues persist evidence results audit or promote memory from the frontend", "Controlled plan diff command composer release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned work proposal approval without broad execution", "Denied controlled plan diff command composer paths remain blocked", "Controlled plan diff command composer release checklist")
