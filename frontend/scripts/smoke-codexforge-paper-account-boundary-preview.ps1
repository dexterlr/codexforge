param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1699 Paper Account Boundary Preview" `
  -ScriptFile "smoke-codexforge-paper-account-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\paper-account-boundary-preview" `
  -Route "src\app\paper-account-boundary-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Paper Account Boundary Preview" `
  -RouteHref "/paper-account-boundary-preview" `
  -Markers @("Paper account boundary preview", "Paper account boundary preview does not create accounts connect brokers place paper trades or store credentials from the UI", "Paper account boundary preview requires explicit operator approval", "Paper account boundary preview shows fake capital account scope paper environment credential boundary order preview boundary risk gate audit gate and denied account paths", "Denied paper account paths remain blocked", "Paper account boundary checklist")
