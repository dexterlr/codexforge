param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1697 Backtest Run Packet Preview" `
  -ScriptFile "smoke-codexforge-backtest-run-packet-preview.ps1" `
  -Domain "src\lib\codexforge\backtest-run-packet-preview" `
  -Route "src\app\backtest-run-packet-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Backtest Run Packet Preview" `
  -RouteHref "/backtest-run-packet-preview" `
  -Markers @("Backtest run packet preview", "Backtest run packet preview does not run backtests execute signals or write result files from the UI", "Backtest run packet preview requires explicit operator approval", "Backtest run packet preview shows strategy reference dataset reference sample period fees slippage risk settings metrics requested evidence needs and backend-owned run boundary", "Denied backtest run packet paths remain blocked", "Backtest run packet checklist")
