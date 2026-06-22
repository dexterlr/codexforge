param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-backend-approval-handoff-smoke-helper.ps1") `
  -SmokeName "Phase 1312 Backend Recovery Handoff Contract" `
  -ScriptFile "smoke-codexforge-backend-recovery-handoff-contract.ps1" `
  -Domain "src\lib\codexforge\backend-recovery-handoff-contract" `
  -Route "src\app\backend-recovery-handoff-contract" `
  -MainPanel "BackendApprovalHandoffRoutePanel" `
  -CommandLabel "Go to Backend Recovery Handoff Contract" `
  -RouteHref "/backend-recovery-handoff-contract" `
  -Markers @("Backend recovery handoff contract", "Backend recovery handoff contract does not execute recovery", "Backend recovery handoff requires explicit operator approval", "Recovery handoff contract defines rollback retry stop restore explain-failure manual-review and safety-stop requirements", "Denied backend recovery handoff paths remain blocked", "Backend recovery handoff checklist")
