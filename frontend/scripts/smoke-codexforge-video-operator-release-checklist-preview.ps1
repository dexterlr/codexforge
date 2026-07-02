param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2020 Video Operator Release Checklist Preview"
  ScriptFile = "smoke-codexforge-video-operator-release-checklist-preview.ps1"
  Domain = "src\lib\codexforge\video-operator-release-checklist-preview"
  Route = "src\app\video-operator-release-checklist-preview"
  CommandLabel = "Go to Video Operator Release Checklist Preview"
  RouteHref = "/video-operator-release-checklist-preview"
  Markers = @("Video operator release checklist preview", "Video operator release checklist preview does not persist approvals release locks dispatch workers create jobs export files publish content or schedule posts from the UI", "Video operator release checklist preview requires backend-owned operator review approval capture rights review consent review and explicit operator approval", "Denied video operator release checklist paths remain blocked", "Video operator release checklist checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

