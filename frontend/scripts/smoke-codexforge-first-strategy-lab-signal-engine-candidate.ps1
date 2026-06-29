param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-strategy-lab-signal-engine-smoke-helper.ps1") `
  -SmokeName "Phase 1688 First Strategy Lab Signal Engine Candidate" `
  -ScriptFile "smoke-codexforge-first-strategy-lab-signal-engine-candidate.ps1" `
  -Domain "src\lib\codexforge\first-strategy-lab-signal-engine-candidate" `
  -Route "src\app\first-strategy-lab-signal-engine-candidate" `
  -MainPanel "StrategyLabSignalEngineRoutePanel" `
  -CommandLabel "Go to First Strategy Lab Signal Engine Candidate" `
  -RouteHref "/first-strategy-lab-signal-engine-candidate" `
  -Markers @("First strategy lab signal engine candidate", "First strategy lab signal engine candidate does not enable trading workflows from the UI", "First strategy lab signal engine candidate requires explicit operator approval", "Candidate combines strategy idea hypothesis indicator concepts signal rules entry rules exit rules stop loss take profit position sizing confidence invalidation evidence cockpit summary and denied strategy signal paths", "Denied first strategy lab signal engine paths remain blocked", "First strategy lab signal engine checklist")
