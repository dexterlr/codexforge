param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1671 Trading Kill Switch Preview" `
  -ScriptFile "smoke-codexforge-trading-kill-switch-preview.ps1" `
  -Domain "src\lib\codexforge\trading-kill-switch-preview" `
  -Route "src\app\trading-kill-switch-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Trading Kill Switch Preview" `
  -RouteHref "/trading-kill-switch-preview" `
  -Markers @("Trading kill switch preview", "Trading kill switch preview does not stop live trading or control broker accounts from the UI", "Trading kill switch preview requires explicit operator approval", "Trading kill switch preview shows daily loss breach drawdown breach manual stop thesis invalidation broker error automation pause and backend-owned enforcement boundary", "Denied trading kill switch paths remain blocked", "Trading kill switch checklist")
