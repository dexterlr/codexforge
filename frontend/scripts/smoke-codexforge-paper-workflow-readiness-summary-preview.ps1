param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1889 Paper Workflow Readiness Summary Preview"
  ScriptFile = "smoke-codexforge-paper-workflow-readiness-summary-preview.ps1"
  Domain = "src\lib\codexforge\paper-workflow-readiness-summary-preview"
  Route = "src\app\paper-workflow-readiness-summary-preview"
  CommandLabel = "Go to Paper Workflow Readiness Summary Preview"
  RouteHref = "/paper-workflow-readiness-summary-preview"
  Markers = @("Paper workflow readiness summary preview", "Paper workflow readiness summary preview does not execute paper trades place orders call brokers or enable live trading from the UI", "Paper workflow readiness summary preview requires backend-owned paper workflow", "Paper workflow readiness summary preview shows simulated research readiness simulated mandate readiness simulated risk readiness simulated version readiness simulated promotion readiness simulated execution bridge blocked", "Denied paper workflow readiness summary paths remain blocked", "Paper workflow readiness summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
