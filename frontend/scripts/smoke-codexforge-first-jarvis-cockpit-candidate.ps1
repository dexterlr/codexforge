param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2242 First Jarvis Cockpit Candidate"
  ScriptFile = "smoke-codexforge-first-jarvis-cockpit-candidate.ps1"
  Domain = "first-jarvis-cockpit-candidate"
  Route = "first-jarvis-cockpit-candidate"
  CommandLabel = "Go to First Jarvis Cockpit Candidate"
  RouteHref = "/first-jarvis-cockpit-candidate"
  Markers = @("First Jarvis cockpit candidate", "First Jarvis cockpit candidate combines mission control hero holographic command grid readiness orbs cinematic timeline premium panels systems wall blocked command deck and contract drawer", "First Jarvis cockpit candidate does not execute backend actions persist data call services upload download render export publish schedule or store credentials", "First Jarvis cockpit candidate requires backend wiring before protected actions", "Denied first Jarvis cockpit execution paths remain blocked", "First Jarvis cockpit checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
