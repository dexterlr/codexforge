param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2019 Video Blocked Action Lane Preview"
  ScriptFile = "smoke-codexforge-video-blocked-action-lane-preview.ps1"
  Domain = "src\lib\codexforge\video-blocked-action-lane-preview"
  Route = "src\app\video-blocked-action-lane-preview"
  CommandLabel = "Go to Video Blocked Action Lane Preview"
  RouteHref = "/video-blocked-action-lane-preview"
  Markers = @("Video blocked action lane preview", "Video blocked action lane preview does not bypass approvals unlock generation enable rendering enable export enable publishing enable scheduling call providers or persist assets from the UI", "Video blocked action lane preview requires deterministic synthetic blocked-action explanations only", "Denied video blocked action lane paths remain blocked", "Video blocked action lane checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

