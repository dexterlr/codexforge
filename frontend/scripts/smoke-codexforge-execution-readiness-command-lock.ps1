param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1278 Execution Readiness Command Lock" `
  -ScriptFile "smoke-codexforge-execution-readiness-command-lock.ps1" `
  -Domain "src\lib\codexforge\execution-readiness-command-lock" `
  -Route "src\app\execution-readiness-command-lock" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Execution Readiness Command Lock" `
  -RouteHref "/execution-readiness-command-lock" `
  -Markers @("Execution readiness command lock", "Execution readiness command lock does not run commands", "Execution readiness command lock requires explicit operator approval", "Command lock confirms allowlist arguments working directory environment evidence result and recovery review before execution readiness can pass", "Denied execution readiness command paths remain blocked", "Execution readiness command lock checklist")
