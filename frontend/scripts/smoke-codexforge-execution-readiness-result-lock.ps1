param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1281 Execution Readiness Result Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-result-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-result-lock" `
  -Route "src\app\execution-readiness-result-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Result Lock" `
  -RouteHref "/execution-readiness-result-lock" `
  -Markers @("Execution readiness result lock", "Execution readiness result lock does not persist results", "Execution readiness result lock requires explicit operator approval", "Result lock confirms success denied blocked failed timeout needs-review and manual-review states before execution readiness can pass", "Denied execution readiness result paths remain blocked", "Execution readiness result lock checklist")
