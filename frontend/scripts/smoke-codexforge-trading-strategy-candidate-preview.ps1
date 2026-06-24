param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1648 Trading Strategy Candidate Preview" `
  -ScriptFile "smoke-codexforge-trading-strategy-candidate-preview.ps1" `
  -Domain "src\lib\codexforge\trading-strategy-candidate-preview" `
  -Route "src\app\trading-strategy-candidate-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Strategy Candidate Preview" `
  -RouteHref "/trading-strategy-candidate-preview" `
  -Markers @("Trading strategy candidate preview", "Trading strategy candidate preview does not execute signals or place orders", "Trading strategy candidate preview requires explicit operator approval", "Trading strategy candidate preview shows strategy idea entry logic exit logic risk controls required data backtest needs paper-trade needs and no executable signal state", "Denied trading strategy candidate paths remain blocked", "Trading strategy candidate checklist")
