param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2209 Cockpit Interactive Video Workspace Summary"
  ScriptFile = "smoke-codexforge-cockpit-interactive-video-workspace-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-interactive-video-workspace-summary"
  Route = "src\app\cockpit-interactive-video-workspace-summary"
  CommandLabel = "Go to Cockpit Interactive Video Workspace Summary"
  RouteHref = "/cockpit-interactive-video-workspace-summary"
  Markers = @("Cockpit interactive video workspace summary", "Cockpit interactive video workspace summary keeps the cockpit as the normal user surface and makes the video workspace feel usable", "Cockpit interactive video workspace summary does not remove backend contract safety boundaries or diagnostic phase coverage", "Cockpit interactive video workspace summary includes project setup script storyboard asset audio caption rights approval readiness and blocked action centre", "Denied cockpit execution paths remain blocked", "Cockpit interactive video workspace summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
