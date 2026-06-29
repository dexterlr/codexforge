param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1704 First Backtest Paper Trading Candidate" `
  -ScriptFile "smoke-codexforge-first-backtest-paper-trading-candidate.ps1" `
  -Domain "src\lib\codexforge\first-backtest-paper-trading-candidate" `
  -Route "src\app\first-backtest-paper-trading-candidate" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to First Backtest Paper Trading Candidate" `
  -RouteHref "/first-backtest-paper-trading-candidate" `
  -Markers @("First backtest paper trading candidate", "First backtest paper trading candidate does not enable backtest execution paper trading live trading or broker workflows from the UI", "First backtest paper trading candidate requires explicit operator approval", "Candidate combines dataset requirement historical data quality fees slippage survivorship bias sample period metrics run packet result review paper account journal metrics evidence cockpit summary and denied backtest paper paths", "Denied first backtest paper trading paths remain blocked", "First backtest paper trading checklist")
