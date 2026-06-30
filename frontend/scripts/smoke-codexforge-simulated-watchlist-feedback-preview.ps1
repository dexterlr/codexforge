param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-performance-review-loop-smoke-helper.ps1") `
  -SmokeName "Phase 1811 Simulated Watchlist Feedback Preview" `
  -ScriptFile "smoke-codexforge-simulated-watchlist-feedback-preview.ps1" `
  -Domain "src\lib\codexforge\simulated-watchlist-feedback-preview" `
  -Route "src\app\simulated-watchlist-feedback-preview" `
  -CommandLabel "Go to Simulated Watchlist Feedback Preview" `
  -RouteHref "/simulated-watchlist-feedback-preview" `
  -Markers @("Simulated watchlist feedback preview", "Simulated watchlist feedback preview does not recommend symbols rank buys fetch live prices or personalise investment advice from the UI", "Simulated watchlist feedback preview requires deterministic synthetic watchlist notes only", "Simulated watchlist feedback preview shows simulated watchlist fit simulated catalyst note simulated liquidity note simulated risk note simulated exclude note and review-only status", "Denied simulated watchlist feedback paths remain blocked", "Simulated watchlist feedback checklist")
