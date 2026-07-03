param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2247 Jarvis Cockpit Checkpoint Completion Guard"
  ScriptFile = "smoke-codexforge-jarvis-cockpit-checkpoint-completion-guard.ps1"
  Domain = "jarvis-cockpit-checkpoint-completion-guard"
  Route = "jarvis-cockpit-checkpoint-completion-guard"
  CommandLabel = "Go to Jarvis Cockpit Checkpoint Completion Guard"
  RouteHref = "/jarvis-cockpit-checkpoint-completion-guard"
  Markers = @("Jarvis cockpit checkpoint completion guard", "Jarvis cockpit checkpoint completion guard updates checkpoint docs through phase 2249 and marks Jarvis cockpit visual upgrade complete without claiming backend wiring exists", "Jarvis cockpit checkpoint completion guard records next likely batch as First Backend Wiring Boundary Mega Batch v1", "Jarvis cockpit checkpoint completion guard states backend contracts and visual UX are complete enough for first backend wiring boundary", "Denied Jarvis checkpoint regression paths remain blocked", "Jarvis cockpit checkpoint completion checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
