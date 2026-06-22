param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1286 Execution Readiness Denied Path Matrix" `
  -ScriptFile "smoke-codexforge-execution-readiness-denied-path-matrix.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-denied-path-matrix" `
  -Route "src\app\execution-readiness-denied-path-matrix" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Denied Path Matrix" `
  -RouteHref "/execution-readiness-denied-path-matrix" `
  -Markers @("Execution readiness denied path matrix", "Execution readiness denied path matrix does not mutate workflow state", "Execution readiness denied path matrix requires explicit operator approval", "Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion", "Denied execution readiness matrix paths remain blocked", "Execution readiness denied path matrix checklist")
