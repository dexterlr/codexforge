param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1917 Video Audience And Goal Preview"
  ScriptFile = "smoke-codexforge-video-audience-and-goal-preview.ps1"
  Domain = "src\lib\codexforge\video-audience-and-goal-preview"
  Route = "src\app\video-audience-and-goal-preview"
  CommandLabel = "Go to Video Audience And Goal Preview"
  RouteHref = "/video-audience-and-goal-preview"
  Markers = @("Video audience and goal preview", "Video audience and goal preview does not personalise ads publish content call analytics or guarantee performance from the UI", "Video audience and goal preview requires deterministic synthetic audience planning only", "Video audience and goal preview shows simulated audience segment simulated viewer goal simulated platform fit simulated success signal simulated no performance guarantee", "Denied video audience and goal paths remain blocked", "Video audience and goal checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
