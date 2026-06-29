param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1718 Cockpit Profit Lockbox Summary" `
  -ScriptFile "smoke-codexforge-cockpit-profit-lockbox-summary.ps1" `
  -Domain "src\lib\codexforge\cockpit-profit-lockbox-summary" `
  -Route "src\app\cockpit-profit-lockbox-summary" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Cockpit Profit Lockbox Summary" `
  -RouteHref "/cockpit-profit-lockbox-summary" `
  -Markers @("Cockpit profit lockbox summary", "Cockpit profit lockbox summary keeps the cockpit as the normal user surface", "Cockpit profit lockbox summary does not move money withdraw profit reinvest capital connect brokers read live P&L place trades provide financial advice provide personalised recommendations issue buy sell instructions automate trading or guarantee profit from the cockpit", "Cockpit profit lockbox summary shows realised profit protected profit reinvestable profit lock percent release conditions reinvestment ceiling loss handling active capital audit approval gate and evidence map", "Phase pages remain dev test diagnostics only", "Cockpit profit lockbox checklist")
