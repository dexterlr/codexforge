param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1240 First Approved Local Change Candidate" `
  -ScriptFile "smoke-codexforge-first-approved-local-change-candidate.ps1" `
  -Domain "src\lib\codexforge\first-approved-local-change-candidate" `
  -Route "src\app\first-approved-local-change-candidate" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to First Approved Local Change Candidate" `
  -RouteHref "/first-approved-local-change-candidate" `
  -Markers @("First approved local change candidate", "First approved local change candidate does not write files or run commands", "First approved local change candidate requires explicit operator approval", "Candidate combines local goal plan diff command approval holds evidence result recovery audit and cockpit trial view", "Denied first approved local change paths remain blocked", "First approved local change checklist")
