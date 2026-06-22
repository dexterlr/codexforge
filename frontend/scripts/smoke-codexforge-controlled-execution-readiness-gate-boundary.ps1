param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1274 Controlled Execution Readiness Gate Boundary" `
  -ScriptFile "smoke-codexforge-controlled-execution-readiness-gate-boundary.ps1" `
  -Domain "src\lib\codexforge\controlled-execution-readiness-gate-boundary" `
  -Route "src\app\controlled-execution-readiness-gate-boundary" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Controlled Execution Readiness Gate Boundary" `
  -RouteHref "/controlled-execution-readiness-gate-boundary" `
  -Markers @("Controlled execution readiness gate boundary", "Controlled execution readiness gate boundary does not release execution", "Controlled execution readiness gate requires explicit operator approval", "Readiness gate checks goal plan diff command approval evidence result recovery audit safety and operator signoff", "Denied controlled execution readiness paths remain blocked", "Controlled execution readiness gate checklist")
