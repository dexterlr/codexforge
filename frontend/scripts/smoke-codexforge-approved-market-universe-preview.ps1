param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1666 Approved Market Universe Preview" `
  -ScriptFile "smoke-codexforge-approved-market-universe-preview.ps1" `
  -Domain "src\lib\codexforge\approved-market-universe-preview" `
  -Route "src\app\approved-market-universe-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Approved Market Universe Preview" `
  -RouteHref "/approved-market-universe-preview" `
  -Markers @("Approved market universe preview", "Approved market universe preview does not fetch market data or enable market access", "Approved market universe preview requires explicit operator approval", "Approved market universe preview shows approved markets blocked markets session notes liquidity notes risk class and broker-boundary prerequisite", "Denied approved market universe paths remain blocked", "Approved market universe checklist")
