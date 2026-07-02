param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2005 Schedule Blocked Preview"
  ScriptFile = "smoke-codexforge-schedule-blocked-preview.ps1"
  Domain = "src\lib\codexforge\schedule-blocked-preview"
  Route = "src\app\schedule-blocked-preview"
  CommandLabel = "Go to Schedule Blocked Preview"
  RouteHref = "/schedule-blocked-preview"
  Markers = @("Schedule blocked preview", "Schedule blocked preview does not schedule content create background jobs create reminders create automations call connectors or persist jobs from the UI", "Schedule blocked preview requires backend-owned scheduling workflow and explicit operator approval", "Denied schedule paths remain blocked", "Schedule blocked checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

