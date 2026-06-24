param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1645 Trading Thesis Builder Preview" `
  -ScriptFile "smoke-codexforge-trading-thesis-builder-preview.ps1" `
  -Domain "src\lib\codexforge\trading-thesis-builder-preview" `
  -Route "src\app\trading-thesis-builder-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Thesis Builder Preview" `
  -RouteHref "/trading-thesis-builder-preview" `
  -Markers @("Trading thesis builder preview", "Trading thesis builder preview does not provide financial advice or buy sell instructions", "Trading thesis builder preview requires explicit operator approval", "Trading thesis builder preview shows thesis hypothesis counter-thesis catalyst evidence risk invalidation timeframe and review-only confidence notes", "Denied trading thesis paths remain blocked", "Trading thesis builder checklist")
