param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1232 Local Change Apply Hold" `
  -ScriptFile "smoke-codexforge-local-change-apply-hold.ps1" `
  -Domain "src\lib\codexforge\local-change-apply-hold" `
  -Route "src\app\local-change-apply-hold" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Apply Hold" `
  -RouteHref "/local-change-apply-hold" `
  -Markers @("Local change apply hold", "Local change apply hold does not write files", "Local change apply hold requires explicit operator approval", "Apply hold keeps file mutation blocked", "Denied local change apply paths remain blocked", "Local change apply hold checklist")
