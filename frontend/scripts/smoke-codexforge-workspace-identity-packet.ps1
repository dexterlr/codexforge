param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1403 Workspace Identity Packet" `
  -ScriptFile "smoke-codexforge-workspace-identity-packet.ps1" `
  -Domain "src\lib\codexforge\workspace-identity-packet" `
  -Route "src\app\workspace-identity-packet" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Workspace Identity Packet" `
  -RouteHref "/workspace-identity-packet" `
  -Markers @("Workspace identity packet", "Workspace identity packet does not read secrets", "Workspace identity packet requires explicit operator approval for backend-owned inspection", "Workspace identity previews root path project name branch hint package hint and workspace boundary", "Denied workspace identity paths remain blocked", "Workspace identity checklist")
