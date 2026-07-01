param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1926 Video Export Blocked Boundary Preview"
  ScriptFile = "smoke-codexforge-video-export-blocked-boundary-preview.ps1"
  Domain = "src\lib\codexforge\video-export-blocked-boundary-preview"
  Route = "src\app\video-export-blocked-boundary-preview"
  CommandLabel = "Go to Video Export Blocked Boundary Preview"
  RouteHref = "/video-export-blocked-boundary-preview"
  Markers = @("Video export blocked boundary preview", "Video export blocked boundary preview blocks frontend download frontend export frontend upload frontend social posting frontend scheduling and frontend publishing", "Video export blocked boundary preview requires backend-owned export service rights review approval capture and operator approval", "Video export blocked boundary preview shows denied export denied download denied upload denied publish denied schedule and approval requirement", "Denied video export paths remain blocked", "Video export blocked boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
