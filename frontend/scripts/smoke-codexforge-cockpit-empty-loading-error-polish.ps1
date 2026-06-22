param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1397 Cockpit Empty Loading Error Polish" `
  -ScriptFile "smoke-codexforge-cockpit-empty-loading-error-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-empty-loading-error-polish" `
  -Route "src\app\cockpit-empty-loading-error-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Empty Loading Error Polish" `
  -RouteHref "/cockpit-empty-loading-error-polish" `
  -Markers @("Cockpit empty loading error polish", "Cockpit empty loading error polish does not execute fallback actions", "Cockpit empty loading error polish requires explicit operator approval before execution", "Empty loading error states explain what is known what is blocked what needs approval and what remains safe", "No automatic recovery from empty loading or error states", "Cockpit empty loading error checklist")
