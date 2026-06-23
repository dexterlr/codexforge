param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1472 Queue Evidence Capture State Preview" `
  -ScriptFile "smoke-codexforge-queue-evidence-capture-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-evidence-capture-state-preview" `
  -Route "src\app\queue-evidence-capture-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Evidence Capture State Preview" `
  -RouteHref "/queue-evidence-capture-state-preview" `
  -Markers @("Queue evidence capture state preview", "Queue evidence capture state preview does not persist evidence from the UI", "Queue evidence capture state preview requires backend-owned evidence capture", "Queue evidence capture state previews pending capturing captured missing redacted failed blocked and manual-review evidence states", "Denied queue evidence paths remain blocked", "Queue evidence capture checklist")
