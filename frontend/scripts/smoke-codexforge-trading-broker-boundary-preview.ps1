param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1653 Trading Broker Boundary Preview" `
  -ScriptFile "smoke-codexforge-trading-broker-boundary-preview.ps1" `
  -Domain "src\lib\codexforge\trading-broker-boundary-preview" `
  -Route "src\app\trading-broker-boundary-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Broker Boundary Preview" `
  -RouteHref "/trading-broker-boundary-preview" `
  -Markers @("Trading broker boundary preview", "Trading broker boundary preview does not connect brokers read accounts submit orders or store credentials from the UI", "Trading broker boundary preview requires explicit operator approval", "Trading broker boundary preview shows future backend-owned broker approval account boundary credential boundary order preview risk gate audit gate kill switch and denied broker paths", "Denied trading broker boundary paths remain blocked", "Trading broker boundary checklist")
