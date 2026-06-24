param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1656 First Trading Research Domain Candidate" `
  -ScriptFile "smoke-codexforge-first-trading-research-domain-candidate.ps1" `
  -Domain "src\lib\codexforge\first-trading-research-domain-candidate" `
  -Route "src\app\first-trading-research-domain-candidate" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to First Trading Research Domain Candidate" `
  -RouteHref "/first-trading-research-domain-candidate" `
  -Markers @("First trading research domain candidate", "First trading research domain candidate does not execute trading workflows from the UI", "First trading research domain candidate requires explicit operator approval", "Candidate combines research goal watchlist thesis catalysts risk notes strategy candidates backtest readiness paper-trade readiness profit lockbox mandate draft broker boundary evidence audit cockpit summary and denied trading paths", "Denied first trading research domain paths remain blocked", "First trading research domain checklist")
