param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1920 Video Asset Planning Boundary Preview"
  ScriptFile = "smoke-codexforge-video-asset-planning-boundary-preview.ps1"
  Domain = "src\lib\codexforge\video-asset-planning-boundary-preview"
  Route = "src\app\video-asset-planning-boundary-preview"
  CommandLabel = "Go to Video Asset Planning Boundary Preview"
  RouteHref = "/video-asset-planning-boundary-preview"
  Markers = @("Video asset planning boundary preview", "Video asset planning boundary preview does not upload assets download assets store media mutate files or call asset providers from the UI", "Video asset planning boundary preview requires backend-owned asset storage", "Video asset planning boundary preview shows simulated shot asset simulated logo asset simulated b-roll asset simulated music asset simulated storage prerequisite and denied frontend persistence", "Denied video asset planning paths remain blocked", "Video asset planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
