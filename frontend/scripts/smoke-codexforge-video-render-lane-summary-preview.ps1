param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2016 Video Render Lane Summary Preview"
  ScriptFile = "smoke-codexforge-video-render-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\video-render-lane-summary-preview"
  Route = "src\app\video-render-lane-summary-preview"
  CommandLabel = "Go to Video Render Lane Summary Preview"
  RouteHref = "/video-render-lane-summary-preview"
  Markers = @("Video render lane summary preview", "Video render lane summary preview does not render videos create queues dispatch workers create artifacts persist render jobs or export media from the UI", "Video render lane summary preview requires backend-owned render service render queue worker orchestration and artifact storage", "Denied video render lane summary paths remain blocked", "Video render lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

