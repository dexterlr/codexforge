param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1660 Active Capital Ledger Preview" `
  -ScriptFile "smoke-codexforge-active-capital-ledger-preview.ps1" `
  -Domain "src\lib\codexforge\active-capital-ledger-preview" `
  -Route "src\app\active-capital-ledger-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Active Capital Ledger Preview" `
  -RouteHref "/active-capital-ledger-preview" `
  -Markers @("Active capital ledger preview", "Active capital ledger preview does not read broker balances or persist ledger state from the UI", "Active capital ledger preview requires explicit operator approval", "Active capital ledger preview shows allocated capital realised profit realised loss protected profit reinvestable profit drawdown state and manual review notes", "Denied active capital ledger paths remain blocked", "Active capital ledger checklist")
