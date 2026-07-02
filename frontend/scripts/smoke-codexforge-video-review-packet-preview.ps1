param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1995 Video Review Packet Preview"
  ScriptFile = "smoke-codexforge-video-review-packet-preview.ps1"
  Domain = "src\lib\codexforge\video-review-packet-preview"
  Route = "src\app\video-review-packet-preview"
  CommandLabel = "Go to Video Review Packet Preview"
  RouteHref = "/video-review-packet-preview"
  Markers = @("Video review packet preview", "Video review packet preview does not load media files export artifacts persist review packets or call providers from the UI", "Video review packet preview requires deterministic synthetic review packet rows only", "Denied video review packet paths remain blocked", "Video review packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

