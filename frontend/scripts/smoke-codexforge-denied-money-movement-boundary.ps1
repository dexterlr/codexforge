param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1719 Denied Money Movement Boundary" `
  -ScriptFile "smoke-codexforge-denied-money-movement-boundary.ps1" `
  -Domain "src\lib\codexforge\denied-money-movement-boundary" `
  -Route "src\app\denied-money-movement-boundary" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Denied Money Movement Boundary" `
  -RouteHref "/denied-money-movement-boundary" `
  -Markers @("Denied money movement boundary", "Denied money movement boundary does not move money withdraw funds transfer funds reinvest capital connect brokers read accounts store credentials or update ledgers from the UI", "Denied money movement boundary requires explicit operator approval before any future money-adjacent workflow", "Denied money movement boundary shows blocked money movement blocked broker access blocked account reads blocked credential storage blocked withdrawal blocked reinvestment and backend-owned enforcement", "Denied money movement paths remain blocked", "Denied money movement boundary checklist")
