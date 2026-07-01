param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1922 Video Storyboard Planning Boundary Preview"
  ScriptFile = "smoke-codexforge-video-storyboard-planning-boundary-preview.ps1"
  Domain = "src\lib\codexforge\video-storyboard-planning-boundary-preview"
  Route = "src\app\video-storyboard-planning-boundary-preview"
  CommandLabel = "Go to Video Storyboard Planning Boundary Preview"
  RouteHref = "/video-storyboard-planning-boundary-preview"
  Markers = @("Video storyboard planning boundary preview", "Video storyboard planning boundary preview does not generate images call image providers write storyboards or persist assets from the UI", "Video storyboard planning boundary preview requires backend-owned storyboard and asset workflow", "Video storyboard planning boundary preview shows simulated scene card simulated visual note simulated shot type simulated transition note simulated image generation blocked state", "Denied video storyboard planning paths remain blocked", "Video storyboard planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
