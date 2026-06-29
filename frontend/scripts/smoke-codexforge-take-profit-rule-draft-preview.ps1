param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1682 Take Profit Rule Draft Preview" `
  -ScriptFile "smoke-codexforge-take-profit-rule-draft-preview.ps1" `
  -Domain "src\lib\codexforge\take-profit-rule-draft-preview" `
  -Route "src\app\take-profit-rule-draft-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Take Profit Rule Draft Preview" `
  -RouteHref "/take-profit-rule-draft-preview" `
  -Markers @("Take profit rule draft preview", "Take profit rule draft preview does not place take profit orders or guarantee returns", "Take profit rule draft preview requires explicit operator approval", "Take profit rule draft preview shows target concept reward risk framing partial exit concept protected profit note reinvestable profit note and no guaranteed profit claim", "Denied take profit rule draft paths remain blocked", "Take profit rule draft checklist")
