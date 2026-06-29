param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1678 Signal Rule Draft Preview" `
  -ScriptFile "smoke-codexforge-signal-rule-draft-preview.ps1" `
  -Domain "src\lib\codexforge\signal-rule-draft-preview" `
  -Route "src\app\signal-rule-draft-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Signal Rule Draft Preview" `
  -RouteHref "/signal-rule-draft-preview" `
  -Markers @("Signal rule draft preview", "Signal rule draft preview does not execute signals automate trades or place orders", "Signal rule draft preview requires explicit operator approval", "Signal rule draft preview shows review-only signal conditions confirmation filters risk filters evidence needs and no executable signal state", "Denied signal rule draft paths remain blocked", "Signal rule draft checklist")
