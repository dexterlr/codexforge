param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-trading-research-domain-pack-smoke-helper.ps1") `
  -SmokeName "Phase 1643 Trading Research Goal Intake Preview" `
  -ScriptFile "smoke-codexforge-trading-research-goal-intake-preview.ps1" `
  -Domain "src\lib\codexforge\trading-research-goal-intake-preview" `
  -Route "src\app\trading-research-goal-intake-preview" `
  -MainPanel "TradingResearchDomainRoutePanel" `
  -CommandLabel "Go to Trading Research Goal Intake Preview" `
  -RouteHref "/trading-research-goal-intake-preview" `
  -Markers @("Trading research goal intake preview", "Trading research goal intake preview does not send prompts create jobs connect brokers or place trades from the UI", "Trading research goal intake preview requires explicit operator approval", "Trading research goal intake preview captures research goal market interest timeframe risk tolerance watchlist hints done criteria evidence needs and paper-trade needs", "Denied trading research goal intake paths remain blocked", "Trading research goal intake checklist")
