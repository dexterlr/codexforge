param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1700 Paper Trade Journal Preview" `
  -ScriptFile "smoke-codexforge-paper-trade-journal-preview.ps1" `
  -Domain "src\lib\codexforge\paper-trade-journal-preview" `
  -Route "src\app\paper-trade-journal-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Paper Trade Journal Preview" `
  -RouteHref "/paper-trade-journal-preview" `
  -Markers @("Paper trade journal preview", "Paper trade journal preview does not place paper trades persist journal entries or execute signals from the UI", "Paper trade journal preview requires explicit operator approval", "Paper trade journal preview shows trade thesis planned entry planned exit stop concept target concept result placeholder emotion note evidence needs and manual review", "Denied paper trade journal paths remain blocked", "Paper trade journal checklist")
