param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2219 Mission Control Hero Preview"
  ScriptFile = "smoke-codexforge-mission-control-hero-preview.ps1"
  Domain = "mission-control-hero-preview"
  Route = "mission-control-hero-preview"
  CommandLabel = "Go to Mission Control Hero Preview"
  RouteHref = "/mission-control-hero-preview"
  Markers = @("Mission control hero preview", "Mission control hero preview adds a cinematic top-level cockpit hero with mission status readiness language and backend wiring required messaging", "Mission control hero preview does not trigger generation rendering export publish schedule upload download persistence provider calls model calls connector calls or command execution", "Mission control hero preview keeps protected actions blocked and visually intentional", "Denied mission control hero execution paths remain blocked", "Mission control hero checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
