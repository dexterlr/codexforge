param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1386 Daily-Testable Cockpit Boundary" `
  -ScriptFile "smoke-codexforge-daily-testable-cockpit-boundary.ps1" `
  -Domain "src\lib\codexforge\daily-testable-cockpit-boundary" `
  -Route "src\app\daily-testable-cockpit-boundary" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Daily-Testable Cockpit Boundary" `
  -RouteHref "/daily-testable-cockpit-boundary" `
  -Markers @("Daily-testable cockpit boundary", "Daily-testable cockpit boundary keeps the cockpit as the normal user surface", "Daily-testable cockpit boundary does not broaden execution", "Daily-testable cockpit requires explicit operator approval", "Phase pages remain dev test diagnostics only", "Daily-testable cockpit checklist")
