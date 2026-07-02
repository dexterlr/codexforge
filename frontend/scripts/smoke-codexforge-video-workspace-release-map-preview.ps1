param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2011 Video Workspace Release Map Preview"
  ScriptFile = "smoke-codexforge-video-workspace-release-map-preview.ps1"
  Domain = "src\lib\codexforge\video-workspace-release-map-preview"
  Route = "src\app\video-workspace-release-map-preview"
  CommandLabel = "Go to Video Workspace Release Map Preview"
  RouteHref = "/video-workspace-release-map-preview"
  Markers = @("Video workspace release map preview", "Video workspace release map preview does not generate content persist workflow state create artifacts export files or publish content from the UI", "Video workspace release map preview requires deterministic synthetic release map rows only", "Denied video workspace release map paths remain blocked", "Video workspace release map checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

