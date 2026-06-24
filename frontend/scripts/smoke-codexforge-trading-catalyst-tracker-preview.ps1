param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1646 Trading Catalyst Tracker Preview" `
  -ScriptFile "smoke-codexforge-trading-catalyst-tracker-preview.ps1" `
  -Domain "src\lib\codexforge\trading-catalyst-tracker-preview" `
  -Route "src\app\trading-catalyst-tracker-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Catalyst Tracker Preview" `
  -RouteHref "/trading-catalyst-tracker-preview" `
  -Markers @("Trading catalyst tracker preview", "Trading catalyst tracker preview does not fetch news earnings filings or live market data from the UI", "Trading catalyst tracker preview requires explicit operator approval", "Trading catalyst tracker preview shows planned catalyst categories earnings macro news product technical regulatory liquidity sentiment and evidence requirements", "Denied trading catalyst paths remain blocked", "Trading catalyst tracker checklist")
