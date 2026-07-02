param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2018 Video Backend Prerequisite Lane Preview"
  ScriptFile = "smoke-codexforge-video-backend-prerequisite-lane-preview.ps1"
  Domain = "src\lib\codexforge\video-backend-prerequisite-lane-preview"
  Route = "src\app\video-backend-prerequisite-lane-preview"
  CommandLabel = "Go to Video Backend Prerequisite Lane Preview"
  RouteHref = "/video-backend-prerequisite-lane-preview"
  Markers = @("Video backend prerequisite lane preview", "Video backend prerequisite lane preview does not create services spawn workers install packages bind ports deploy runtimes start services call providers call models or create queues from the UI", "Video backend prerequisite lane preview requires backend-owned implementation outside the frontend", "Denied video backend prerequisite lane paths remain blocked", "Video backend prerequisite lane checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

