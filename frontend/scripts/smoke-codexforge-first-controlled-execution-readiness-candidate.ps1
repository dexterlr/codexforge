param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1288 First Controlled Execution Readiness Candidate" `
  -ScriptFile "smoke-codexforge-first-controlled-execution-readiness-candidate.ps1" `
  -Domain "src\lib\codexforge\first-controlled-execution-readiness-candidate" `
  -Route "src\app\first-controlled-execution-readiness-candidate" `
  -MainPanel "ControlledExecutionReadinessGateRoutePanel" `
  -CommandLabel "Go to First Controlled Execution Readiness Candidate" `
  -RouteHref "/first-controlled-execution-readiness-candidate" `
  -Markers @("First controlled execution readiness candidate", "First controlled execution readiness candidate does not release execution", "First controlled execution readiness candidate requires explicit operator approval", "Candidate combines goal lock plan lock diff lock command lock approval lock evidence lock result lock recovery lock audit lock safety lock signoff denied path matrix and go no-go summary", "Denied first controlled execution readiness paths remain blocked", "First controlled execution readiness checklist")
