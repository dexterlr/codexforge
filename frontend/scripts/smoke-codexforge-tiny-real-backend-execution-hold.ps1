param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1358 Tiny Real Backend Execution Hold" `
  -ScriptFile "smoke-codexforge-tiny-real-backend-execution-hold.ps1" `
  -Domain "src\lib\codexforge\tiny-real-backend-execution-hold" `
  -Route "src\app\tiny-real-backend-execution-hold" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Backend Execution Hold" `
  -RouteHref "/tiny-real-backend-execution-hold" `
  -Markers @("Tiny real backend execution hold", "Tiny real backend execution hold does not release execution from the frontend", "Tiny real backend execution hold requires explicit operator approval", "Execution hold keeps apply and command run blocked until backend-owned guards verify the ticket", "Denied tiny real backend execution paths remain blocked", "Tiny real backend execution hold checklist")
