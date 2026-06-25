param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1662 Reinvestable Profit Rules Preview" `
  -ScriptFile "smoke-codexforge-reinvestable-profit-rules-preview.ps1" `
  -Domain "src\lib\codexforge\reinvestable-profit-rules-preview" `
  -Route "src\app\reinvestable-profit-rules-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Reinvestable Profit Rules Preview" `
  -RouteHref "/reinvestable-profit-rules-preview" `
  -Markers @("Reinvestable profit rules preview", "Reinvestable profit rules preview does not reinvest money or execute trades", "Reinvestable profit rules preview requires explicit operator approval", "Reinvestable profit rules preview shows realised profit split reinvestable percent protected percent reinvestment ceiling and operator approval gates", "Denied reinvestable profit paths remain blocked", "Reinvestable profit rules checklist")
