param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1400 First Daily-Testable Cockpit MVP Candidate" `
  -ScriptFile "smoke-codexforge-first-daily-testable-cockpit-mvp-candidate.ps1" `
  -Domain "src\lib\codexforge\first-daily-testable-cockpit-mvp-candidate" `
  -Route "src\app\first-daily-testable-cockpit-mvp-candidate" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to First Daily-Testable Cockpit MVP Candidate" `
  -RouteHref "/first-daily-testable-cockpit-mvp-candidate" `
  -Markers @("First daily-testable cockpit MVP candidate", "First daily-testable cockpit MVP candidate does not broaden execution", "First daily-testable cockpit MVP candidate requires explicit operator approval", "Candidate combines goal plan files commands approval run state evidence result recovery timeline safety and diagnostics", "No broad execution from the cockpit MVP candidate", "First daily-testable cockpit MVP checklist")
