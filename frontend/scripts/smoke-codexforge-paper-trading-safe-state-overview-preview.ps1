param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1900 Paper Trading Safe State Overview Preview"
  ScriptFile = "smoke-codexforge-paper-trading-safe-state-overview-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-safe-state-overview-preview"
  Route = "src\app\paper-trading-safe-state-overview-preview"
  CommandLabel = "Go to Paper Trading Safe State Overview Preview"
  RouteHref = "/paper-trading-safe-state-overview-preview"
  Markers = @("Paper trading safe state overview preview", "Paper trading safe state overview preview does not calculate real P&L fetch live market data persist status or trigger execution from the UI", "Paper trading safe state overview preview requires deterministic synthetic safe state only", "Paper trading safe state overview preview shows simulated review-only status simulated synthetic data status simulated no execution status simulated no live transition status simulated backend required status and no performance guarantee", "Denied paper trading safe state overview paths remain blocked", "Paper trading safe state overview checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

