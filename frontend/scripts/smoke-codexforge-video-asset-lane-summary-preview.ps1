param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2014 Video Asset Lane Summary Preview"
  ScriptFile = "smoke-codexforge-video-asset-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\video-asset-lane-summary-preview"
  Route = "src\app\video-asset-lane-summary-preview"
  CommandLabel = "Go to Video Asset Lane Summary Preview"
  RouteHref = "/video-asset-lane-summary-preview"
  Markers = @("Video asset lane summary preview", "Video asset lane summary preview does not upload assets download assets store media generate images persist rights or create artifacts from the UI", "Video asset lane summary preview requires backend-owned asset storage rights review and approval capture", "Denied video asset lane summary paths remain blocked", "Video asset lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

