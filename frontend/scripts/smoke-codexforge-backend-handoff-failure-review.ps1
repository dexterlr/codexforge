param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1319 Backend Handoff Failure Review" `
  -ScriptFile "smoke-codexforge-backend-handoff-failure-review.ps1" `
  -Domain "src\lib\codexforge\backend-handoff-failure-review" `
  -Route "src\app\backend-handoff-failure-review" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Handoff Failure Review" `
  -RouteHref "/backend-handoff-failure-review" `
  -Markers @("Backend handoff failure review", "Backend handoff failure review does not retry or recover actions", "Backend handoff failure review requires explicit operator approval", "Failure review defines denied invalid expired canceled failed timeout partial recovery-required and manual-review handoff states", "Denied backend handoff failure paths remain blocked", "Backend handoff failure review checklist")
