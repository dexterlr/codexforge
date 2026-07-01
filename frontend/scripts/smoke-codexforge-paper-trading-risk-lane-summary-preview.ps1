param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1904 Paper Trading Risk Lane Summary Preview"
  ScriptFile = "smoke-codexforge-paper-trading-risk-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-risk-lane-summary-preview"
  Route = "src\app\paper-trading-risk-lane-summary-preview"
  CommandLabel = "Go to Paper Trading Risk Lane Summary Preview"
  RouteHref = "/paper-trading-risk-lane-summary-preview"
  Markers = @("Paper trading risk lane summary preview", "Paper trading risk lane summary preview does not override risk governor decisions approve execution mutate capital or place trades from the UI", "Paper trading risk lane summary preview requires backend-owned risk governor workflow", "Paper trading risk lane summary preview shows simulated mandate risk simulated strategy risk simulated paper review risk simulated promotion risk simulated kill switch requirement and operator review note", "Denied paper trading risk lane summary paths remain blocked", "Paper trading risk lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

