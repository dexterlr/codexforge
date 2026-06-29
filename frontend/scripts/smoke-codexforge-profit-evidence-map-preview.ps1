param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1717 Profit Evidence Map Preview" `
  -ScriptFile "smoke-codexforge-profit-evidence-map-preview.ps1" `
  -Domain "src\lib\codexforge\profit-evidence-map-preview" `
  -Route "src\app\profit-evidence-map-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Profit Evidence Map Preview" `
  -RouteHref "/profit-evidence-map-preview" `
  -Markers @("Profit evidence map preview", "Profit evidence map preview does not persist evidence results audit or profit decisions from the UI", "Profit evidence map preview requires backend-owned capture", "Profit evidence map preview shows trade result evidence realised profit evidence fees slippage evidence protected profit evidence reinvestment evidence approval evidence and audit continuity", "Denied profit evidence map paths remain blocked", "Profit evidence map checklist")
