param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1905 Paper Trading Promotion Lane Summary Preview"
  ScriptFile = "smoke-codexforge-paper-trading-promotion-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-promotion-lane-summary-preview"
  Route = "src\app\paper-trading-promotion-lane-summary-preview"
  CommandLabel = "Go to Paper Trading Promotion Lane Summary Preview"
  RouteHref = "/paper-trading-promotion-lane-summary-preview"
  Markers = @("Paper trading promotion lane summary preview", "Paper trading promotion lane summary preview does not auto promote versions approve strategies place paper orders or create execution routes from the UI", "Paper trading promotion lane summary preview requires backend-owned promotion workflow", "Paper trading promotion lane summary preview shows simulated evidence gate simulated risk gate simulated version gate simulated approval gate simulated execution blocked state and denied auto promotion", "Denied paper trading promotion lane summary paths remain blocked", "Paper trading promotion lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

