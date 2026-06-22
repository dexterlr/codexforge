param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1196 Cockpit Plan Summary Panel" `
  -ScriptFile "smoke-codexforge-cockpit-plan-summary-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-plan-summary-panel" `
  -Route "src\app\cockpit-plan-summary-panel" `
  -MainPanel "CockpitPlanSummaryPanel" `
  -CommandLabel "Go to Cockpit Plan Summary Panel" `
  -RouteHref "/cockpit-plan-summary-panel" `
  -Markers @("Cockpit plan summary panel", "Cockpit plan summary panel does not execute plans", "Plan summary requires explicit operator approval before future execution", "Plan summary shows file-write and command-runner readiness in one page", "Denied cockpit plan paths remain blocked", "Cockpit plan summary checklist")
