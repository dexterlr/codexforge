param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1243 Build Fix Goal Intake Packet" `
  -ScriptFile "smoke-codexforge-build-fix-goal-intake-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-goal-intake-packet" `
  -Route "src\app\build-fix-goal-intake-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Goal Intake Packet" `
  -RouteHref "/build-fix-goal-intake-packet" `
  -Markers @("Build fix goal intake packet", "Build fix goal intake packet does not send prompts or call models", "Build fix goal intake requires explicit operator approval before future model routing", "Goal intake supports apps websites dashboards games tools research workflows data integrations and general local projects", "Denied build fix goal intake paths remain blocked", "Build fix goal intake checklist")
