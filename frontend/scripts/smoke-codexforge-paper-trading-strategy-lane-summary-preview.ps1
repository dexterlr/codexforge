param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1903 Paper Trading Strategy Lane Summary Preview"
  ScriptFile = "smoke-codexforge-paper-trading-strategy-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-strategy-lane-summary-preview"
  Route = "src\app\paper-trading-strategy-lane-summary-preview"
  CommandLabel = "Go to Paper Trading Strategy Lane Summary Preview"
  RouteHref = "/paper-trading-strategy-lane-summary-preview"
  Markers = @("Paper trading strategy lane summary preview", "Paper trading strategy lane summary preview does not auto create change requests mutate strategies write files approve revisions or promote versions from the UI", "Paper trading strategy lane summary preview requires backend-owned strategy workflow", "Paper trading strategy lane summary preview shows simulated strategy lab simulated review loop simulated change control simulated version registry simulated promotion gate and denied frontend mutation", "Denied paper trading strategy lane summary paths remain blocked", "Paper trading strategy lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

