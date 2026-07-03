param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2224 Storyboard Orbit Panel Preview"
  ScriptFile = "smoke-codexforge-storyboard-orbit-panel-preview.ps1"
  Domain = "storyboard-orbit-panel-preview"
  Route = "storyboard-orbit-panel-preview"
  CommandLabel = "Go to Storyboard Orbit Panel Preview"
  RouteHref = "/storyboard-orbit-panel-preview"
  Markers = @("Storyboard orbit panel preview", "Storyboard orbit panel preview visually upgrades storyboard cards with cinematic scene hierarchy and premium review states", "Storyboard orbit panel preview does not generate images create media render video upload assets persist scenes or call models", "Storyboard orbit panel preview keeps storyboard generation blocked", "Denied storyboard orbit execution paths remain blocked", "Storyboard orbit panel checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
