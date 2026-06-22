param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1204 Cockpit Safety Coach Panel" `
  -ScriptFile "smoke-codexforge-cockpit-safety-coach-panel.ps1" `
  -Domain "src\lib\codexforge\cockpit-safety-coach-panel" `
  -Route "src\app\cockpit-safety-coach-panel" `
  -MainPanel "CockpitSafetyCoachPanel" `
  -CommandLabel "Go to Cockpit Safety Coach Panel" `
  -RouteHref "/cockpit-safety-coach-panel" `
  -Markers @("Cockpit safety coach panel", "Cockpit safety coach panel does not override approval", "Safety coach requires explicit operator approval before any future execution", "Safety coach explains why file writes commands providers runtimes and adapters remain blocked", "Denied cockpit safety coach paths remain blocked", "Cockpit safety coach checklist")
