param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1476 Queue Failed Canceled State Preview" `
  -ScriptFile "smoke-codexforge-queue-failed-canceled-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-failed-canceled-state-preview" `
  -Route "src\app\queue-failed-canceled-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Failed Canceled State Preview" `
  -RouteHref "/queue-failed-canceled-state-preview" `
  -Markers @("Queue failed canceled state preview", "Queue failed canceled state preview does not execute recovery from the UI", "Queue failed canceled state preview requires explicit operator approval", "Queue failed canceled state previews failed apply failed command failed evidence failed result failed audit canceled by operator timeout and manual-stop states", "Denied queue failed canceled paths remain blocked", "Queue failed canceled checklist")
