param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1252 Build Fix Evidence Packet" `
  -ScriptFile "smoke-codexforge-build-fix-evidence-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-evidence-packet" `
  -Route "src\app\build-fix-evidence-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Evidence Packet" `
  -RouteHref "/build-fix-evidence-packet" `
  -Markers @("Build fix evidence packet", "Build fix evidence packet does not persist evidence", "Build fix evidence requires explicit operator approval before future persistence", "Evidence packet shows diff command stdout stderr exit code approval operator timestamp and audit placeholders", "Denied build fix evidence paths remain blocked", "Build fix evidence checklist")
