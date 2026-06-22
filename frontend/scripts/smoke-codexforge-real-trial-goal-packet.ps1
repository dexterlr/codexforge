param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-real-controlled-operator-trial-packet-smoke-helper.ps1") `
  -SmokeName "Phase 1291 Real Trial Goal Packet" `
  -ScriptFile "smoke-codexforge-real-trial-goal-packet.ps1" `
  -Domain "src\lib\codexforge\real-trial-goal-packet" `
  -Route "src\app\real-trial-goal-packet" `
  -MainPanel "RealControlledOperatorTrialPacketRoutePanel" `
  -CommandLabel "Go to Real Trial Goal Packet" `
  -RouteHref "/real-trial-goal-packet" `
  -Markers @("Real trial goal packet", "Real trial goal packet does not call models or send prompts", "Real trial goal packet requires explicit operator approval before future model routing", "Goal packet describes the real operator request before execution can be considered", "Denied real trial goal paths remain blocked", "Real trial goal checklist")
