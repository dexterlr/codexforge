param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1921 Video Script Planning Boundary Preview"
  ScriptFile = "smoke-codexforge-video-script-planning-boundary-preview.ps1"
  Domain = "src\lib\codexforge\video-script-planning-boundary-preview"
  Route = "src\app\video-script-planning-boundary-preview"
  CommandLabel = "Go to Video Script Planning Boundary Preview"
  RouteHref = "/video-script-planning-boundary-preview"
  Markers = @("Video script planning boundary preview", "Video script planning boundary preview does not call models send prompts persist prompts write files or generate final copy from the UI", "Video script planning boundary preview requires backend-owned model gateway before generation", "Video script planning boundary preview shows simulated hook simulated body beats simulated CTA simulated review note simulated no provider call state", "Denied video script planning paths remain blocked", "Video script planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
