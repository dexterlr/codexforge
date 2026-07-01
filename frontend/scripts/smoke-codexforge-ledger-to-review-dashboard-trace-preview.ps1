param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1871 Ledger To Review Dashboard Trace Preview"
  ScriptFile = "smoke-codexforge-ledger-to-review-dashboard-trace-preview.ps1"
  Domain = "src\lib\codexforge\ledger-to-review-dashboard-trace-preview"
  Route = "src\app\ledger-to-review-dashboard-trace-preview"
  CommandLabel = "Go to Ledger To Review Dashboard Trace Preview"
  RouteHref = "/ledger-to-review-dashboard-trace-preview"
  Markers = @("Ledger to review dashboard trace preview", "Ledger to review dashboard trace preview does not calculate real P&L fetch live market data persist dashboard state or recommend trades from the UI", "Ledger to review dashboard trace preview requires deterministic synthetic ledger summaries only", "Ledger to review dashboard trace preview shows simulated ledger batch simulated dashboard snapshot simulated review status simulated evidence gap simulated no performance guarantee", "Denied ledger to review dashboard trace paths remain blocked", "Ledger to review dashboard trace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
