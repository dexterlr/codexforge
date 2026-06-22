param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1226 First Local Change Trial Boundary" `
  -ScriptFile "smoke-codexforge-first-local-change-trial-boundary.ps1" `
  -Domain "src\lib\codexforge\first-local-change-trial-boundary" `
  -Route "src\app\first-local-change-trial-boundary" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to First Local Change Trial Boundary" `
  -RouteHref "/first-local-change-trial-boundary" `
  -Markers @("First local change trial boundary", "First local change trial boundary does not write files or run commands", "First local change trial requires explicit operator approval", "Local change trial unifies goal plan diff command approval evidence result and recovery", "Denied first local change trial paths remain blocked", "First local change trial checklist")
