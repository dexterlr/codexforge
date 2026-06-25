param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1661 Protected Profit Bucket Preview" `
  -ScriptFile "smoke-codexforge-protected-profit-bucket-preview.ps1" `
  -Domain "src\lib\codexforge\protected-profit-bucket-preview" `
  -Route "src\app\protected-profit-bucket-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Protected Profit Bucket Preview" `
  -RouteHref "/protected-profit-bucket-preview" `
  -Markers @("Protected profit bucket preview", "Protected profit bucket preview does not move money or guarantee profit", "Protected profit bucket preview requires explicit operator approval", "Protected profit bucket preview shows realised-profit-only protection protected profit bucket lock percentage release conditions and losing-trade handling", "Denied protected profit bucket paths remain blocked", "Protected profit bucket checklist")
