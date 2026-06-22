param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1365 Tiny Real Recovery Contract" `
  -ScriptFile "smoke-codexforge-tiny-real-recovery-contract.ps1" `
  -Domain "src\lib\codexforge\tiny-real-recovery-contract" `
  -Route "src\app\tiny-real-recovery-contract" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Recovery Contract" `
  -RouteHref "/tiny-real-recovery-contract" `
  -Markers @("Tiny real recovery contract", "Tiny real recovery contract does not execute recovery from the frontend", "Tiny real recovery contract requires explicit operator approval", "Recovery contract covers rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery requirements", "Denied tiny real recovery paths remain blocked", "Tiny real recovery checklist")
