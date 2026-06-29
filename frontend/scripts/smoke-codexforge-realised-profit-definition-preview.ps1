param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1707 Realised Profit Definition Preview" `
  -ScriptFile "smoke-codexforge-realised-profit-definition-preview.ps1" `
  -Domain "src\lib\codexforge\realised-profit-definition-preview" `
  -Route "src\app\realised-profit-definition-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Realised Profit Definition Preview" `
  -RouteHref "/realised-profit-definition-preview" `
  -Markers @("Realised profit definition preview", "Realised profit definition preview does not read broker statements calculate live P&L or guarantee profit", "Realised profit definition preview requires explicit operator approval", "Realised profit definition preview shows closed trade profit realised profit only losing trades have no profit to lock fees slippage taxes caveat and manual confirmation needs", "Denied realised profit paths remain blocked", "Realised profit definition checklist")
