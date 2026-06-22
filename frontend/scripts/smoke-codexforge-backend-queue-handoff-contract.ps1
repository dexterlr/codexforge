param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1314 Backend Queue Handoff Contract" `
  -ScriptFile "smoke-codexforge-backend-queue-handoff-contract.ps1" `
  -Domain "src\lib\codexforge\backend-queue-handoff-contract" `
  -Route "src\app\backend-queue-handoff-contract" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Queue Handoff Contract" `
  -RouteHref "/backend-queue-handoff-contract" `
  -Markers @("Backend queue handoff contract", "Backend queue handoff contract does not create queue jobs", "Backend queue handoff requires explicit operator approval", "Queue handoff contract defines queued blocked approved denied running completed failed timeout canceled and recovered states", "Denied backend queue handoff paths remain blocked", "Backend queue handoff checklist")
