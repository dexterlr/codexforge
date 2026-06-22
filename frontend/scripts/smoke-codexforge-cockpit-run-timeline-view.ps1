param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1221 Cockpit Run Timeline View" `
  -ScriptFile "smoke-codexforge-cockpit-run-timeline-view.ps1" `
  -Domain "src\lib\codexforge\cockpit-run-timeline-view" `
  -Route "src\app\cockpit-run-timeline-view" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Run Timeline View" `
  -RouteHref "/cockpit-run-timeline-view" `
  -Markers @("Cockpit run timeline view", "Cockpit run timeline view does not create run records", "Run timeline requires explicit operator approval before future persistence", "Run timeline shows goal plan approval execution evidence result and recovery stages", "Denied cockpit run timeline paths remain blocked", "Cockpit run timeline checklist")

