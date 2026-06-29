param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1720 First Profit Lockbox Reinvestment Candidate" `
  -ScriptFile "smoke-codexforge-first-profit-lockbox-reinvestment-candidate.ps1" `
  -Domain "src\lib\codexforge\first-profit-lockbox-reinvestment-candidate" `
  -Route "src\app\first-profit-lockbox-reinvestment-candidate" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to First Profit Lockbox Reinvestment Candidate" `
  -RouteHref "/first-profit-lockbox-reinvestment-candidate" `
  -Markers @("First profit lockbox reinvestment candidate", "First profit lockbox reinvestment candidate does not enable money movement broker workflows trading workflows or reinvestment execution from the UI", "First profit lockbox reinvestment candidate requires explicit operator approval", "Candidate combines realised profit protected profit reinvestable profit lock percentage release conditions reinvestment ceiling loss handling active capital audit approval evidence cockpit summary denied money movement and denied profit paths", "Denied first profit lockbox reinvestment paths remain blocked", "First profit lockbox reinvestment checklist")
