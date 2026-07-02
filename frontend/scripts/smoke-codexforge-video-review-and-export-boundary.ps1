param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1994 Video Review And Export Boundary"
  ScriptFile = "smoke-codexforge-video-review-and-export-boundary.ps1"
  Domain = "src\lib\codexforge\video-review-and-export-boundary"
  Route = "src\app\video-review-and-export-boundary"
  CommandLabel = "Go to Video Review And Export Boundary"
  RouteHref = "/video-review-and-export-boundary"
  Markers = @("Video review and export boundary", "Video review and export boundary does not export download upload publish schedule render create render queues dispatch workers create artifacts persist artifacts call providers call models call connectors send prompts persist approvals persist revisions persist captions persist transcripts persist audio persist assets persist rights persist prompts persist jobs or write files from the UI", "Video review and export boundary requires explicit operator approval", "Denied video review and export paths remain blocked", "Video review and export boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

