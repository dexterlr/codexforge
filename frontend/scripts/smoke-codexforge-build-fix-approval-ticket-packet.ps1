param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1249 Build Fix Approval Ticket Packet" `
  -ScriptFile "smoke-codexforge-build-fix-approval-ticket-packet.ps1" `
  -Domain "src\lib\codexforge\build-fix-approval-ticket-packet" `
  -Route "src\app\build-fix-approval-ticket-packet" `
  -MainPanel "EndToEndBuildFixWorkflowRoutePanel" `
  -CommandLabel "Go to Build Fix Approval Ticket Packet" `
  -RouteHref "/build-fix-approval-ticket-packet" `
  -Markers @("Build fix approval ticket packet", "Build fix approval ticket packet does not approve actions", "Build fix approval ticket requires explicit human approval", "Approval ticket keeps file writes commands evidence persistence result persistence recovery and audit blocked", "Denied build fix approval paths remain blocked", "Build fix approval ticket checklist")
