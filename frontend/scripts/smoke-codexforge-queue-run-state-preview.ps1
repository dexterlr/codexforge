param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1471 Queue Run State Preview" `
  -ScriptFile "smoke-codexforge-queue-run-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-run-state-preview" `
  -Route "src\app\queue-run-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Run State Preview" `
  -RouteHref "/queue-run-state-preview" `
  -Markers @("Queue run state preview", "Queue run state preview does not run commands from the UI", "Queue run state preview requires explicit operator approval", "Queue run state previews waiting running completed failed timeout canceled blocked denied and manual-review command states", "Denied queue run paths remain blocked", "Queue run state checklist")
