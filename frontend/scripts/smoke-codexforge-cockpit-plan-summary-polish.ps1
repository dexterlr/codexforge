param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1388 Cockpit Plan Summary Polish" `
  -ScriptFile "smoke-codexforge-cockpit-plan-summary-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-plan-summary-polish" `
  -Route "src\app\cockpit-plan-summary-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Plan Summary Polish" `
  -RouteHref "/cockpit-plan-summary-polish" `
  -Markers @("Cockpit plan summary polish", "Cockpit plan summary polish does not execute plans", "Cockpit plan summary polish requires explicit operator approval before execution", "Plan summary shows goal steps risks files commands approval and evidence expectations", "No direct execution from the plan summary", "Cockpit plan summary checklist")
