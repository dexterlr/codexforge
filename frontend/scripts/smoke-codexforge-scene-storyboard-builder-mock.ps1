param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2190 Scene Storyboard Builder Mock"
  ScriptFile = "smoke-codexforge-scene-storyboard-builder-mock.ps1"
  Domain = "src\lib\codexforge\scene-storyboard-builder-mock"
  Route = "src\app\scene-storyboard-builder-mock"
  CommandLabel = "Go to Scene Storyboard Builder Mock"
  RouteHref = "/scene-storyboard-builder-mock"
  Markers = @("Scene storyboard builder mock", "Scene storyboard builder mock uses local React state only and does not create media generate images render video upload assets or persist scene cards", "Scene storyboard builder mock includes scene cards with visual intent motion note asset placeholder and risk note", "Scene storyboard builder mock supports local-only scene selection reorder-like controls or status toggles without persistence", "Denied storyboard generation paths remain blocked", "Scene storyboard builder mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
