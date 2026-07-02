param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2015 Video Audio Caption Lane Summary Preview"
  ScriptFile = "smoke-codexforge-video-audio-caption-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\video-audio-caption-lane-summary-preview"
  Route = "src\app\video-audio-caption-lane-summary-preview"
  CommandLabel = "Go to Video Audio Caption Lane Summary Preview"
  RouteHref = "/video-audio-caption-lane-summary-preview"
  Markers = @("Video audio caption lane summary preview", "Video audio caption lane summary preview does not synthesize voice clone voice transcribe audio burn captions export subtitles persist captions or store audio from the UI", "Video audio caption lane summary preview requires backend-owned audio storage caption workflow consent review and approval capture", "Denied video audio caption lane summary paths remain blocked", "Video audio caption lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

