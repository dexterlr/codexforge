param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1649 Trading Backtest Readiness Preview" `
  -ScriptFile "smoke-codexforge-trading-backtest-readiness-preview.ps1" `
  -Domain "src\lib\codexforge\trading-backtest-readiness-preview" `
  -Route "src\app\trading-backtest-readiness-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Backtest Readiness Preview" `
  -RouteHref "/trading-backtest-readiness-preview" `
  -Markers @("Trading backtest readiness preview", "Trading backtest readiness preview does not run backtests from the UI", "Trading backtest readiness preview requires explicit operator approval", "Trading backtest readiness preview shows dataset needs assumptions fees slippage survivorship bias sample period metrics edge cases and backend-owned backtest boundary", "Denied trading backtest readiness paths remain blocked", "Trading backtest readiness checklist")
