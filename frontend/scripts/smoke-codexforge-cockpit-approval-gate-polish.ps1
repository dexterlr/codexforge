param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1391 Cockpit Approval Gate Polish" `
  -ScriptFile "smoke-codexforge-cockpit-approval-gate-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-approval-gate-polish" `
  -Route "src\app\cockpit-approval-gate-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Approval Gate Polish" `
  -RouteHref "/cockpit-approval-gate-polish" `
  -Markers @("Cockpit approval gate polish", "Cockpit approval gate polish does not persist hidden approvals", "Cockpit approval gate polish requires explicit human approval", "Approval gate shows scope expiry operator identity backend authorization and denied paths", "No hidden approval from the cockpit", "Cockpit approval gate checklist")
