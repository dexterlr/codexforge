param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1677 Indicator Concept Preview" `
  -ScriptFile "smoke-codexforge-indicator-concept-preview.ps1" `
  -Domain "src\lib\codexforge\indicator-concept-preview" `
  -Route "src\app\indicator-concept-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Indicator Concept Preview" `
  -RouteHref "/indicator-concept-preview" `
  -Markers @("Indicator concept preview", "Indicator concept preview does not fetch live data compute live indicators or issue signals from the UI", "Indicator concept preview requires explicit operator approval", "Indicator concept preview shows indicator concept inputs lookback assumptions smoothing notes lag risk false signal risk and backend-owned computation boundary", "Denied indicator concept paths remain blocked", "Indicator concept checklist")
