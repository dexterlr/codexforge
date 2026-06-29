param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1709 Reinvestable Profit Bucket Rules Preview" `
  -ScriptFile "smoke-codexforge-reinvestable-profit-bucket-rules-preview.ps1" `
  -Domain "src\lib\codexforge\reinvestable-profit-bucket-rules-preview" `
  -Route "src\app\reinvestable-profit-bucket-rules-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Reinvestable Profit Bucket Rules Preview" `
  -RouteHref "/reinvestable-profit-bucket-rules-preview" `
  -Markers @("Reinvestable profit bucket rules preview", "Reinvestable profit bucket rules preview does not reinvest money place trades or connect brokers", "Reinvestable profit bucket rules preview requires explicit operator approval", "Reinvestable profit bucket rules preview shows reinvestable profit bucket realised profit split reinvestable percent protected percent ceiling rule and approval gate", "Denied reinvestable profit bucket paths remain blocked", "Reinvestable profit bucket rules checklist")
