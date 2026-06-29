param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1676 Strategy Hypothesis Preview" `
  -ScriptFile "smoke-codexforge-strategy-hypothesis-preview.ps1" `
  -Domain "src\lib\codexforge\strategy-hypothesis-preview" `
  -Route "src\app\strategy-hypothesis-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Strategy Hypothesis Preview" `
  -RouteHref "/strategy-hypothesis-preview" `
  -Markers @("Strategy hypothesis preview", "Strategy hypothesis preview does not provide financial advice personalised recommendations or buy sell instructions", "Strategy hypothesis preview requires explicit operator approval", "Strategy hypothesis preview shows hypothesis counter-hypothesis assumptions market regime risk regime invalidation and evidence requirements", "Denied strategy hypothesis paths remain blocked", "Strategy hypothesis checklist")
