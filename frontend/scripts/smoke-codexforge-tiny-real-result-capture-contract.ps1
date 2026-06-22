param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1363 Tiny Real Result Capture Contract" `
  -ScriptFile "smoke-codexforge-tiny-real-result-capture-contract.ps1" `
  -Domain "src\lib\codexforge\tiny-real-result-capture-contract" `
  -Route "src\app\tiny-real-result-capture-contract" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Result Capture Contract" `
  -RouteHref "/tiny-real-result-capture-contract" `
  -Markers @("Tiny real result capture contract", "Tiny real result capture contract does not persist results from the frontend", "Tiny real result capture contract requires explicit operator approval", "Result capture contract covers success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states", "Denied tiny real result paths remain blocked", "Tiny real result checklist")
