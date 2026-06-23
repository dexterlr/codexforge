param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1481 Controlled Backend Execution Queue Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-backend-execution-queue-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-backend-execution-queue-release-candidate" `
  -Route "src\app\controlled-backend-execution-queue-release-candidate" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Controlled Backend Execution Queue Release Candidate" `
  -RouteHref "/controlled-backend-execution-queue-release-candidate" `
  -Markers @("Controlled backend execution queue release candidate", "Controlled backend execution queue release candidate does not call models providers connectors write files apply diffs run commands persist approvals create queues persist evidence results audit promote memory release locks or write browser storage from the frontend", "Controlled backend execution queue release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned durable execution queue without frontend queue persistence", "Denied controlled backend execution queue paths remain blocked", "Controlled backend execution queue release checklist")
