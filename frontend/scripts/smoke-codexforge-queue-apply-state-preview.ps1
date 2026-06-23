param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1470 Queue Apply State Preview" `
  -ScriptFile "smoke-codexforge-queue-apply-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-apply-state-preview" `
  -Route "src\app\queue-apply-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Apply State Preview" `
  -RouteHref "/queue-apply-state-preview" `
  -Markers @("Queue apply state preview", "Queue apply state preview does not write files or apply diffs from the UI", "Queue apply state preview requires explicit operator approval", "Queue apply state previews waiting applying applied blocked denied failed rolled-back and manual-review apply states", "Denied queue apply paths remain blocked", "Queue apply state checklist")
