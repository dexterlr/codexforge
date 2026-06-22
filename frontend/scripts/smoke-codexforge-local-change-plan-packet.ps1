param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1228 Local Change Plan Packet" `
  -ScriptFile "smoke-codexforge-local-change-plan-packet.ps1" `
  -Domain "src\lib\codexforge\local-change-plan-packet" `
  -Route "src\app\local-change-plan-packet" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Plan Packet" `
  -RouteHref "/local-change-plan-packet" `
  -Markers @("Local change plan packet", "Local change plan packet does not execute plans", "Local change plan requires explicit operator approval before future execution", "Plan packet shows file diff command preview evidence result and recovery steps", "Denied local change plan paths remain blocked", "Local change plan checklist")
