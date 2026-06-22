param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1255 Build Fix Audit Timeline Packet" `
  -ScriptFile "smoke-codexforge-build-fix-audit-timeline-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-audit-timeline-packet" `
  -Route "src\app\build-fix-audit-timeline-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Audit Timeline Packet" `
  -RouteHref "/build-fix-audit-timeline-packet" `
  -Markers @("Build fix audit timeline packet", "Build fix audit timeline packet does not persist audit logs", "Build fix audit timeline requires explicit operator approval before future persistence", "Audit timeline shows goal context plan diff command risk approval evidence result recovery and operator placeholders", "Denied build fix audit timeline paths remain blocked", "Build fix audit timeline checklist")
