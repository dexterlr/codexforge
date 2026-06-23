param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1473 Queue Result Capture State Preview" `
  -ScriptFile "smoke-codexforge-queue-result-capture-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-result-capture-state-preview" `
  -Route "src\app\queue-result-capture-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Result Capture State Preview" `
  -RouteHref "/queue-result-capture-state-preview" `
  -Markers @("Queue result capture state preview", "Queue result capture state preview does not persist results from the UI", "Queue result capture state preview requires backend-owned result capture", "Queue result capture state previews pending success blocked denied failed timeout canceled retryable recovered and operator-accepted result states", "Denied queue result paths remain blocked", "Queue result capture checklist")
