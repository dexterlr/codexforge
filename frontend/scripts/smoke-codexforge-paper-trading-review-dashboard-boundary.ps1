param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-paper-trading-review-dashboard-smoke-helper.ps1") `
  -SmokeName "Phase 1786 Paper Trading Review Dashboard Boundary" `
  -ScriptFile "smoke-codexforge-paper-trading-review-dashboard-boundary.ps1" `
  -Domain "src\lib\codexforge\paper-trading-review-dashboard-boundary" `
  -Route "src\app\paper-trading-review-dashboard-boundary" `
  -CommandLabel "Go to Paper Trading Review Dashboard Boundary" `
  -RouteHref "/paper-trading-review-dashboard-boundary" `
  -Markers @("Paper trading review dashboard boundary", "Paper trading review dashboard boundary does not connect brokers read accounts place orders dispatch orders execute paper trades move money fetch live market data calculate real P&L provide financial advice or guarantee performance from the UI", "Paper trading review dashboard boundary requires explicit operator approval", "Paper trading review dashboard boundary prepares deterministic synthetic dashboard workflows without frontend execution or frontend persistence", "Denied paper trading review dashboard paths remain blocked", "Paper trading review dashboard boundary checklist")
