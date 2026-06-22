param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1395 Cockpit Safety Coach Polish" `
  -ScriptFile "smoke-codexforge-cockpit-safety-coach-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-safety-coach-polish" `
  -Route "src\app\cockpit-safety-coach-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Safety Coach Polish" `
  -RouteHref "/cockpit-safety-coach-polish" `
  -Markers @("Cockpit safety coach polish", "Cockpit safety coach polish does not execute actions", "Cockpit safety coach polish requires explicit operator approval before execution", "Safety coach explains risk level denied paths approval scope backend guard requirements and recovery readiness", "No safety bypass from the cockpit", "Cockpit safety coach checklist")
