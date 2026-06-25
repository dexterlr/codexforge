param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1658 Trading Mandate Boundary" `
  -ScriptFile "smoke-codexforge-trading-mandate-boundary.ps1" `
  -Domain "src\lib\codexforge\trading-mandate-boundary" `
  -Route "src\app\trading-mandate-boundary" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Trading Mandate Boundary" `
  -RouteHref "/trading-mandate-boundary" `
  -Markers @("Trading mandate boundary", "Trading mandate boundary does not connect brokers place trades fetch live market data provide financial advice or enable automation from the UI", "Trading mandate boundary requires explicit operator approval before any future trading workflow", "Trading mandate boundary prepares backend-owned mandate and risk-governor workflows without frontend trading execution", "Denied trading mandate boundary paths remain blocked", "Trading mandate boundary checklist")
