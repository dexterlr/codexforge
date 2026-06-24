param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1652 Trading Mandate Draft Preview" `
  -ScriptFile "smoke-codexforge-trading-mandate-draft-preview.ps1" `
  -Domain "src\lib\codexforge\trading-mandate-draft-preview" `
  -Route "src\app\trading-mandate-draft-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Mandate Draft Preview" `
  -RouteHref "/trading-mandate-draft-preview" `
  -Markers @("Trading mandate draft preview", "Trading mandate draft preview does not enable automation or trading", "Trading mandate draft preview requires explicit operator approval", "Trading mandate draft preview shows allocated capital active capital protected profit reinvestable profit max daily loss max drawdown max position risk approved markets approved symbols approved strategies paper-trade proof backtest proof and kill switch", "Denied trading mandate paths remain blocked", "Trading mandate draft checklist")
