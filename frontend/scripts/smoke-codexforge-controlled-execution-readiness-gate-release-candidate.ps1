param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1289 Controlled Execution Readiness Gate Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-execution-readiness-gate-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-execution-readiness-gate-release-candidate" `
  -Route "src\app\controlled-execution-readiness-gate-release-candidate" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to Controlled Execution Readiness Gate Release Candidate" `
  -RouteHref "/controlled-execution-readiness-gate-release-candidate" `
  -Markers @("Controlled execution readiness gate release candidate", "Controlled execution readiness gate release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery", "Controlled execution readiness gate release requires explicit operator approval", "Release candidate prepares CodexForge for a future real controlled operator run without executing it", "Denied controlled execution readiness gate paths remain blocked", "Controlled execution readiness gate release checklist")
