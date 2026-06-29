param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1714 Active Capital Update Preview" `
  -ScriptFile "smoke-codexforge-active-capital-update-preview.ps1" `
  -Domain "src\lib\codexforge\active-capital-update-preview" `
  -Route "src\app\active-capital-update-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Active Capital Update Preview" `
  -RouteHref "/active-capital-update-preview" `
  -Markers @("Active capital update preview", "Active capital update preview does not read broker balances persist ledger state or move funds from the UI", "Active capital update preview requires explicit operator approval", "Active capital update preview shows active capital before active capital after realised profit realised loss protected profit reinvestable profit and manual ledger review", "Denied active capital update paths remain blocked", "Active capital update checklist")
