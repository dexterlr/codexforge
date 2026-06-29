param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1690 Backtest Paper Trading Boundary" `
  -ScriptFile "smoke-codexforge-backtest-paper-trading-boundary.ps1" `
  -Domain "src\lib\codexforge\backtest-paper-trading-boundary" `
  -Route "src\app\backtest-paper-trading-boundary" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Backtest Paper Trading Boundary" `
  -RouteHref "/backtest-paper-trading-boundary" `
  -Markers @("Backtest paper trading boundary", "Backtest paper trading boundary does not run backtests place paper trades connect brokers fetch live market data provide financial advice or enable automation from the UI", "Backtest paper trading boundary requires explicit operator approval before any future backtest or paper trading workflow", "Backtest paper trading boundary prepares backend-owned backtest and paper trading workflows without frontend trading execution", "Denied backtest paper trading paths remain blocked", "Backtest paper trading boundary checklist")
