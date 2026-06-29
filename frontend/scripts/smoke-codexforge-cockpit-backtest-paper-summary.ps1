param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1703 Cockpit Backtest Paper Summary" `
  -ScriptFile "smoke-codexforge-cockpit-backtest-paper-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-backtest-paper-summary" `
  -Route "src\app\cockpit-backtest-paper-summary" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Cockpit Backtest Paper Summary" `
  -RouteHref "/cockpit-backtest-paper-summary" `
  -Markers @("Cockpit backtest paper summary", "Cockpit backtest paper summary keeps the cockpit as the normal user surface", "Cockpit backtest paper summary does not run backtests place paper trades connect brokers place live trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions automate trading or size orders from the cockpit", "Cockpit backtest paper summary shows dataset requirements data quality fees slippage survivorship bias sample period metrics backtest run packet result review paper account paper journal paper metrics paper evidence and audit", "Phase pages remain dev test diagnostics only", "Cockpit backtest paper checklist")
