param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1687 Cockpit Strategy Lab Summary" `
  -ScriptFile "smoke-codexforge-cockpit-strategy-lab-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-strategy-lab-summary" `
  -Route "src\app\cockpit-strategy-lab-summary" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Cockpit Strategy Lab Summary" `
  -RouteHref "/cockpit-strategy-lab-summary" `
  -Markers @("Cockpit strategy lab summary", "Cockpit strategy lab summary keeps the cockpit as the normal user surface", "Cockpit strategy lab summary does not execute signals connect brokers place trades fetch live market data provide financial advice provide personalised recommendations issue buy sell instructions run backtests place paper trades automate trading or size orders from the cockpit", "Cockpit strategy lab summary shows strategy idea hypothesis indicator concepts signal rules entry rules exit rules stop loss take profit position sizing confidence invalidation evidence and audit", "Phase pages remain dev test diagnostics only", "Cockpit strategy lab checklist")
