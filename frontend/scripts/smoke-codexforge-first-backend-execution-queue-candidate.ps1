param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1480 First Backend Execution Queue Candidate" `
  -ScriptFile "smoke-codexforge-first-backend-execution-queue-candidate.ps1" `
  -Domain "src\lib\codexforge\first-backend-execution-queue-candidate" `
  -Route "src\app\first-backend-execution-queue-candidate" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to First Backend Execution Queue Candidate" `
  -RouteHref "/first-backend-execution-queue-candidate" `
  -Markers @("First backend execution queue candidate", "First backend execution queue candidate does not create real queue jobs from the UI", "First backend execution queue candidate requires explicit operator approval", "Candidate combines queue item approval preflight apply run evidence result audit blocked denied failed canceled manual review recovery and allowed transitions", "Denied first backend execution queue paths remain blocked", "First backend execution queue checklist")
