param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1650 Trading Paper Trade Readiness Preview" `
  -ScriptFile "smoke-codexforge-trading-paper-trade-readiness-preview.ps1" `
  -Domain "src\lib\codexforge\trading-paper-trade-readiness-preview" `
  -Route "src\app\trading-paper-trade-readiness-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Paper Trade Readiness Preview" `
  -RouteHref "/trading-paper-trade-readiness-preview" `
  -Markers @("Trading paper trade readiness preview", "Trading paper trade readiness preview does not place paper trades from the UI", "Trading paper trade readiness preview requires explicit operator approval", "Trading paper trade readiness preview shows paper account boundary fake capital trade journal evidence metrics operator review and no live order placement", "Denied trading paper trade paths remain blocked", "Trading paper trade readiness checklist")
