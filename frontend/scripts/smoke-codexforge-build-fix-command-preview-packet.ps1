param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1247 Build Fix Command Preview Packet" `
  -ScriptFile "smoke-codexforge-build-fix-command-preview-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-command-preview-packet" `
  -Route "src\app\build-fix-command-preview-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Command Preview Packet" `
  -RouteHref "/build-fix-command-preview-packet" `
  -Markers @("Build fix command preview packet", "Build fix command preview packet does not run commands", "Build fix command preview requires explicit operator approval before future execution", "Command preview packet shows allowlist arguments working directory environment evidence result and recovery readiness", "Denied build fix command preview paths remain blocked", "Build fix command preview checklist")
