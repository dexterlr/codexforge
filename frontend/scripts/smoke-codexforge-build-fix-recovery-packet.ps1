param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1254 Build Fix Recovery Packet" `
  -ScriptFile "smoke-codexforge-build-fix-recovery-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-recovery-packet" `
  -Route "src\app\build-fix-recovery-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Recovery Packet" `
  -RouteHref "/build-fix-recovery-packet" `
  -Markers @("Build fix recovery packet", "Build fix recovery packet does not execute recovery", "Build fix recovery requires explicit operator approval before future recovery", "Recovery packet shows rollback retry stop restore explain failure and manual review options as blocked previews", "Denied build fix recovery paths remain blocked", "Build fix recovery checklist")
