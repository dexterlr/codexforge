param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1669 Trade Thesis Requirement Preview" `
  -ScriptFile "smoke-codexforge-trade-thesis-requirement-preview.ps1" `
  -Domain "src\lib\codexforge\trade-thesis-requirement-preview" `
  -Route "src\app\trade-thesis-requirement-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Trade Thesis Requirement Preview" `
  -RouteHref "/trade-thesis-requirement-preview" `
  -Markers @("Trade thesis requirement preview", "Trade thesis requirement preview does not create buy sell instructions or executable signals", "Trade thesis requirement preview requires explicit operator approval", "Trade thesis requirement preview shows thesis counter-thesis catalyst invalidation risk reward evidence timeframe and manual approval requirement", "Denied trade thesis paths remain blocked", "Trade thesis requirement checklist")
