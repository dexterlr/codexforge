param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1435 Plan Step Packet" `
  -ScriptFile "smoke-codexforge-plan-step-packet.ps1" `
  -Domain "src\lib\codexforge\plan-step-packet" `
  -Route "src\app\plan-step-packet" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Plan Step Packet" `
  -RouteHref "/plan-step-packet" `
  -Markers @("Plan step packet", "Plan step packet does not execute steps", "Plan step packet requires explicit operator approval before execution", "Plan step packet previews ordered actions dependencies risks files commands evidence and done criteria", "Denied plan step paths remain blocked", "Plan step checklist")
