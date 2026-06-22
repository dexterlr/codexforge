param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1253 Build Fix Result Decision Packet" `
  -ScriptFile "smoke-codexforge-build-fix-result-decision-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-result-decision-packet" `
  -Route "src\app\build-fix-result-decision-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Result Decision Packet" `
  -RouteHref "/build-fix-result-decision-packet" `
  -Markers @("Build fix result decision packet", "Build fix result decision packet does not persist results or make automatic decisions", "Build fix result decision requires explicit operator approval before future action", "Result decision shows accept retry rollback explain manual review success denied blocked failed timeout and needs-review states", "Denied build fix result paths remain blocked", "Build fix result decision checklist")
