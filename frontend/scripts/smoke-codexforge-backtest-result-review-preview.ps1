param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1698 Backtest Result Review Preview" `
  -ScriptFile "smoke-codexforge-backtest-result-review-preview.ps1" `
  -Domain "src\lib\codexforge\backtest-result-review-preview" `
  -Route "src\app\backtest-result-review-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Backtest Result Review Preview" `
  -RouteHref "/backtest-result-review-preview" `
  -Markers @("Backtest result review preview", "Backtest result review preview does not persist results audit evidence or trading decisions from the UI", "Backtest result review preview requires backend-owned capture", "Backtest result review preview shows result summary metric caveats drawdown review sample caveats overfit warning evidence links and manual acceptance boundary", "Denied backtest result review paths remain blocked", "Backtest result review checklist")
