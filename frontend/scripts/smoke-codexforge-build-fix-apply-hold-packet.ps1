param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1250 Build Fix Apply Hold Packet" `
  -ScriptFile "smoke-codexforge-build-fix-apply-hold-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-apply-hold-packet" `
  -Route "src\app\build-fix-apply-hold-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Apply Hold Packet" `
  -RouteHref "/build-fix-apply-hold-packet" `
  -Markers @("Build fix apply hold packet", "Build fix apply hold packet does not write files", "Build fix apply hold requires explicit operator approval", "Apply hold keeps diff apply and file mutation blocked", "Denied build fix apply paths remain blocked", "Build fix apply hold checklist")
