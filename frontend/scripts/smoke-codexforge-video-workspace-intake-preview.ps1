param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1915 Video Workspace Intake Preview"
  ScriptFile = "smoke-codexforge-video-workspace-intake-preview.ps1"
  Domain = "src\lib\codexforge\video-workspace-intake-preview"
  Route = "src\app\video-workspace-intake-preview"
  CommandLabel = "Go to Video Workspace Intake Preview"
  RouteHref = "/video-workspace-intake-preview"
  Markers = @("Video workspace intake preview", "Video workspace intake preview does not persist briefs upload assets call models generate scripts or create files from the UI", "Video workspace intake preview requires deterministic synthetic intake rows only", "Video workspace intake preview shows simulated project name simulated channel simulated objective simulated audience simulated workflow state and denied frontend persistence", "Denied video workspace intake paths remain blocked", "Video workspace intake checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
