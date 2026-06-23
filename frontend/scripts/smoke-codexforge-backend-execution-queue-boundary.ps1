param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1466 Backend Execution Queue Boundary" `
  -ScriptFile "smoke-codexforge-backend-execution-queue-boundary.ps1" `
  -Domain "src\lib\codexforge\backend-execution-queue-boundary" `
  -Route "src\app\backend-execution-queue-boundary" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Backend Execution Queue Boundary" `
  -RouteHref "/backend-execution-queue-boundary" `
  -Markers @("Backend execution queue boundary", "Backend execution queue boundary does not create queue jobs from the UI", "Backend execution queue requires explicit operator approval before execution", "Backend execution queue prepares durable backend-owned work item state without broad execution", "Denied backend execution queue paths remain blocked", "Backend execution queue checklist")
