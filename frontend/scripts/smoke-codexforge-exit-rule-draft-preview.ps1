param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1680 Exit Rule Draft Preview" `
  -ScriptFile "smoke-codexforge-exit-rule-draft-preview.ps1" `
  -Domain "src\lib\codexforge\exit-rule-draft-preview" `
  -Route "src\app\exit-rule-draft-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Exit Rule Draft Preview" `
  -RouteHref "/exit-rule-draft-preview" `
  -Markers @("Exit rule draft preview", "Exit rule draft preview does not create sell instructions submit orders or automate exits", "Exit rule draft preview requires explicit operator approval", "Exit rule draft preview shows exit condition draft invalidation condition risk exit profit exit time exit evidence needs and manual approval requirement", "Denied exit rule draft paths remain blocked", "Exit rule draft checklist")
