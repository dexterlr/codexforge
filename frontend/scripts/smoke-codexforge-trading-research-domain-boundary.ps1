param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1642 Trading Research Domain Boundary" `
  -ScriptFile "smoke-codexforge-trading-research-domain-boundary.ps1" `
  -Domain "src\lib\codexforge\trading-research-domain-boundary" `
  -Route "src\app\trading-research-domain-boundary" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Research Domain Boundary" `
  -RouteHref "/trading-research-domain-boundary" `
  -Markers @("Trading research domain boundary", "Trading research domain boundary does not connect brokers place trades fetch live market data or provide financial advice from the UI", "Trading research domain requires explicit operator approval before any future trading workflow", "Trading research domain prepares backend-owned research workflows without frontend trading execution", "Denied trading research domain paths remain blocked", "Trading research domain checklist")
