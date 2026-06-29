param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1716 Reinvestment Approval Gate Preview" `
  -ScriptFile "smoke-codexforge-reinvestment-approval-gate-preview.ps1" `
  -Domain "src\lib\codexforge\reinvestment-approval-gate-preview" `
  -Route "src\app\reinvestment-approval-gate-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Reinvestment Approval Gate Preview" `
  -RouteHref "/reinvestment-approval-gate-preview" `
  -Markers @("Reinvestment approval gate preview", "Reinvestment approval gate preview does not approve reinvestment execute trades or move capital from the UI", "Reinvestment approval gate preview requires explicit operator approval", "Reinvestment approval gate preview shows reinvestment request protected profit check risk governor check evidence check operator confirmation expiry replay protection and backend-owned approval boundary", "Denied reinvestment approval paths remain blocked", "Reinvestment approval gate checklist")
