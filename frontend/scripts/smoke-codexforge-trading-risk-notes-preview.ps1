param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1647 Trading Risk Notes Preview" `
  -ScriptFile "smoke-codexforge-trading-risk-notes-preview.ps1" `
  -Domain "src\lib\codexforge\trading-risk-notes-preview" `
  -Route "src\app\trading-risk-notes-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Risk Notes Preview" `
  -RouteHref "/trading-risk-notes-preview" `
  -Markers @("Trading risk notes preview", "Trading risk notes preview does not calculate live portfolio risk or access broker accounts", "Trading risk notes preview requires explicit operator approval", "Trading risk notes preview shows max daily loss max drawdown position risk liquidity risk volatility risk correlation risk event risk and invalidation notes", "Denied trading risk notes paths remain blocked", "Trading risk notes checklist")
