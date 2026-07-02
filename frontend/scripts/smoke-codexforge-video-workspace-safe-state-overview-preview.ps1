param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2012 Video Workspace Safe State Overview Preview"
  ScriptFile = "smoke-codexforge-video-workspace-safe-state-overview-preview.ps1"
  Domain = "src\lib\codexforge\video-workspace-safe-state-overview-preview"
  Route = "src\app\video-workspace-safe-state-overview-preview"
  CommandLabel = "Go to Video Workspace Safe State Overview Preview"
  RouteHref = "/video-workspace-safe-state-overview-preview"
  Markers = @("Video workspace safe state overview preview", "Video workspace safe state overview preview does not render videos export files call providers persist jobs or publish content from the UI", "Video workspace safe state overview preview requires deterministic synthetic safe state only", "Denied video workspace safe state overview paths remain blocked", "Video workspace safe state overview checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

