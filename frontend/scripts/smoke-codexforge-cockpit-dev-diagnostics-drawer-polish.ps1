param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1396 Cockpit Dev Diagnostics Drawer Polish" `
  -ScriptFile "smoke-codexforge-cockpit-dev-diagnostics-drawer-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-dev-diagnostics-drawer-polish" `
  -Route "src\app\cockpit-dev-diagnostics-drawer-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Dev Diagnostics Drawer Polish" `
  -RouteHref "/cockpit-dev-diagnostics-drawer-polish" `
  -Markers @("Cockpit dev diagnostics drawer polish", "Cockpit dev diagnostics drawer polish keeps phase pages as diagnostics only", "Cockpit dev diagnostics drawer polish does not broaden normal user navigation", "Diagnostics drawer links smoke-backed routes without replacing the cockpit", "Phase pages remain dev test diagnostics only", "Cockpit dev diagnostics drawer checklist")
