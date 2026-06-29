param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1696 Backtest Metric Definition Preview" `
  -ScriptFile "smoke-codexforge-backtest-metric-definition-preview.ps1" `
  -Domain "src\lib\codexforge\backtest-metric-definition-preview" `
  -Route "src\app\backtest-metric-definition-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Backtest Metric Definition Preview" `
  -RouteHref "/backtest-metric-definition-preview" `
  -Markers @("Backtest metric definition preview", "Backtest metric definition preview does not compute live metrics or claim profitability", "Backtest metric definition preview requires explicit operator approval", "Backtest metric definition preview shows return drawdown win rate loss rate expectancy volatility Sharpe caveat trade count and no guaranteed profit claim", "Denied backtest metric paths remain blocked", "Backtest metric definition checklist")
