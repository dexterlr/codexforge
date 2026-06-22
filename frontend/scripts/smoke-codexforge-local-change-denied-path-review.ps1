param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1239 Local Change Denied Path Review" `
  -ScriptFile "smoke-codexforge-local-change-denied-path-review.ps1" `
  -Domain "src\lib\codexforge\local-change-denied-path-review" `
  -Route "src\app\local-change-denied-path-review" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Denied Path Review" `
  -RouteHref "/local-change-denied-path-review" `
  -Markers @("Local change denied path review", "Local change denied path review does not mutate files or run commands", "Local change denied path review requires explicit operator approval", "Denied path review explains blocked file writes commands env secrets traversal git mutation install deploy and runtime starts", "Denied local change paths remain blocked", "Local change denied path checklist")
