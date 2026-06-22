param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-tiny-real-controlled-trial-smoke-helper.ps1") `
  -SmokeName "Phase 1366 Tiny Real Denied Path Matrix" `
  -ScriptFile "smoke-codexforge-tiny-real-denied-path-matrix.ps1" `
  -Domain "src\lib\codexforge\tiny-real-denied-path-matrix" `
  -Route "src\app\tiny-real-denied-path-matrix" `
  -MainPanel "TinyRealControlledTrialRoutePanel" `
  -CommandLabel "Go to Tiny Real Denied Path Matrix" `
  -RouteHref "/tiny-real-denied-path-matrix" `
  -Markers @("Tiny real denied path matrix", "Tiny real denied path matrix does not mutate workflow state", "Tiny real denied path matrix requires explicit operator approval", "Denied path matrix lists blocked prompts models providers connectors arbitrary files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and broad backend execution", "Denied tiny real paths remain blocked", "Tiny real denied path checklist")
