param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1244 Build Fix Project Context Packet" `
  -ScriptFile "smoke-codexforge-build-fix-project-context-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-project-context-packet" `
  -Route "src\app\build-fix-project-context-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Project Context Packet" `
  -RouteHref "/build-fix-project-context-packet" `
  -Markers @("Build fix project context packet", "Build fix project context packet does not browse arbitrary files", "Build fix project context requires explicit operator approval before future indexing", "Project context shows bounded workspace summary without reading secrets", "Denied build fix project context paths remain blocked", "Build fix project context checklist")
