param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-mandate-risk-governor-smoke-helper.ps1") `
  -SmokeName "Phase 1668 Approved Strategy Class Preview" `
  -ScriptFile "smoke-codexforge-approved-strategy-class-preview.ps1" `
  -Domain "src\lib\codexforge\approved-strategy-class-preview" `
  -Route "src\app\approved-strategy-class-preview" `
  -MainPanel "TradingMandateRiskGovernorRoutePanel" `
  -CommandLabel "Go to Approved Strategy Class Preview" `
  -RouteHref "/approved-strategy-class-preview" `
  -Markers @("Approved strategy class preview", "Approved strategy class preview does not execute signals automate strategies or place orders", "Approved strategy class preview requires explicit operator approval", "Approved strategy class preview shows approved strategy classes forbidden strategy classes data requirements backtest requirements paper-trade requirements and evidence gates", "Denied approved strategy class paths remain blocked", "Approved strategy class checklist")
