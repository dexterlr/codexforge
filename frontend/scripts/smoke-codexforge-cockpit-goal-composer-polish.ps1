param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1387 Cockpit Goal Composer Polish" `
  -ScriptFile "smoke-codexforge-cockpit-goal-composer-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-goal-composer-polish" `
  -Route "src\app\cockpit-goal-composer-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Goal Composer Polish" `
  -RouteHref "/cockpit-goal-composer-polish" `
  -Markers @("Cockpit goal composer polish", "Cockpit goal composer polish does not call models", "Cockpit goal composer polish requires explicit operator approval before execution", "Goal composer keeps goal intake separate from backend-owned guarded execution", "No direct execution from the goal composer", "Cockpit goal composer checklist")
