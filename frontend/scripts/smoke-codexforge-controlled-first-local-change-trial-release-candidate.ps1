param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1241 Controlled First Local Change Trial Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-first-local-change-trial-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-first-local-change-trial-release-candidate" `
  -Route "src\app\controlled-first-local-change-trial-release-candidate" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Controlled First Local Change Trial Release Candidate" `
  -RouteHref "/controlled-first-local-change-trial-release-candidate" `
  -Markers @("Controlled first local change trial release candidate", "Controlled first local change trial release candidate does not call models write files run commands persist evidence or execute recovery", "Controlled first local change trial release requires explicit operator approval", "Release candidate moves CodexForge toward the first approved local project change", "Denied controlled first local change paths remain blocked", "Controlled first local change trial release checklist")
