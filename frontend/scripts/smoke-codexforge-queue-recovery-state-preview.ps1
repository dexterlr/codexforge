param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1478 Queue Recovery State Preview" `
  -ScriptFile "smoke-codexforge-queue-recovery-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-recovery-state-preview" `
  -Route "src\app\queue-recovery-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Recovery State Preview" `
  -RouteHref "/queue-recovery-state-preview" `
  -Markers @("Queue recovery state preview", "Queue recovery state preview does not execute rollback retry or recovery from the UI", "Queue recovery state preview requires explicit operator approval", "Queue recovery state previews rollback-ready retry-ready restore-ready stop-ready explain-failure manual-review safety-stop and partial-recovery states", "Denied queue recovery paths remain blocked", "Queue recovery state checklist")
