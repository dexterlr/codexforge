param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1219 Cockpit Explain Failure View" `
  -ScriptFile "smoke-codexforge-cockpit-explain-failure-view.ps1" `
  -Domain "src\lib\codexforge\cockpit-explain-failure-view" `
  -Route "src\app\cockpit-explain-failure-view" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Explain Failure View" `
  -RouteHref "/cockpit-explain-failure-view" `
  -Markers @("Cockpit explain failure view", "Cockpit explain failure view does not call models", "Explain failure requires explicit operator approval before future model assistance", "Explain failure shows deterministic failure categories without provider calls", "Denied cockpit explain failure paths remain blocked", "Cockpit explain failure checklist")

