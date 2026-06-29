param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1701 Paper Trading Metrics Preview" `
  -ScriptFile "smoke-codexforge-paper-trading-metrics-preview.ps1" `
  -Domain "src\lib\codexforge\paper-trading-metrics-preview" `
  -Route "src\app\paper-trading-metrics-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Paper Trading Metrics Preview" `
  -RouteHref "/paper-trading-metrics-preview" `
  -Markers @("Paper trading metrics preview", "Paper trading metrics preview does not compute live paper metrics or access broker accounts", "Paper trading metrics preview requires explicit operator approval", "Paper trading metrics preview shows paper win rate paper loss rate expectancy drawdown adherence slippage notes strategy drift and evidence requirements", "Denied paper trading metrics paths remain blocked", "Paper trading metrics checklist")
