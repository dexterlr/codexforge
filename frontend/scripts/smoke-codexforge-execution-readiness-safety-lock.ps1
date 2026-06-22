param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1284 Execution Readiness Safety Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-safety-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-safety-lock" `
  -Route "src\app\execution-readiness-safety-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Safety Lock" `
  -RouteHref "/execution-readiness-safety-lock" `
  -Markers @("Execution readiness safety lock", "Execution readiness safety lock does not release actions", "Execution readiness safety lock requires explicit operator approval", "Safety lock blocks file writes commands models providers connectors runtimes adapters persistence export recovery queues and memory promotion", "Denied execution readiness safety paths remain blocked", "Execution readiness safety lock checklist")
