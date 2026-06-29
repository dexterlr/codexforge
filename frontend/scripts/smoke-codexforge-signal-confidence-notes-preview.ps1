param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1684 Signal Confidence Notes Preview" `
  -ScriptFile "smoke-codexforge-signal-confidence-notes-preview.ps1" `
  -Domain "src\lib\codexforge\signal-confidence-notes-preview" `
  -Route "src\app\signal-confidence-notes-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Signal Confidence Notes Preview" `
  -RouteHref "/signal-confidence-notes-preview" `
  -Markers @("Signal confidence notes preview", "Signal confidence notes preview does not score live signals or provide personalised recommendations", "Signal confidence notes preview requires explicit operator approval", "Signal confidence notes preview shows evidence quality uncertainty factors regime fit data quality false positive risk and manual review notes", "Denied signal confidence paths remain blocked", "Signal confidence notes checklist")
