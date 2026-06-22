param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1392 Cockpit Execution State Polish" `
  -ScriptFile "smoke-codexforge-cockpit-execution-state-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-execution-state-polish" `
  -Route "src\app\cockpit-execution-state-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Execution State Polish" `
  -RouteHref "/cockpit-execution-state-polish" `
  -Markers @("Cockpit execution state polish", "Cockpit execution state polish does not release execution from the frontend", "Cockpit execution state polish requires backend-owned guarded execution", "Execution state shows preview blocked approved queued applying running completed failed stopped manual-review and recovered states", "No direct execution state mutation from the cockpit", "Cockpit execution state checklist")
