param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1467 Queue Item Model Preview" `
  -ScriptFile "smoke-codexforge-queue-item-model-preview.ps1" `
  -Domain "src\lib\codexforge\queue-item-model-preview" `
  -Route "src\app\queue-item-model-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Item Model Preview" `
  -RouteHref "/queue-item-model-preview" `
  -Markers @("Queue item model preview", "Queue item model preview does not persist queue state from the UI", "Queue item model preview requires explicit operator approval before execution", "Queue item model previews goal context plan diff commands approval evidence result audit recovery and memory references", "Denied queue item paths remain blocked", "Queue item model checklist")
