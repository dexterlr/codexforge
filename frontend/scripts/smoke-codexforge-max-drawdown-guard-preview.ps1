param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1664 Max Drawdown Guard Preview" `
  -ScriptFile "smoke-codexforge-max-drawdown-guard-preview.ps1" `
  -Domain "src\lib\codexforge\max-drawdown-guard-preview" `
  -Route "src\app\max-drawdown-guard-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Max Drawdown Guard Preview" `
  -RouteHref "/max-drawdown-guard-preview" `
  -Markers @("Max drawdown guard preview", "Max drawdown guard preview does not calculate live portfolio drawdown or access broker accounts", "Max drawdown guard preview requires explicit operator approval", "Max drawdown guard preview shows total drawdown threshold peak equity reference active capital impact protected profit exclusion and stop condition", "Denied max drawdown paths remain blocked", "Max drawdown guard checklist")
