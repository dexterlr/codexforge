param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1996 Review Decision Checklist Preview"
  ScriptFile = "smoke-codexforge-review-decision-checklist-preview.ps1"
  Domain = "src\lib\codexforge\review-decision-checklist-preview"
  Route = "src\app\review-decision-checklist-preview"
  CommandLabel = "Go to Review Decision Checklist Preview"
  RouteHref = "/review-decision-checklist-preview"
  Markers = @("Review decision checklist preview", "Review decision checklist preview does not persist approvals persist revisions release locks create jobs or allow export from the UI", "Review decision checklist preview requires backend-owned approval capture and explicit operator approval", "Denied review decision paths remain blocked", "Review decision checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-review-and-export-boundary-smoke-helper.ps1") @params

