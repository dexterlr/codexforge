param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1245 Build Fix Plan Summary Packet" `
  -ScriptFile "smoke-codexforge-build-fix-plan-summary-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-plan-summary-packet" `
  -Route "src\app\build-fix-plan-summary-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Plan Summary Packet" `
  -RouteHref "/build-fix-plan-summary-packet" `
  -Markers @("Build fix plan summary packet", "Build fix plan summary packet does not execute plans", "Build fix plan summary requires explicit operator approval before future execution", "Plan summary shows file diff command preview risk evidence result and recovery steps", "Denied build fix plan paths remain blocked", "Build fix plan summary checklist")
