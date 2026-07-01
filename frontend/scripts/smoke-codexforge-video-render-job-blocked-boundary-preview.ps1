param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1925 Video Render Job Blocked Boundary Preview"
  ScriptFile = "smoke-codexforge-video-render-job-blocked-boundary-preview.ps1"
  Domain = "src\lib\codexforge\video-render-job-blocked-boundary-preview"
  Route = "src\app\video-render-job-blocked-boundary-preview"
  CommandLabel = "Go to Video Render Job Blocked Boundary Preview"
  RouteHref = "/video-render-job-blocked-boundary-preview"
  Markers = @("Video render job blocked boundary preview", "Video render job blocked boundary preview blocks frontend render queues frontend worker dispatch frontend provider calls frontend file writes frontend export jobs and frontend artifact persistence", "Video render job blocked boundary preview requires backend-owned render service explicit operator approval and artifact storage", "Video render job blocked boundary preview shows denied render job denied worker dispatch denied provider call denied file write denied artifact persistence and backend prerequisite", "Denied video render job paths remain blocked", "Video render job blocked boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
