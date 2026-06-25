param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1663 Max Daily Loss Guard Preview" `
  -ScriptFile "smoke-codexforge-max-daily-loss-guard-preview.ps1" `
  -Domain "src\lib\codexforge\max-daily-loss-guard-preview" `
  -Route "src\app\max-daily-loss-guard-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Max Daily Loss Guard Preview" `
  -RouteHref "/max-daily-loss-guard-preview" `
  -Markers @("Max daily loss guard preview", "Max daily loss guard preview does not monitor live accounts or stop trades from the UI", "Max daily loss guard preview requires explicit operator approval", "Max daily loss guard preview shows daily loss threshold breach state stop condition reset rule manual override boundary and backend-owned enforcement requirement", "Denied max daily loss paths remain blocked", "Max daily loss guard checklist")
