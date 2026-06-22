param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1233 Local Change Command Hold" `
  -ScriptFile "smoke-codexforge-local-change-command-hold.ps1" `
  -Domain "src\lib\codexforge\local-change-command-hold" `
  -Route "src\app\local-change-command-hold" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Command Hold" `
  -RouteHref "/local-change-command-hold" `
  -Markers @("Local change command hold", "Local change command hold does not run commands", "Local change command hold requires explicit operator approval", "Command hold keeps command execution blocked", "Denied local change command hold paths remain blocked", "Local change command hold checklist")
