param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2198 Render Readiness Panel Mock"
  ScriptFile = "smoke-codexforge-render-readiness-panel-mock.ps1"
  Domain = "src\lib\codexforge\render-readiness-panel-mock"
  Route = "src\app\render-readiness-panel-mock"
  CommandLabel = "Go to Render Readiness Panel Mock"
  RouteHref = "/render-readiness-panel-mock"
  Markers = @("Render readiness panel mock", "Render readiness panel mock uses local React state only and does not create render jobs create queues dispatch workers render videos or persist readiness", "Render readiness panel mock computes readiness from local brief storyboard asset audio caption rights and approval mock states", "Render readiness panel mock keeps render blocked until backend queue and worker wiring exists", "Denied render queue paths remain blocked", "Render readiness panel mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
