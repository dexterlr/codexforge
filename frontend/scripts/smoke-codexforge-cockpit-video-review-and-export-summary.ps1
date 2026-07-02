param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2007 Cockpit Video Review And Export Summary"
  ScriptFile = "smoke-codexforge-cockpit-video-review-and-export-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-video-review-and-export-summary"
  Route = "src\app\cockpit-video-review-and-export-summary"
  CommandLabel = "Go to Cockpit Video Review And Export Summary"
  RouteHref = "/cockpit-video-review-and-export-summary"
  Markers = @("Cockpit video review and export summary", "Cockpit video review and export summary keeps the cockpit as the normal user surface", "Phase pages remain dev test diagnostics only", "Cockpit video review and export checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

