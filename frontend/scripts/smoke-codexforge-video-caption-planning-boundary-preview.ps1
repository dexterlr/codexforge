param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1924 Video Caption Planning Boundary Preview"
  ScriptFile = "smoke-codexforge-video-caption-planning-boundary-preview.ps1"
  Domain = "src\lib\codexforge\video-caption-planning-boundary-preview"
  Route = "src\app\video-caption-planning-boundary-preview"
  CommandLabel = "Go to Video Caption Planning Boundary Preview"
  RouteHref = "/video-caption-planning-boundary-preview"
  Markers = @("Video caption planning boundary preview", "Video caption planning boundary preview does not transcribe audio burn captions export subtitles or write caption files from the UI", "Video caption planning boundary preview requires backend-owned caption workflow", "Video caption planning boundary preview shows simulated caption style simulated accessibility note simulated subtitle target simulated review note simulated export blocked state", "Denied video caption planning paths remain blocked", "Video caption planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
