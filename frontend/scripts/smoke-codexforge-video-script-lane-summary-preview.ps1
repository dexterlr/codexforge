param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2013 Video Script Lane Summary Preview"
  ScriptFile = "smoke-codexforge-video-script-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\video-script-lane-summary-preview"
  Route = "src\app\video-script-lane-summary-preview"
  CommandLabel = "Go to Video Script Lane Summary Preview"
  RouteHref = "/video-script-lane-summary-preview"
  Markers = @("Video script lane summary preview", "Video script lane summary preview does not generate final scripts send prompts call models persist scripts or write files from the UI", "Video script lane summary preview requires backend-owned provider gateway and script persistence before generation", "Denied video script lane summary paths remain blocked", "Video script lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

