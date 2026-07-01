param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1872 Review Dashboard To Change Control Trace Preview"
  ScriptFile = "smoke-codexforge-review-dashboard-to-change-control-trace-preview.ps1"
  Domain = "src\lib\codexforge\review-dashboard-to-change-control-trace-preview"
  Route = "src\app\review-dashboard-to-change-control-trace-preview"
  CommandLabel = "Go to Review Dashboard To Change Control Trace Preview"
  RouteHref = "/review-dashboard-to-change-control-trace-preview"
  Markers = @("Review dashboard to change control trace preview", "Review dashboard to change control trace preview does not auto create change requests mutate strategy rules write files or approve revisions from the UI", "Review dashboard to change control trace preview requires backend-owned change workflow", "Review dashboard to change control trace preview shows simulated review finding simulated change request link simulated rationale note simulated operator question simulated denied frontend mutation", "Denied review dashboard to change control trace paths remain blocked", "Review dashboard to change control trace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
