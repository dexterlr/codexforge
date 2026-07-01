param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1901 Paper Trading Review Lane Summary Preview"
  ScriptFile = "smoke-codexforge-paper-trading-review-lane-summary-preview.ps1"
  Domain = "src\lib\codexforge\paper-trading-review-lane-summary-preview"
  Route = "src\app\paper-trading-review-lane-summary-preview"
  CommandLabel = "Go to Paper Trading Review Lane Summary Preview"
  RouteHref = "/paper-trading-review-lane-summary-preview"
  Markers = @("Paper trading review lane summary preview", "Paper trading review lane summary preview does not approve strategies execute paper trades route orders or persist review state from the UI", "Paper trading review lane summary preview requires backend-owned review workflow", "Paper trading review lane summary preview shows simulated research review simulated strategy review simulated result review simulated change review simulated operator review and denied frontend persistence", "Denied paper trading review lane summary paths remain blocked", "Paper trading review lane summary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-paper-trading-workspace-smoke-helper.ps1") @params

