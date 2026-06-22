param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-goal-compiler-smoke-helper.ps1") `
  -SmokeName "Phase 1419 Raw Goal Intake Packet" `
  -ScriptFile "smoke-codexforge-raw-goal-intake-packet.ps1" `
  -Domain "src\lib\codexforge\raw-goal-intake-packet" `
  -Route "src\app\raw-goal-intake-packet" `
  -MainPanel "GoalCompilerRoutePanel" `
  -CommandLabel "Go to Raw Goal Intake Packet" `
  -RouteHref "/raw-goal-intake-packet" `
  -Markers @("Raw goal intake packet", "Raw goal intake packet does not execute the goal", "Raw goal intake packet requires explicit operator approval before execution", "Raw goal intake normalizes operator goal text into a review-only packet", "Denied raw goal intake paths remain blocked", "Raw goal intake checklist")
