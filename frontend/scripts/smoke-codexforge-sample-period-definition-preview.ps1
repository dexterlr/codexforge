param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1695 Sample Period Definition Preview" `
  -ScriptFile "smoke-codexforge-sample-period-definition-preview.ps1" `
  -Domain "src\lib\codexforge\sample-period-definition-preview" `
  -Route "src\app\sample-period-definition-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Sample Period Definition Preview" `
  -RouteHref "/sample-period-definition-preview" `
  -Markers @("Sample period definition preview", "Sample period definition preview does not run sample analysis or fetch historical data from the UI", "Sample period definition preview requires explicit operator approval", "Sample period definition preview shows in-sample window out-of-sample window warmup window market regimes volatility regimes and validation split notes", "Denied sample period paths remain blocked", "Sample period definition checklist")
