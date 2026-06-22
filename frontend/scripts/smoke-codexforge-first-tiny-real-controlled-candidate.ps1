param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1368 First Tiny Real Controlled Candidate" `
  -ScriptFile "smoke-codexforge-first-tiny-real-controlled-candidate.ps1" `
  -Domain "src\lib\codexforge\first-tiny-real-controlled-candidate" `
  -Route "src\app\first-tiny-real-controlled-candidate" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to First Tiny Real Controlled Candidate" `
  -RouteHref "/first-tiny-real-controlled-candidate" `
  -Markers @("First tiny real controlled candidate", "First tiny real controlled candidate does not allow broad apply or run", "First tiny real controlled candidate requires explicit operator approval", "Candidate combines sandbox file write command candidate approval ticket backend hold path guard command guard preflight evidence result audit recovery denied paths and operator signoff", "Denied first tiny real controlled paths remain blocked", "First tiny real controlled checklist")
