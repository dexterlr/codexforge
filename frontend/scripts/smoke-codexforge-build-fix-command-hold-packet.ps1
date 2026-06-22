param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1251 Build Fix Command Hold Packet" `
  -ScriptFile "smoke-codexforge-build-fix-command-hold-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-command-hold-packet" `
  -Route "src\app\build-fix-command-hold-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Command Hold Packet" `
  -RouteHref "/build-fix-command-hold-packet" `
  -Markers @("Build fix command hold packet", "Build fix command hold packet does not run commands", "Build fix command hold requires explicit operator approval", "Command hold keeps build test smoke git runtime and shell execution blocked", "Denied build fix command hold paths remain blocked", "Build fix command hold checklist")
