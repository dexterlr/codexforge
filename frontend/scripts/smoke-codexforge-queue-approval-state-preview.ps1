param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1468 Queue Approval State Preview" `
  -ScriptFile "smoke-codexforge-queue-approval-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-approval-state-preview" `
  -Route "src\app\queue-approval-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Approval State Preview" `
  -RouteHref "/queue-approval-state-preview" `
  -Markers @("Queue approval state preview", "Queue approval state preview does not persist approvals from the UI", "Queue approval state preview requires explicit human approval", "Queue approval state previews needs-approval approved expired stale denied blocked and replay-protected approval states", "Denied queue approval paths remain blocked", "Queue approval state checklist")
