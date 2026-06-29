param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1712 Reinvestment Ceiling Rule Preview" `
  -ScriptFile "smoke-codexforge-reinvestment-ceiling-rule-preview.ps1" `
  -Domain "src\lib\codexforge\reinvestment-ceiling-rule-preview" `
  -Route "src\app\reinvestment-ceiling-rule-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Reinvestment Ceiling Rule Preview" `
  -RouteHref "/reinvestment-ceiling-rule-preview" `
  -Markers @("Reinvestment ceiling rule preview", "Reinvestment ceiling rule preview does not execute reinvestment or increase risk limits from the UI", "Reinvestment ceiling rule preview requires explicit operator approval", "Reinvestment ceiling rule preview shows reinvestment ceiling active capital cap drawdown cap risk governor dependency approval gate and backend-owned enforcement boundary", "Denied reinvestment ceiling paths remain blocked", "Reinvestment ceiling rule checklist")
