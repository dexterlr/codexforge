param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backtest-paper-trading-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1694 Survivorship Bias Check Preview" `
  -ScriptFile "smoke-codexforge-survivorship-bias-check-preview.ps1" `
  -Domain "src\lib\codexforge\survivorship-bias-check-preview" `
  -Route "src\app\survivorship-bias-check-preview" `
  -MainPanel "BacktestPaperTradingEngineRoutePanel" `
  -CommandLabel "Go to Survivorship Bias Check Preview" `
  -RouteHref "/survivorship-bias-check-preview" `
  -Markers @("Survivorship bias check preview", "Survivorship bias check preview does not fetch delisted symbols or external datasets from the UI", "Survivorship bias check preview requires explicit operator approval", "Survivorship bias check preview shows universe history delisted assets symbol changes corporate actions lookahead risk and data provider requirement", "Denied survivorship bias paths remain blocked", "Survivorship bias check checklist")
