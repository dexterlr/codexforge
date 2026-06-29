param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1679 Entry Rule Draft Preview" `
  -ScriptFile "smoke-codexforge-entry-rule-draft-preview.ps1" `
  -Domain "src\lib\codexforge\entry-rule-draft-preview" `
  -Route "src\app\entry-rule-draft-preview" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to Entry Rule Draft Preview" `
  -RouteHref "/entry-rule-draft-preview" `
  -Markers @("Entry rule draft preview", "Entry rule draft preview does not create buy instructions submit orders or automate entries", "Entry rule draft preview requires explicit operator approval", "Entry rule draft preview shows entry condition draft confirmation requirements allowed market context risk checks evidence needs and manual approval requirement", "Denied entry rule draft paths remain blocked", "Entry rule draft checklist")
