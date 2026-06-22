param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1292 Real Trial Project Context Packet" `
  -ScriptFile "smoke-codexforge-real-trial-project-context-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-project-context-packet" `
  -Route "src\app\real-trial-project-context-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Project Context Packet" `
  -RouteHref "/real-trial-project-context-packet" `
  -Markers @("Real trial project context packet", "Real trial project context packet does not browse arbitrary files or read secrets", "Real trial project context requires explicit operator approval before future indexing", "Project context packet shows bounded workspace context without exposing secret values", "Denied real trial project context paths remain blocked", "Real trial project context checklist")
