param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1705 Controlled Backtest Paper Trading Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-backtest-paper-trading-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-backtest-paper-trading-release-candidate" `
  -Route "src\app\controlled-backtest-paper-trading-release-candidate" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Controlled Backtest Paper Trading Release Candidate" `
  -RouteHref "/controlled-backtest-paper-trading-release-candidate" `
  -Markers @("Controlled backtest paper trading release candidate", "Controlled backtest paper trading release candidate does not run backtests place paper trades execute signals connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions automate trading size orders monitor live accounts move money dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled backtest paper trading release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned backtest and paper trading workflows without frontend trading execution", "Denied controlled backtest paper trading paths remain blocked", "Controlled backtest paper trading release checklist")
