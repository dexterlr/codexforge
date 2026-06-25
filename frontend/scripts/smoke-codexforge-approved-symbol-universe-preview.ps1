param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1667 Approved Symbol Universe Preview" `
  -ScriptFile "smoke-codexforge-approved-symbol-universe-preview.ps1" `
  -Domain "src\lib\codexforge\approved-symbol-universe-preview" `
  -Route "src\app\approved-symbol-universe-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Approved Symbol Universe Preview" `
  -RouteHref "/approved-symbol-universe-preview" `
  -Markers @("Approved symbol universe preview", "Approved symbol universe preview does not fetch live quotes or provide buy sell instructions", "Approved symbol universe preview requires explicit operator approval", "Approved symbol universe preview shows approved symbols watch-only symbols blocked symbols thesis requirement risk notes and no personalised recommendation", "Denied approved symbol universe paths remain blocked", "Approved symbol universe checklist")
