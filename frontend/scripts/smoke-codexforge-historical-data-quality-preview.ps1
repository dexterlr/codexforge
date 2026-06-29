param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1692 Historical Data Quality Preview" `
  -ScriptFile "smoke-codexforge-historical-data-quality-preview.ps1" `
  -Domain "src\lib\codexforge\historical-data-quality-preview" `
  -Route "src\app\historical-data-quality-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Historical Data Quality Preview" `
  -RouteHref "/historical-data-quality-preview" `
  -Markers @("Historical data quality preview", "Historical data quality preview does not validate live feeds or call market data APIs from the UI", "Historical data quality preview requires explicit operator approval", "Historical data quality preview shows missing bars stale data outliers timezone alignment corporate action adjustment duplicate rows and backend-owned validation boundary", "Denied historical data quality paths remain blocked", "Historical data quality checklist")
