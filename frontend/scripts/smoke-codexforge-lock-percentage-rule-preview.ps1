param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1710 Lock Percentage Rule Preview" `
  -ScriptFile "smoke-codexforge-lock-percentage-rule-preview.ps1" `
  -Domain "src\lib\codexforge\lock-percentage-rule-preview" `
  -Route "src\app\lock-percentage-rule-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Lock Percentage Rule Preview" `
  -RouteHref "/lock-percentage-rule-preview" `
  -Markers @("Lock percentage rule preview", "Lock percentage rule preview does not change real account allocation or guarantee returns", "Lock percentage rule preview requires explicit operator approval", "Lock percentage rule preview shows configurable lock percent realised profit allocation protected share reinvestable share rounding note and no guaranteed profit claim", "Denied lock percentage paths remain blocked", "Lock percentage rule checklist")
