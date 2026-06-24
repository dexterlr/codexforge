param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1651 Trading Profit Lockbox Preview" `
  -ScriptFile "smoke-codexforge-trading-profit-lockbox-preview.ps1" `
  -Domain "src\lib\codexforge\trading-profit-lockbox-preview" `
  -Route "src\app\trading-profit-lockbox-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Profit Lockbox Preview" `
  -RouteHref "/trading-profit-lockbox-preview" `
  -Markers @("Trading profit lockbox preview", "Trading profit lockbox preview does not move money connect brokers or guarantee profits", "Trading profit lockbox preview requires explicit operator approval", "Trading profit lockbox preview shows realised-profit-only protection protected profit reinvestable profit configurable lock percent losing trades reduce active capital and no guaranteed return", "Denied trading profit lockbox paths remain blocked", "Trading profit lockbox checklist")
