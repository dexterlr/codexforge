param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1399 Cockpit Daily Test Checklist" `
  -ScriptFile "smoke-codexforge-cockpit-daily-test-checklist.ps1" `
  -Domain "src\lib\codexforge\cockpit-daily-test-checklist" `
  -Route "src\app\cockpit-daily-test-checklist" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Daily Test Checklist" `
  -RouteHref "/cockpit-daily-test-checklist" `
  -Markers @("Cockpit daily test checklist", "Cockpit daily test checklist does not run tests from the UI", "Cockpit daily test checklist requires explicit operator approval before execution", "Daily test checklist covers goal plan diff command approval execution state evidence result recovery audit safety and diagnostics", "No test or smoke execution from the cockpit", "Cockpit daily test checklist")
