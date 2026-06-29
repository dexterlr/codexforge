param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-profit-lockbox-reinvestment-rules-smoke-helper.ps1") `
  -SmokeName "Phase 1706 Profit Lockbox Boundary" `
  -ScriptFile "smoke-codexforge-profit-lockbox-boundary.ps1" `
  -Domain "src\lib\codexforge\profit-lockbox-boundary" `
  -Route "src\app\profit-lockbox-boundary" `
  -MainPanel "ProfitLockboxReinvestmentRulesRoutePanel" `
  -CommandLabel "Go to Profit Lockbox Boundary" `
  -RouteHref "/profit-lockbox-boundary" `
  -Markers @("Profit lockbox boundary", "Profit lockbox boundary does not move money connect brokers read accounts withdraw profit reinvest capital or guarantee profits from the UI", "Profit lockbox boundary requires explicit operator approval before any future profit workflow", "Profit lockbox boundary prepares backend-owned profit lockbox and reinvestment workflows without frontend money movement", "Denied profit lockbox paths remain blocked", "Profit lockbox boundary checklist")
