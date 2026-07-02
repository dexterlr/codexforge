param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2008 First Video Review And Export Boundary Candidate"
  ScriptFile = "smoke-codexforge-first-video-review-and-export-boundary-candidate.ps1"
  Domain = "src\lib\codexforge\first-video-review-and-export-boundary-candidate"
  Route = "src\app\first-video-review-and-export-boundary-candidate"
  CommandLabel = "Go to First Video Review And Export Boundary Candidate"
  RouteHref = "/first-video-review-and-export-boundary-candidate"
  Markers = @("First video review and export boundary candidate", "First video review and export boundary candidate requires explicit operator approval", "Denied first video review and export boundary paths remain blocked", "First video review and export boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

