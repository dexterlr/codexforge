param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1675 Strategy Idea Intake Preview" `
  -ScriptFile "smoke-codexforge-strategy-idea-intake-preview.ps1" `
  -Domain "src\lib\codexforge\strategy-idea-intake-preview" `
  -Route "src\app\strategy-idea-intake-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Strategy Idea Intake Preview" `
  -RouteHref "/strategy-idea-intake-preview" `
  -Markers @("Strategy idea intake preview", "Strategy idea intake preview does not send prompts create jobs fetch market data or create executable signals from the UI", "Strategy idea intake preview requires explicit operator approval", "Strategy idea intake preview captures strategy idea market hypothesis timeframe risk style data needs evidence needs and paper-trade prerequisites", "Denied strategy idea intake paths remain blocked", "Strategy idea intake checklist")
