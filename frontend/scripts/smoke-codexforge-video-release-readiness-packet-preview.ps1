param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2021 Video Release Readiness Packet Preview"
  ScriptFile = "smoke-codexforge-video-release-readiness-packet-preview.ps1"
  Domain = "src\lib\codexforge\video-release-readiness-packet-preview"
  Route = "src\app\video-release-readiness-packet-preview"
  CommandLabel = "Go to Video Release Readiness Packet Preview"
  RouteHref = "/video-release-readiness-packet-preview"
  Markers = @("Video release readiness packet preview", "Video release readiness packet preview does not persist approvals persist artifacts write files export reports create downloads publish posts or enable rendering from the UI", "Video release readiness packet preview requires backend-owned release packet workflow export service artifact storage and approval capture", "Denied video release readiness packet paths remain blocked", "Video release readiness packet checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

