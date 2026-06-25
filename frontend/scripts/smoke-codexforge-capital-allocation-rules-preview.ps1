param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1659 Capital Allocation Rules Preview" `
  -ScriptFile "smoke-codexforge-capital-allocation-rules-preview.ps1" `
  -Domain "src\lib\codexforge\capital-allocation-rules-preview" `
  -Route "src\app\capital-allocation-rules-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Capital Allocation Rules Preview" `
  -RouteHref "/capital-allocation-rules-preview" `
  -Markers @("Capital allocation rules preview", "Capital allocation rules preview does not move money connect brokers or enable trading", "Capital allocation rules preview requires explicit operator approval", "Capital allocation rules preview shows allocated capital active capital protected profit reinvestable profit loss limits and approval gates as review-only rules", "Denied capital allocation paths remain blocked", "Capital allocation rules checklist")
