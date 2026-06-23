param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-execution-queue-smoke-helper.ps1") `
  -SmokeName "Phase 1475 Queue Blocked Denied State Preview" `
  -ScriptFile "smoke-codexforge-queue-blocked-denied-state-preview.ps1" `
  -Domain "src\lib\codexforge\queue-blocked-denied-state-preview" `
  -Route "src\app\queue-blocked-denied-state-preview" `
  -MainPanel "BackendExecutionQueueRoutePanel" `
  -CommandLabel "Go to Queue Blocked Denied State Preview" `
  -RouteHref "/queue-blocked-denied-state-preview" `
  -Markers @("Queue blocked denied state preview", "Queue blocked denied state preview does not mutate workflow state", "Queue blocked denied state preview requires explicit operator approval", "Queue blocked denied state previews blocked path blocked command blocked approval blocked model blocked provider blocked connector blocked memory blocked recovery and denied execution states", "Denied queue blocked paths remain blocked", "Queue blocked denied checklist")
