param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1683 Position Sizing Concept Preview" `
  -ScriptFile "smoke-codexforge-position-sizing-concept-preview.ps1" `
  -Domain "src\lib\codexforge\position-sizing-concept-preview" `
  -Route "src\app\position-sizing-concept-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Position Sizing Concept Preview" `
  -RouteHref "/position-sizing-concept-preview" `
  -Markers @("Position sizing concept preview", "Position sizing concept preview does not size orders submit trades or access broker balances", "Position sizing concept preview requires explicit operator approval", "Position sizing concept preview shows position sizing concept risk percent stop distance assumption capital constraint drawdown constraint liquidity warning and backend-owned sizing boundary", "Denied position sizing concept paths remain blocked", "Position sizing concept checklist")
