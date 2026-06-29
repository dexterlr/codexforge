param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1711 Release Condition Rule Preview" `
  -ScriptFile "smoke-codexforge-release-condition-rule-preview.ps1" `
  -Domain "src\lib\codexforge\release-condition-rule-preview" `
  -Route "src\app\release-condition-rule-preview" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Release Condition Rule Preview" `
  -RouteHref "/release-condition-rule-preview" `
  -Markers @("Release condition rule preview", "Release condition rule preview does not release funds move money or update accounts from the UI", "Release condition rule preview requires explicit operator approval", "Release condition rule preview shows protected profit release conditions manual approval expiry evidence requirement audit requirement and backend-owned release boundary", "Denied release condition paths remain blocked", "Release condition rule checklist")
