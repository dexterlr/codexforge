param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1665 Position Risk Guard Preview" `
  -ScriptFile "smoke-codexforge-position-risk-guard-preview.ps1" `
  -Domain "src\lib\codexforge\position-risk-guard-preview" `
  -Route "src\app\position-risk-guard-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Position Risk Guard Preview" `
  -RouteHref "/position-risk-guard-preview" `
  -Markers @("Position risk guard preview", "Position risk guard preview does not size orders or submit trades", "Position risk guard preview requires explicit operator approval", "Position risk guard preview shows max position risk percent stop distance assumption exposure cap liquidity warning and no executable order state", "Denied position risk paths remain blocked", "Position risk guard checklist")
