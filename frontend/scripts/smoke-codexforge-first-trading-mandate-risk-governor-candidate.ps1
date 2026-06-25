param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1672 First Trading Mandate Risk Governor Candidate" `
  -ScriptFile "smoke-codexforge-first-trading-mandate-risk-governor-candidate.ps1" `
  -Domain "src\lib\codexforge\first-trading-mandate-risk-governor-candidate" `
  -Route "src\app\first-trading-mandate-risk-governor-candidate" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to First Trading Mandate Risk Governor Candidate" `
  -RouteHref "/first-trading-mandate-risk-governor-candidate" `
  -Markers @("First trading mandate risk governor candidate", "First trading mandate risk governor candidate does not enable trading workflows from the UI", "First trading mandate risk governor candidate requires explicit operator approval", "Candidate combines capital allocation active capital protected profit reinvestable profit daily loss drawdown position risk approved markets approved symbols strategy classes thesis evidence kill switch and denied mandate paths", "Denied first trading mandate risk governor paths remain blocked", "First trading mandate risk governor checklist")
