param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1644 Trading Watchlist Preview" `
  -ScriptFile "smoke-codexforge-trading-watchlist-preview.ps1" `
  -Domain "src\lib\codexforge\trading-watchlist-preview" `
  -Route "src\app\trading-watchlist-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Watchlist Preview" `
  -RouteHref "/trading-watchlist-preview" `
  -Markers @("Trading watchlist preview", "Trading watchlist preview does not fetch live quotes or market data from the UI", "Trading watchlist preview requires explicit operator approval", "Trading watchlist preview shows review-only symbols themes sectors catalysts risk notes evidence needs and no personalised buy sell instruction", "Denied trading watchlist paths remain blocked", "Trading watchlist checklist")
