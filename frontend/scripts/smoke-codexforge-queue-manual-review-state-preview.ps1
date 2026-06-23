param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1477 Queue Manual Review State Preview" `
  -ScriptFile "smoke-codexforge-queue-manual-review-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-manual-review-state-preview" `
  -Route "src\app\queue-manual-review-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Manual Review State Preview" `
  -RouteHref "/queue-manual-review-state-preview" `
  -Markers @("Queue manual review state preview", "Queue manual review state preview does not execute review actions automatically", "Queue manual review state preview requires explicit operator approval", "Queue manual review state previews evidence gaps result gaps audit gaps recovery choices denied paths and next operator decisions", "Denied queue manual review paths remain blocked", "Queue manual review checklist")
