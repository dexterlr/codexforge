param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1939 Review Comments Lane Preview"
  ScriptFile = "smoke-codexforge-review-comments-lane-preview.ps1"
  Domain = "src\lib\codexforge\review-comments-lane-preview"
  Route = "src\app\review-comments-lane-preview"
  CommandLabel = "Go to Review Comments Lane Preview"
  RouteHref = "/review-comments-lane-preview"
  Markers = @("Review comments lane preview", "Review comments lane preview does not persist comments approve scripts store approvals or dispatch workers from the UI", "Review comments lane preview requires backend-owned review and approval capture", "Review comments lane preview shows simulated operator note simulated brand note simulated rights note simulated script note simulated explicit approval requirement", "Denied review comments lane paths remain blocked", "Review comments lane checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

