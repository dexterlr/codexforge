param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1787 Simulated Performance Summary Preview" `
  -ScriptFile "smoke-codexforge-simulated-performance-summary-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-performance-summary-preview" `
  -Route "src\app\simulated-performance-summary-preview" `
  -CommandLabel "Go to Simulated Performance Summary Preview" `
  -RouteHref "/simulated-performance-summary-preview" `
  -Markers @("Simulated performance summary preview", "Simulated performance summary preview does not calculate real P&L read real accounts fetch live market data or guarantee performance from the UI", "Simulated performance summary preview requires deterministic synthetic performance fixtures only", "Simulated performance summary preview shows simulated net result simulated win rate simulated average result simulated drawdown placeholder simulated exposure and no performance guarantee", "Denied simulated performance summary paths remain blocked", "Simulated performance summary checklist")
