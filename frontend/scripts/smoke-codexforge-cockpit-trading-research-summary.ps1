param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1655 Cockpit Trading Research Summary" `
  -ScriptFile "smoke-codexforge-cockpit-trading-research-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-trading-research-summary" `
  -Route "src\app\cockpit-trading-research-summary" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Cockpit Trading Research Summary" `
  -RouteHref "/cockpit-trading-research-summary" `
  -Markers @("Cockpit trading research summary", "Cockpit trading research summary keeps the cockpit as the normal user surface", "Cockpit trading research summary does not connect brokers place trades fetch live market data provide financial advice run backtests place paper trades or automate trading from the cockpit", "Cockpit trading research summary shows research goal watchlist thesis catalysts risk strategy candidates backtest readiness paper-trade readiness profit lockbox trading mandate broker boundary evidence and audit", "Phase pages remain dev test diagnostics only", "Cockpit trading research checklist")
