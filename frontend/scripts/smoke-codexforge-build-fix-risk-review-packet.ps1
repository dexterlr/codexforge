param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1248 Build Fix Risk Review Packet" `
  -ScriptFile "smoke-codexforge-build-fix-risk-review-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-risk-review-packet" `
  -Route "src\app\build-fix-risk-review-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Risk Review Packet" `
  -RouteHref "/build-fix-risk-review-packet" `
  -Markers @("Build fix risk review packet", "Build fix risk review packet does not approve or execute actions", "Build fix risk review requires explicit operator approval", "Risk review explains file mutation command execution secrets traversal install deploy runtime adapter provider connector and model risks", "Denied build fix risk paths remain blocked", "Build fix risk review checklist")
