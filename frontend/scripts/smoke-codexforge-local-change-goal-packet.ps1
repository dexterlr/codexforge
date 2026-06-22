param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1227 Local Change Goal Packet" `
  -ScriptFile "smoke-codexforge-local-change-goal-packet.ps1" `
  -Domain "src\lib\codexforge\local-change-goal-packet" `
  -Route "src\app\local-change-goal-packet" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Goal Packet" `
  -RouteHref "/local-change-goal-packet" `
  -Markers @("Local change goal packet", "Local change goal packet does not call models", "Local change goal packet requires explicit operator approval before future model routing", "Goal packet describes a tiny local project change without sending prompts", "Denied local change goal paths remain blocked", "Local change goal checklist")
