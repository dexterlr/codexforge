param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1999 Caption And Audio Review Preview"
  ScriptFile = "smoke-codexforge-caption-and-audio-review-preview.ps1"
  Domain = "src\lib\codexforge\caption-and-audio-review-preview"
  Route = "src\app\caption-and-audio-review-preview"
  CommandLabel = "Go to Caption And Audio Review Preview"
  RouteHref = "/caption-and-audio-review-preview"
  Markers = @("Caption and audio review preview", "Caption and audio review preview does not transcribe audio export captions generate subtitles persist captions persist transcripts persist audio or download files from the UI", "Caption and audio review preview requires backend-owned caption and audio workflow", "Denied caption and audio review paths remain blocked", "Caption and audio review checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

