param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1238 Local Change Cockpit Trial View" `
  -ScriptFile "smoke-codexforge-local-change-cockpit-trial-view.ps1" `
  -Domain "src\lib\codexforge\local-change-cockpit-trial-view" `
  -Route "src\app\local-change-cockpit-trial-view" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Cockpit Trial View" `
  -RouteHref "/local-change-cockpit-trial-view" `
  -Markers @("Local change cockpit trial view", "Local change cockpit trial view does not write files or run commands", "Local change cockpit trial view requires explicit operator approval", "Cockpit trial view shows goal plan diff command approval evidence result recovery and audit in one place", "Denied local change cockpit trial paths remain blocked", "Local change cockpit trial checklist")
