param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-trial-hardening-smoke-helper.ps1") `
  -SmokeName "Phase 1374 Dirty Workspace Failure Handling" `
  -ScriptFile "smoke-codexforge-dirty-workspace-failure-handling.ps1" `
  -Domain "src\lib\codexforge\dirty-workspace-failure-handling" `
  -Route "src\app\dirty-workspace-failure-handling" `
  -MainPanel "RealTrialHardeningRoutePanel" `
  -CommandLabel "Go to Dirty Workspace Failure Handling" `
  -RouteHref "/dirty-workspace-failure-handling" `
  -Markers @("Dirty workspace failure handling", "Dirty workspace failure handling does not run git commands from the UI", "Dirty workspace failure handling requires explicit operator approval", "Dirty workspace failure handling previews uncommitted change risk stale diff risk conflicting file risk and manual review requirements", "Dirty workspace recovery remains blocked", "Dirty workspace failure checklist")
