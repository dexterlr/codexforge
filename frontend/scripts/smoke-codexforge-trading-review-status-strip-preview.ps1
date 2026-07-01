param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1886 Trading Review Status Strip Preview"
  ScriptFile = "smoke-codexforge-trading-review-status-strip-preview.ps1"
  Domain = "src\lib\codexforge\trading-review-status-strip-preview"
  Route = "src\app\trading-review-status-strip-preview"
  CommandLabel = "Go to Trading Review Status Strip Preview"
  RouteHref = "/trading-review-status-strip-preview"
  Markers = @("Trading review status strip preview", "Trading review status strip preview does not calculate real P&L fetch live market data persist status or trigger execution from the UI", "Trading review status strip preview requires deterministic synthetic status chips only", "Trading review status strip preview shows simulated research status simulated risk status simulated evidence status simulated version status simulated execution blocked status and no performance guarantee", "Denied trading review status strip paths remain blocked", "Trading review status strip checklist")
}
& (Join-Path $PSScriptRoot "codexforge-cockpit-trading-workflow-polish-smoke-helper.ps1") @params
