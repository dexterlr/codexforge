param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1474 Queue Audit Capture State Preview" `
  -ScriptFile "smoke-codexforge-queue-audit-capture-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-audit-capture-state-preview" `
  -Route "src\app\queue-audit-capture-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Audit Capture State Preview" `
  -RouteHref "/queue-audit-capture-state-preview" `
  -Markers @("Queue audit capture state preview", "Queue audit capture state preview does not persist audit logs from the UI", "Queue audit capture state preview requires backend-owned audit capture", "Queue audit capture state previews goal context plan diff command approval evidence result recovery operator memory and denied-path audit records", "Denied queue audit paths remain blocked", "Queue audit capture checklist")
