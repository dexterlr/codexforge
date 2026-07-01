param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1918 Video Format Boundary Preview"
  ScriptFile = "smoke-codexforge-video-format-boundary-preview.ps1"
  Domain = "src\lib\codexforge\video-format-boundary-preview"
  Route = "src\app\video-format-boundary-preview"
  CommandLabel = "Go to Video Format Boundary Preview"
  RouteHref = "/video-format-boundary-preview"
  Markers = @("Video format boundary preview", "Video format boundary preview does not render files resize assets transcode video export timelines or upload media from the UI", "Video format boundary preview requires backend-owned render and export services", "Video format boundary preview shows simulated short form format simulated long form format simulated aspect ratio note simulated duration target simulated export blocked state", "Denied video format boundary paths remain blocked", "Video format boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
