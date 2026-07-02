param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2200 Publish Readiness Panel Mock"
  ScriptFile = "smoke-codexforge-publish-readiness-panel-mock.ps1"
  Domain = "src\lib\codexforge\publish-readiness-panel-mock"
  Route = "src\app\publish-readiness-panel-mock"
  CommandLabel = "Go to Publish Readiness Panel Mock"
  RouteHref = "/publish-readiness-panel-mock"
  Markers = @("Publish readiness panel mock", "Publish readiness panel mock uses local React state only and does not publish posts schedule content call social APIs upload media store tokens or persist publish state", "Publish readiness panel mock computes publish readiness from local artifact rights approval account and schedule mock states", "Publish readiness panel mock keeps publish blocked until backend publish gateway wiring exists", "Denied publish and schedule paths remain blocked", "Publish readiness panel mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
