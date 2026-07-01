param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1979 Render Prerequisite Checklist Preview"
  ScriptFile = "smoke-codexforge-render-prerequisite-checklist-preview.ps1"
  Domain = "src\lib\codexforge\render-prerequisite-checklist-preview"
  Route = "src\app\render-prerequisite-checklist-preview"
  CommandLabel = "Go to Render Prerequisite Checklist Preview"
  RouteHref = "/render-prerequisite-checklist-preview"
  Markers = @("Render prerequisite checklist preview", "Render prerequisite checklist preview does not create render jobs dispatch workers persist approvals or export files from the UI", "Render prerequisite checklist preview requires deterministic synthetic prerequisite rows only", "Render prerequisite checklist preview shows simulated script ready simulated storyboard ready simulated asset ready simulated caption ready simulated rights ready simulated backend render service required", "Denied render prerequisite checklist paths remain blocked", "Render prerequisite checklist checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

