param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1708 Protected Profit Bucket Rules Preview" `
  -ScriptFile "smoke-codexforge-protected-profit-bucket-rules-preview.ps1" `
  -Domain "src\lib\codexforge\protected-profit-bucket-rules-preview" `
  -Route "src\app\protected-profit-bucket-rules-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Protected Profit Bucket Rules Preview" `
  -RouteHref "/protected-profit-bucket-rules-preview" `
  -Markers @("Protected profit bucket rules preview", "Protected profit bucket rules preview does not move money withdraw funds or store account credentials", "Protected profit bucket rules preview requires explicit operator approval", "Protected profit bucket rules preview shows protected profit bucket realised-profit-only lock rule lock percentage release condition audit need and backend-owned money boundary", "Denied protected profit bucket rules paths remain blocked", "Protected profit bucket rules checklist")
