param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1287 Execution Readiness Go No-Go Summary" `
  -ScriptFile "smoke-codexforge-execution-readiness-go-no-go-summary.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-go-no-go-summary" `
  -Route "src\app\execution-readiness-go-no-go-summary" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Go No Go Summary" `
  -RouteHref "/execution-readiness-go-no-go-summary" `
  -Markers @("Execution readiness go no-go summary", "Execution readiness go no-go summary does not release execution", "Execution readiness go no-go summary requires explicit operator approval", "Go no-go summary reports preview-only status blocked execution and required future backend guards", "Denied execution readiness go no-go paths remain blocked", "Execution readiness go no-go checklist")
