param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-daily-testable-cockpit-mvp-smoke-helper.ps1") `
  -SmokeName "Phase 1398 Cockpit Copy Trust Polish" `
  -ScriptFile "smoke-codexforge-cockpit-copy-trust-polish.ps1" `
  -Domain "src\lib\codexforge\cockpit-copy-trust-polish" `
  -Route "src\app\cockpit-copy-trust-polish" `
  -MainPanel "DailyTestableCockpitMvpRoutePanel" `
  -CommandLabel "Go to Cockpit Copy Trust Polish" `
  -RouteHref "/cockpit-copy-trust-polish" `
  -Markers @("Cockpit copy trust polish", "Cockpit copy trust polish does not overclaim execution", "Cockpit copy trust polish requires explicit operator approval before execution", "Trust copy clearly states preview held approved blocked backend-owned and recovery-gated states", "No misleading execution claims from the cockpit", "Cockpit copy trust checklist")
