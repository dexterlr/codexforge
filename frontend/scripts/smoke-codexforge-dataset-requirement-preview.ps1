param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1691 Dataset Requirement Preview" `
  -ScriptFile "smoke-codexforge-dataset-requirement-preview.ps1" `
  -Domain "src\lib\codexforge\dataset-requirement-preview" `
  -Route "src\app\dataset-requirement-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Dataset Requirement Preview" `
  -RouteHref "/dataset-requirement-preview" `
  -Markers @("Dataset requirement preview", "Dataset requirement preview does not fetch live market data download datasets or run backtests from the UI", "Dataset requirement preview requires explicit operator approval", "Dataset requirement preview shows required symbols timeframe candles corporate actions splits dividends fees slippage and source approval needs", "Denied dataset requirement paths remain blocked", "Dataset requirement checklist")
