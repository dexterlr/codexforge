param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2017 Video Review Export Lane Summary Preview"
  ScriptFile = "smoke-codexforge-video-review-export-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\video-review-export-lane-summary-preview"
  Route = "src\app\video-review-export-lane-summary-preview"
  CommandLabel = "Go to Video Review Export Lane Summary Preview"
  RouteHref = "/video-review-export-lane-summary-preview"
  Markers = @("Video review export lane summary preview", "Video review export lane summary preview does not export files download media upload files publish posts schedule content persist exports or create artifacts from the UI", "Video review export lane summary preview requires backend-owned export service artifact storage publish gateway and approval capture", "Denied video review export lane summary paths remain blocked", "Video review export lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

