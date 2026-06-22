param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1285 Execution Readiness Operator Signoff" `
  -ScriptFile "smoke-codexforge-execution-readiness-operator-signoff.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-operator-signoff" `
  -Route "src\app\execution-readiness-operator-signoff" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Operator Signoff" `
  -RouteHref "/execution-readiness-operator-signoff" `
  -Markers @("Execution readiness operator signoff", "Execution readiness operator signoff does not persist signoff or approve execution", "Execution readiness operator signoff requires explicit human approval", "Operator signoff confirms goal plan diff command approval evidence result recovery audit safety and denied paths", "Denied execution readiness signoff paths remain blocked", "Execution readiness operator signoff checklist")
