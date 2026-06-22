param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1401 Controlled Daily-Testable Cockpit MVP Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-daily-testable-cockpit-mvp-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-daily-testable-cockpit-mvp-release-candidate" `
  -Route "src\app\controlled-daily-testable-cockpit-mvp-release-candidate" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Controlled Daily-Testable Cockpit MVP Release Candidate" `
  -RouteHref "/controlled-daily-testable-cockpit-mvp-release-candidate" `
  -Markers @("Controlled daily-testable cockpit MVP release candidate", "Controlled daily-testable cockpit MVP release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery from the frontend", "Controlled daily-testable cockpit MVP release requires explicit operator approval", "Release candidate makes the cockpit daily-testable while preserving backend-owned guarded execution", "Phase pages remain dev test diagnostics only", "Controlled daily-testable cockpit MVP release checklist")
