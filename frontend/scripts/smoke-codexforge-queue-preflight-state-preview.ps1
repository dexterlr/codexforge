param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1469 Queue Preflight State Preview" `
  -ScriptFile "smoke-codexforge-queue-preflight-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-preflight-state-preview" `
  -Route "src\app\queue-preflight-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Preflight State Preview" `
  -RouteHref "/queue-preflight-state-preview" `
  -Markers @("Queue preflight state preview", "Queue preflight state preview does not execute preflight checks from the UI", "Queue preflight state preview requires explicit operator approval", "Queue preflight state previews context readiness plan readiness diff readiness command readiness evidence readiness audit readiness and recovery readiness", "Denied queue preflight paths remain blocked", "Queue preflight checklist")
