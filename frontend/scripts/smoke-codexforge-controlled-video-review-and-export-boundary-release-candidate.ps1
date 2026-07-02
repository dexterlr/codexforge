param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2009 Controlled Video Review And Export Boundary Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-video-review-and-export-boundary-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-video-review-and-export-boundary-release-candidate"
  Route = "src\app\controlled-video-review-and-export-boundary-release-candidate"
  CommandLabel = "Go to Controlled Video Review And Export Boundary Release Candidate"
  RouteHref = "/controlled-video-review-and-export-boundary-release-candidate"
  Markers = @("Controlled video review and export boundary release candidate", "Controlled video review and export boundary release requires explicit operator approval", "Denied controlled video review and export boundary paths remain blocked", "Controlled video review and export boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params
